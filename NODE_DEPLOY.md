# Deploying ORCA 4K TV to Node.js (Subdirectory)

Your application is configured to run at `orca4ktv.com`. The server handles both the API (for the AI features) and the static frontend files.

## Prerequisites
- A **VPS or Dedicated Server** with Node.js installed (v18+ recommended).
- SSH access to your server.
- Reverse proxy (Nginx/Apache) configured to point `orca4ktv.com` to `localhost:3000/iptv` OR simply exposing port 3000 directly.

## Files to Upload
Upload the following files/folders to your server directory (e.g., `/var/www/orca4ktv`):

1.  `dist/` (The entire build folder)
2.  `server.js` (The Node.js backend)
3.  `package.json` (Project dependencies)
4.  `.env` (Environment variables - **Keep this secure!**)

## Installation & Startup

1.  **Install Production Dependencies**:
    ```bash
    npm install --production
    ```
    *(Note: This installs express, cors, dotenv, etc.)*

2.  **Start the Server**:
    ```bash
    node server.js
    ```
    
    For persistent running (auto-restart on crash/reboot), use PM2:
    ```bash
    npm install -g pm2
    pm2 start server.js --name "orca4ktv-iptv"
    pm2 save
    pm2 startup
    ```

## Nginx Configuration (Recommended)
If you are using Nginx, configure a location block for the subdirectory:
```nginx
location /iptv/ {
    proxy_pass http://localhost:3000/iptv/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

## Verification
-   Visit: `https://orca4ktv.com`
-   Check AI Feature: Try the "ASK US" button to confirm the backend API is reachable.
