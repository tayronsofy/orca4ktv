const fs = require('fs');
const https = require('https');
const path = require('path');
const { promisify } = require('util');

const outputDir = path.join(__dirname, '../public/images');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Map of Original URL -> Local Filename (preserving basename usually)
const assets = [
    // Constants
    "https://tvsmarter.io/wp-content/uploads/2026/01/iptv-devices-scaled.png",
    "https://tvsmarter.io/wp-content/uploads/2026/01/iptv-AI-scaled.png",
    "https://tvsmarter.io/wp-content/uploads/2026/01/4K-IPTV-scaled.png",

    // Movie Showcase
    "https://tvsmarter.io/wp-content/uploads/2024/09/IMG_8189-1-1.webp",
    "https://tvsmarter.io/wp-content/uploads/2024/09/IMG_8180-1.webp",
    "https://tvsmarter.io/wp-content/uploads/2024/09/IMG_8182-1.webp",
    "https://tvsmarter.io/wp-content/uploads/2024/09/IMG_8186-1.webp",
    "https://tvsmarter.io/wp-content/uploads/2024/09/IMG_8189-2.webp",
    "https://tvsmarter.io/wp-content/uploads/2024/09/IMG_8183-1.webp",
    "https://tvsmarter.io/wp-content/uploads/2024/09/IMG_8193-1.webp",
    "https://tvsmarter.io/wp-content/uploads/2024/09/IMG_8184-1.webp",
    "https://tvsmarter.io/wp-content/uploads/2024/09/IMG_8178-1.webp",
    "https://tvsmarter.io/wp-content/uploads/2024/09/IMG_8185-1.webp",
    "https://tvsmarter.io/wp-content/uploads/2024/09/IMG_8187-1.webp",
    "https://tvsmarter.io/wp-content/uploads/2024/09/IMG_8181-1.webp",
    "https://tvsmarter.io/wp-content/uploads/2024/09/IMG_8188-1.webp",
    "https://tvsmarter.io/wp-content/uploads/2024/09/IMG_8190-1.webp",
    "https://tvsmarter.io/wp-content/uploads/2024/09/IMG_8192-1.webp",

    // Video Banner
    "https://tvsmarter.io/wp-content/uploads/2024/09/vid.webm",

    // Sports Logos
    "https://tvsmarter.io/wp-content/uploads/2024/09/48.webp", // Champions League
    "https://tvsmarter.io/wp-content/uploads/2024/09/41-1.webp", // NBA
    "https://tvsmarter.io/wp-content/uploads/2024/09/UFC.webp",
    "https://tvsmarter.io/wp-content/uploads/2024/09/111.webp", // NFL
    "https://tvsmarter.io/wp-content/uploads/2024/09/101.webp", // MLB
    "https://tvsmarter.io/wp-content/uploads/2024/09/108.webp", // NHL
    "https://tvsmarter.io/wp-content/uploads/2024/09/37.webp", // F1
    "https://tvsmarter.io/wp-content/uploads/2024/09/39.webp", // Moto GP
    "https://tvsmarter.io/wp-content/uploads/2024/09/107.webp", // Tennis
    "https://tvsmarter.io/wp-content/uploads/2024/09/laliga.webp",
    "https://tvsmarter.io/wp-content/uploads/2024/09/IBA.webp",

    // About Us
    "https://tvsmarter.io/wp-content/uploads/2026/01/tvsmarter-not-harder-scaled.png",
    "https://tvsmarter.io/wp-content/uploads/2026/01/iptv-quality-scaled.png",

    // Video Section
    "https://tvsmarter.io/wp-content/uploads/2024/09/Dreifaltigkeitsmotiv-Animation-5er-l.webm"
];

const downloadFile = (url) => {
    return new Promise((resolve, reject) => {
        const filename = path.basename(url);
        const filepath = path.join(outputDir, filename);

        console.log(`Downloading ${filename}...`);

        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                file.close();
                fs.unlink(filepath, () => { }); // Delete partial file
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }

            response.pipe(file);

            file.on('finish', () => {
                file.close();
                console.log(`Finished ${filename}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err);
        });
    });
};

const run = async () => {
    console.log(`Starting download of ${assets.length} assets...`);

    // Process strictly sequentially to avoid overwhelming partial file writes or network
    for (const url of assets) {
        try {
            await downloadFile(url);
        } catch (error) {
            console.error(`Error downloading ${url}:`, error.message);
        }
    }

    console.log("All downloads complete!");
};

run();
