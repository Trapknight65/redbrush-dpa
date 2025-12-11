const fs = require('fs');
const path = require('path');

const standaloneDir = path.join(process.cwd(), '.next', 'standalone');

function findProjectRoot(dir) {
    if (!fs.existsSync(dir)) return null;

    // Check if this dir has server.js (priority)
    if (fs.existsSync(path.join(dir, 'server.js'))) {
        return dir;
    }

    // If not, inspect subdirectories
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
        if (item.isDirectory() && item.name !== 'node_modules') {
            const found = findProjectRoot(path.join(dir, item.name));
            if (found) return found;
        }
    }
    return null;
}

const deployRoot = findProjectRoot(standaloneDir);

if (!deployRoot) {
    console.error('Could not determine standalone project root (no server.js found in .next/standalone)');
    process.exit(1);
}

console.log(`Detected deployment root: ${deployRoot}`);

const srcPublic = path.join(process.cwd(), 'public');
const destPublic = path.join(deployRoot, 'public');

const srcStatic = path.join(process.cwd(), '.next', 'static');
// Static usually goes to .next/static relative to the deploy root
const destStatic = path.join(deployRoot, '.next', 'static');

function copyDir(src, dest) {
    try {
        if (!fs.existsSync(src)) {
            console.warn(`Source directory ${src} does not exist, skipping.`);
            return;
        }
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
