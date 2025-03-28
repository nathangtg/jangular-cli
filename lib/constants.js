import { readFileSync } from 'fs';
import { join } from 'path';

const packageJsonPath = join(__dirname, '../package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

export const PROGRAM_VERSION = packageJson.version;
export const PROGRAM_DESCRIPTION = packageJson.description;
