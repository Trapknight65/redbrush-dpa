const fs = require('fs');
const path = require('path');

const srcPublic = path.join(process.cwd(), 'public');
const destPublic = path.join(process.cwd(), '.next', 'standalone', 'Redbrush-dpa', 'public');

const srcStatic = path.join(process.cwd(), '.next', 'static');
const destStatic = path.join(process.cwd(), '.next', 'standalone', 'Redbrush-dpa', '.next', 'static');

function copyDir(src, dest) {
    try {
        fs.cpSync(src, dest, { recursive: true });
        console.log(`Copied ${src} to ${dest}`);
    } catch (err) {
        console.error(`Error copying ${src} to ${dest}:`, err);
        process.exit(1);
    }
}

// Ensure destinations exist
fs.mkdirSync(path.dirname(destPublic), { recursive: true });
fs.mkdirSync(path.dirname(destStatic), { recursive: true });

copyDir(srcPublic, destPublic);
copyDir(srcStatic, destStatic);

console.log('Assets copied successfully.');
