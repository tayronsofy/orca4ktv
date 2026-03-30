const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputDir = path.join(__dirname, '../public/images');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Using Special:FilePath to get the latest version
const baseUrl = "https://commons.wikimedia.org/wiki/Special:FilePath/";

const logos = [
    { name: 'netflix.svg', filename: 'Netflix_2015_logo.svg' },
    { name: 'hbo.svg', filename: 'HBO_logo.svg' },
    { name: 'dazn.svg', filename: 'DAZN_logo.svg' },
    { name: 'tnt.svg', filename: 'TNT_Logo_2016.svg' },
    { name: 'paramount_plus.svg', filename: 'Paramount_Plus.svg' },
    { name: 'fox.svg', filename: 'Fox_Broadcasting_Company_logo_(2019).svg' },
    { name: '24kitchen.svg', filename: '24Kitchen.svg' },
    { name: 'eurosport.svg', filename: 'Eurosport_1_Logo_2015.svg' },
    { name: 'nlziet.png', filename: 'NLZIET_logo.png' },
    { name: 'peacock.svg', filename: 'NBC_Peacock_(2022).svg' },
    { name: 'syfy.svg', filename: 'Syfy_2017_logo.svg' },
    { name: 'hulu.svg', filename: 'Hulu_logo_(2018).svg' },
    { name: 'sky_sports.svg', filename: 'Sky_Sports_logo.svg' },
    { name: 'hbo_max.svg', filename: 'HBO_Max_logo.svg' }
];

const downloadFile = (url, filename) => {
    return new Promise((resolve, reject) => {
        const filepath = path.join(outputDir, filename);
        console.log(`Downloading ${filename} from ${url}...`);

        // Add User-Agent and -L (location)
        // User-Agent: CoolBot/0.0 (https://example.org/coolbot/; coolbot@example.org)
        const command = `curl -L -A "TVSmarterBot/1.0 (contact@tvsmarter.io)" -o "${filepath}" "${url}"`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error downloading ${filename}: ${error.message}`);
                resolve();
                return;
            }
            console.log(`Finished ${filename}`);
            resolve();
        });
    });
};

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const run = async () => {
    for (const logo of logos) {
        await downloadFile(baseUrl + logo.filename, logo.name);
        await wait(2000); // 2 second delay to facilitate rate limits
    }
    console.log("Logo downloads complete!");
};

run();
