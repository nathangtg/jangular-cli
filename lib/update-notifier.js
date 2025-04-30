import { execSync } from 'child_process';
import { get as httpsGet } from 'https';
import semver from 'semver';

export class UpdateNotifier {
    constructor(packageName, silent = false) {
        this.packageName = packageName;
        this.silent = silent;
        this.localVersion = this.getLocalVersion();
    }

    getLocalVersion() {
        try {
            const output = execSync(`npm list -g ${this.packageName} --depth=0`, { encoding: 'utf8' });
            const versionMatch = output.match(/\d+\.\d+\.\d+/);
            return versionMatch ? versionMatch[0] : null;
        } catch (error) {
            console.error(`[UpdateNotifier] Failed to get local version: ${error.message}`);
            return null;
        }
    }

    checkForUpdate(retryCount = 0) {
        return new Promise((resolve, reject) => {
            if (!this.localVersion) {
                return resolve();
            }

            const options = {
                hostname: 'registry.npmjs.org',
                path: `/${this.packageName}/latest`,
                method: 'GET',
                headers: {
                    'User-Agent': 'Node.js Update Notifier'
                }
            };

            const req = httpsGet(options, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    try {
                        const latestVersion = JSON.parse(data).version;

                        if (semver.gt(latestVersion, this.localVersion)) {
                            this.notifyUpdate(latestVersion);
                        }

                        resolve();
                    } catch (error) {
                        console.error(`[UpdateNotifier] Error parsing response: ${error.message}`);
                        reject(error);
                    }
                });
            });

            req.on('error', (error) => {
                if (retryCount < 2) {
                    console.warn(`[UpdateNotifier] Retry ${retryCount + 1}: ${error.message}`);
                    return resolve(this.checkForUpdate(retryCount + 1));
                }
                console.error(`[UpdateNotifier] Failed to fetch latest version: ${error.message}`);
                reject(error);
            });

            req.setTimeout(8000, () => {
                req.destroy(new Error('Request timed out'));
            });
        });
    }

    notifyUpdate(latestVersion) {
        if (this.silent) return;
        console.log(`\x1b[33mUpdate available: ${this.localVersion} → ${latestVersion}\x1b[0m`);
        console.log(`Run \x1b[32mnpm install -g ${this.packageName}\x1b[0m to update.`);
    }
}