# Movie Reviews

A React app for creating, browsing, editing, and deleting movie reviews, with an Express API and MongoDB.

## Run locally

1. Start MongoDB locally, or set `MONGO_URL` to a MongoDB connection string.
2. In `backend`, run `npm install` once and then `npm start`.
3. In `frontend`, run `npm install` once and then `npm run dev`.

The local frontend defaults to the API at `http://localhost:8000`.

## Deploy to Amazon Linux

The repo includes `deploy-movie-reviews.sh` for an Amazon Linux server with `dnf`, `systemd`, and Nginx. It deploys this repository, builds the `frontend`, runs `backend/server.js` as a systemd service, and proxies `/movies` to the API. Production uses the same-origin API path, so no frontend API URL setting is required.

On a dedicated server, run:

```bash
chmod +x deploy-movie-reviews.sh
sudo ./deploy-movie-reviews.sh
```

The script prompts for `MONGO_URL` without echoing it and stores it in `/etc/movie-reviews.env` with root-only permissions. Use a persistent MongoDB service (for example, MongoDB Atlas); the default database URL is local to the server and is not appropriate for a deployment unless MongoDB is installed there.

The server must allow inbound HTTP on port 80. For HTTPS, configure a TLS certificate and Nginx HTTPS listener before exposing the app publicly. The script replaces Nginx's default site configuration, so use it only on a dedicated host.