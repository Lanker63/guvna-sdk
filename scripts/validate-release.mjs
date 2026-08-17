import { execFile } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { promisify } from 'node:util';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const run = promisify(execFile);
const packageDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const temporaryDirectory = await mkdtemp(resolve(tmpdir(), 'guvna-sdk-release-'));

try {
  await run('pnpm', ['build'], { cwd: packageDirectory });
  const { stdout } = await run(
    'pnpm',
    ['pack', '--pack-destination', temporaryDirectory],
    { cwd: packageDirectory },
  );
  const tarballName = stdout.match(/\/([^/]+\.tgz)/)?.[1];
  if (!tarballName) throw new Error('Could not locate SDK tarball');
  const tarballPath = resolve(temporaryDirectory, tarballName);

  const { stdout: contents } = await run('tar', ['-tzf', tarballPath]);
  const entries = contents.trim().split('\n').filter(Boolean);
  const allowed = new Set([
    'package/LICENSE',
    'package/package.json',
    'package/dist/src/index.js',
    'package/dist/src/index.js.map',
    'package/dist/src/index.d.ts',
    'package/dist/src/index.d.ts.map',
  ]);
  const unexpected = entries.filter((entry) => !allowed.has(entry));
  if (unexpected.length) {
    throw new Error(`Unexpected SDK tarball entries: ${unexpected.join(', ')}`);
  }

  const packedManifest = JSON.parse(
    (await run('tar', ['-xOf', tarballPath, 'package/package.json'])).stdout,
  );
  const manifestText = JSON.stringify(packedManifest);
  if (manifestText.includes('@guvna/core') || /(?:workspace|link|file):/.test(manifestText)) {
    throw new Error('SDK tarball contains a Core or local dependency reference');
  }

  await run('npm', ['init', '--yes'], { cwd: temporaryDirectory });
  await run('npm', ['install', '--ignore-scripts', tarballPath], {
    cwd: temporaryDirectory,
  });
  await writeFile(
    resolve(temporaryDirectory, 'smoke.mjs'),
    "import * as sdk from '@guvna/sdk';\nif (typeof sdk.encodeRuntimeOperation !== 'function') process.exit(1);\n",
  );
  await run(process.execPath, ['smoke.mjs'], { cwd: temporaryDirectory });

  console.log(`SDK release validation passed: ${tarballPath}`);
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}
