# Deploying SMART 4K to Hostinger

Your project is built and ready for deployment. Follow these steps to put your website live at `smart4k.io`.

## Prerequisites
- Access to your **Hostinger Control Panel** (hPanel).
- The project's **`dist`** folder (located in your project directory: `/Users/macbook2/Downloads/smart4k/tv-smarter website/dist`).

## Step-by-Step Instructions

### 1. Access File Manager
1.  Log in to your Hostinger hPanel.
2.  Go to **Websites** and click **Manage** next to `smart4k.io`.
3.  Scroll down to the **Files** section and click on **File Manager**.

### 2. Navigate to the Target Directory
1.  In the File Manager, navigate to `public_html`.
2.  **Create a new folder** named `iptv` (since you want your site at `smart4k.io`).
    - *If this folder already exists, open it.*
3.  Open the `iptv` folder.

### 3. Upload Files
1.  On your local computer, open the `dist` folder inside your project.
2.  Select **ALL** files and folders inside `dist` (`index.html`, `assets/`, `images/`, etc.).
3.  Drag and drop them into the `public_html/iptv` folder in Hostinger File Manager.
    - *Alternatively, use the **Upload** button in the top right corner.*

### 4. Verify Structure
Your file structure in Hostinger should look like this:
```
public_html/
└── iptv/
    ├── index.html
    ├── channels.csv
    ├── assets/
    │   ├── index-xxxx.js
    │   └── ...
    └── images/
        ├── netflix.svg
        └── ...
```

### 5. Test the Site
1.  Open `https://smart4k.io` in your browser.
2.  Verify the site loads correctly.
3.  Check that images are visible and the "Free Trial" form works.

## Troubleshooting
-   **404 Errors**: Ensure you created the `iptv` folder exactly as named in the `vite.config.ts` (`base: '/iptv/'`).
-   **Images Not Loading**: Confirm the `images` folder was uploaded correctly inside `iptv`.
