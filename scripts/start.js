const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const standaloneDir = path.join(process.cwd(), '.next', 'standalone');

function findServerJs(dir) {
    if (!fs.existsSync(dir)) return null;

    const candidate = path.join(dir, 'server.js');
    if (fs.existsSync(candidate)) {
        return candidate;
    }

    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
        if (item.isDirectory() && item.name !== 'node_modules') {
            const found = findServerJs(path.join(dir, item.name));
            if (found) return found;
        }
    }
    return null;
}

const serverScript = findServerJs(standaloneDir);

if (!serverScript) {
    console.error('Could not find server.js in .next/standalone');
    process.exit(1);
}

console.log(`Starting server from: ${serverScript}`);

// Start the server
const child = spawn('node', [serverScript], {
    stdio: 'inherit',
    env: process.env
});

child.on('close', (code) => {
    process.exit(code);
});
