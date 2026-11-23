#!/usr/bin/env bash
set -euo pipefail

REPO_URL="https://github.com/Sam-tha/movie-reviews-app.git"
APP_DIR="/opt/movie-reviews"
WEB_DIR="/var/www/movie-reviews"
ENV_FILE="/etc/movie-reviews.env"
SERVICE_FILE="/etc/systemd/system/movie-reviews.service"
NGINX_CONFIG="/etc/nginx/conf.d/default.conf"
DEPLOY_USER="${SUDO_USER:-ec2-user}"

if [ "$(id -u)" -ne 0 ]; then
  echo "Run this script with sudo: sudo ./deploy-movie-reviews.sh" >&2
  exit 1
fi

if ! id "$DEPLOY_USER" >/dev/null 2>&1; then
  echo "Deployment user '$DEPLOY_USER' does not exist." >&2
  exit 1
fi

read -rsp "Paste your MongoDB connection string (MONGO_URL): " MONGO_URL
echo
if [ -z "$MONGO_URL" ] || [[ "$MONGO_URL" == *$'\n'* ]]; then
  echo "A non-empty, single-line MongoDB connection string is required." >&2
  exit 1
fi

dnf update -y
dnf install -y nodejs npm git nginx rsync

if ! command -v node >/dev/null 2>&1 || ! node -e '
  const [major, minor] = process.versions.node.split(".").map(Number);
  if (!(major > 22 || (major === 22 && minor >= 12) || (major === 20 && minor >= 19))) {
    process.exit(1);
  }
'; then
  echo "Vite 8 requires Node.js 20.19+ or 22.12+; install a supported Node.js version and rerun." >&2
  exit 1
fi

systemctl enable --now nginx

if [ -d "$APP_DIR/.git" ]; then
  git -C "$APP_DIR" pull --ff-only origin main
else
  git clone "$REPO_URL" "$APP_DIR"
fi
chown -R "$DEPLOY_USER:$DEPLOY_USER" "$APP_DIR"

sudo -u "$DEPLOY_USER" npm --prefix "$APP_DIR/frontend" ci
sudo -u "$DEPLOY_USER" npm --prefix "$APP_DIR/backend" ci
sudo -u "$DEPLOY_USER" npm --prefix "$APP_DIR/frontend" run build

install -d -o nginx -g nginx "$WEB_DIR"
rsync -a --delete "$APP_DIR/frontend/dist/" "$WEB_DIR/"
chown -R nginx:nginx "$WEB_DIR"

escaped_mongo_url=${MONGO_URL//\\/\\\\}
escaped_mongo_url=${escaped_mongo_url//\"/\\\"}
umask 077
printf 'PORT=8000\nMONGO_URL="%s"\n' "$escaped_mongo_url" > "$ENV_FILE"
chown root:root "$ENV_FILE"
chmod 600 "$ENV_FILE"

NODE_BIN="$(command -v node)"
cat > "$SERVICE_FILE" <<EOF
[Unit]
Description=Movie Reviews API
After=network.target

[Service]
Type=simple
User=$DEPLOY_USER
WorkingDirectory=$APP_DIR/backend
EnvironmentFile=$ENV_FILE
Environment=NODE_ENV=production
ExecStart=$NODE_BIN server.js
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

if [ -f "$NGINX_CONFIG" ] && [ ! -f "$NGINX_CONFIG.movie-reviews-backup" ]; then
  cp -a "$NGINX_CONFIG" "$NGINX_CONFIG.movie-reviews-backup"
fi

cat > "$NGINX_CONFIG" <<EOF
server {
    listen 80 default_server;
    server_name _;

    root $WEB_DIR;
    index index.html;

    location /movies {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

systemctl daemon-reload
systemctl enable --now movie-reviews.service
systemctl restart movie-reviews.service

setsebool -P httpd_can_network_connect 1 2>/dev/null || true
nginx -t
systemctl restart nginx

echo
echo "Deployment complete."
echo "Open: http://YOUR_PUBLIC_IP"
echo "API service status: sudo systemctl status movie-reviews"
