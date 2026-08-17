import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sdkPackage = JSON.parse(
  await readFile(resolve(packageDirectory, 'package.json'), 'utf8'),
);
const corePackagePath = resolve(packageDirectory, '..', 'core', 'package.json');

for (const dependencyField of ['dependencies', 'peerDependencies']) {
  if (sdkPackage[dependencyField]?.['@guvna/core']) {
    throw new Error(
      `@guvna/core must not appear in SDK ${dependencyField}`,
    );
  }
}

try {
  const corePackage = JSON.parse(await readFile(corePackagePath, 'utf8'));
  if (corePackage.private !== true) {
    throw new Error('@guvna/core must remain private');
  }
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

if (!sdkPackage.files?.includes('dist/src')) {
  throw new Error('SDK package must allowlist dist/src');
}

if (!sdkPackage.exports?.['.']?.import || !sdkPackage.exports['.'].types) {
  throw new Error('SDK package must expose compiled import and type entries');
}

if (sdkPackage.publishConfig?.access !== 'public') {
  throw new Error('SDK package must declare public publish access');
}

console.log('SDK publication boundary is valid');
