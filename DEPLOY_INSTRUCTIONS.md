# Deployment Guide for Hostinger

Your application is now a **Node.js Application** (because it has a secure backend `server.js` to protect your API key). You cannot simply upload the `dist` folder to a basic static website host anymore.

## Option 1: Hostinger Node.js Hosting (Recommended)

If you have a Hostinger plan that supports Node.js (e.g., VPS or Cloud capable of Node apps):

1.  **Prepare your files**:
    *   You need to upload the **ENTIRE project folder**, NOT just `dist`.
    *   **Exclude** `node_modules` (it's too huge to upload).
    *   **Include**: `server.js`, `package.json`, `.env`, and the `dist` folder (make sure you run `npm run build` locally first).

2.  **Upload to File Manager**:
    *   Upload all files to your `public_html` or app directory.

3.  **Setup Node.js in Hostinger**:
    *   Go to **Websites** -> **Manage** -> **Advanced** -> **Node.js**.
    *   **Application Root**: Set to your folder (e.g., `public_html`).
    *   **Application Startup File**: Set to `server.js`.
    *   **Install Dependencies**: Click the **Run NPM Install** button in the Hostinger dashboard.
    *   **Start**: Click **Start Application**.

## Option 2: VPS / Other Node Hosts (DigitalOcean, Vercel, Render)

If your Hostinger plan is essential "Shared Web Hosting" that doesn't support Node.js, the AI features **will not work**.

In that case, you have two choices:
1.  **Upgrade** to a plan with Node.js support.
2.  **Deploy ONLY the backend** (the `server.js` part) to a free service like **Render** or **Vercel**, and keep your frontend on Hostinger. (This is more advanced).

## Summary checklist

- [ ] Run `npm run build` locally one more time.
- [ ] Ensure `.env` is uploaded (it contains your key!).
- [ ] Ensure `server.js` is uploaded.
- [ ] Ensure `package.json` is uploaded.
- [ ] Do **NOT** upload `node_modules`.
- [ ] Run `npm install` on the server.
- [ ] Start the server.
