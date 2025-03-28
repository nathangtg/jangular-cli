import https from 'https';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export default class UpdateNotifier {
    constructor(packageName, silent = false) {
        this.packageName = packageName;
        this.silent = silent;
        this.localVersion = this.getLocalVersion();
    }

    getLocalVersion() {
        try {
            const pkgPath = resolve(process.cwd(), 'package.json');
            return JSON.parse(readFileSync(pkgPath, 'utf8')).version;
        } catch (error) {
            console.error('[UpdateNotifier] Failed to read local package.json:', error.message);
            return null;
        }
    }

    checkForUpdate() {
        if (!this.localVersion) return;

        https.get(`https://registry.npmjs.org/${this.packageName}/latest`, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const latestVersion = JSON.parse(data).version;
                    if (latestVersion !== this.localVersion) {
                        this.notifyUpdate(latestVersion);
                    }
                } catch (error) {
                    console.error('[UpdateNotifier] Error parsing response:', error.message);
                }
            });

        }).on('error', (error) => {
            console.error(`[UpdateNotifier] Failed to fetch latest version: ${error.message}`);
        });
    }

    notifyUpdate(latestVersion) {
        if (this.silent) return;
        console.log(`\x1b[33mUpdate available: ${this.localVersion} → ${latestVersion}\x1b[0m`);
        console.log(`Run \x1b[32mnpm install -g ${this.packageName}\x1b[0m to update.`);
    }
}
