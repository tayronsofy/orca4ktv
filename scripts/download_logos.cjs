const fs = require('fs');
const https = require('https');
const path = require('path');

const outputDir = path.join(__dirname, '../public/images');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const logos = [
    { name: 'netflix.png', url: 'https://logo.clearbit.com/netflix.com' },
    { name: 'hbo.png', url: 'https://logo.clearbit.com/hbo.com' },
    { name: 'dazn.png', url: 'https://logo.clearbit.com/dazn.com' },
    { name: 'tnt.png', url: 'https://logo.clearbit.com/tntdrama.com' },
    { name: 'paramount_plus.png', url: 'https://logo.clearbit.com/paramountplus.com' },
    { name: 'fox.png', url: 'https://logo.clearbit.com/fox.com' },
    { name: '24kitchen.png', url: 'https://logo.clearbit.com/24kitchen.nl' },
    { name: 'eurosport.png', url: 'https://logo.clearbit.com/eurosport.com' },
    { name: 'nlziet.png', url: 'https://logo.clearbit.com/nlziet.nl' },
    { name: 'peacock.png', url: 'https://logo.clearbit.com/peacocktv.com' },
    { name: 'syfy.png', url: 'https://logo.clearbit.com/syfy.com' },
    { name: 'hulu.png', url: 'https://logo.clearbit.com/hulu.com' },
    { name: 'sky_sports.png', url: 'https://logo.clearbit.com/skysports.com' },
    { name: 'hbo_max.png', url: 'https://logo.clearbit.com/hbomax.com' }
];

const downloadFile = (url, filename) => {
    return new Promise((resolve, reject) => {
        const filepath = path.join(outputDir, filename);
        console.log(`Downloading ${filename}...`);

        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                file.close();
                fs.unlink(filepath, () => { });
                console.error(`Failed to get '${url}' (${response.statusCode})`);
                // Create a dummy file or just fail? failing is better so we know.
                // But for bulk, maybe we just skip.
                resolve();
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
            console.error(`Error downloading ${filename}: ${err.message}`);
            resolve();
        });
    });
};

const run = async () => {
    for (const logo of logos) {
        await downloadFile(logo.url, logo.name);
    }
    console.log("Logo downloads complete!");
};

run();
