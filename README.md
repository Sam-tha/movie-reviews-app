# Movie Reviews

A React app for creating, browsing, editing, and deleting movie reviews, with an Express API and MongoDB.

## Run locally

1. Start MongoDB locally, or set `MONGO_URL` to a MongoDB connection string.
2. In `backend`, run `npm install` once and then `npm start`.
3. In `frontend`, run `npm install` once and then `npm run dev`.

The local frontend defaults to the API at `http://localhost:8000`.

## Deploy

Deploy the backend and MongoDB separately, then configure the frontend build with:

```text
VITE_API_URL=https://your-backend.example.com
```

Set this variable in the frontend hosting provider and rebuild/redeploy the frontend. Use the backend's origin only (no `/movies` suffix); the app adds `/movies` to it. The backend must allow requests from the frontend's origin via CORS.

The app's default MongoDB connection is local to the backend machine. For a hosted backend, set `MONGO_URL` to a persistent MongoDB service so reviews remain available across backend restarts and deployments.