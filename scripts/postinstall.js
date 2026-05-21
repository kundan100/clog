#!/usr/bin/env node
// scripts/postinstall-guard.js
// Guarded postinstall: print version only in interactive, non-CI installs

const isCI = !!(
  process.env.CI ||
  process.env.GITHUB_ACTIONS ||
  process.env.GITLAB_CI ||
  process.env.CIRCLECI ||
  process.env.TRAVIS
);

if (isCI) process.exit(0);
if (process.env.NPM_CONFIG_PRODUCTION === 'true') process.exit(0);
if (!process.stdout.isTTY) process.exit(0);

try {
  const path = require('path');
  const pkg = require(path.join(__dirname, '..', 'package.json'));
  // lightweight, non-failing informational message
  console.log(`clog ${pkg.version}`);
} catch (err) {
  // swallow errors to avoid failing installs
}
