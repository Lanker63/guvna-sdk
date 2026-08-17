import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(
  await readFile(resolve(packageDirectory, 'package.json'), 'utf8'),
);

if (packageJson.private !== true) {
  throw new Error('@guvna/core must remain private');
}

if (packageJson.license !== 'UNLICENSED') {
  throw new Error('@guvna/core must remain commercially licensed');
}

console.log('Core publication boundary is valid');
