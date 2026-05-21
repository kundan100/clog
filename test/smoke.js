#!/usr/bin/env node
// Minimal smoke test for clog

try {
  const path = require('path');
  const clog = require(path.join(__dirname, '..', 'index.js'));

  if (!clog || typeof clog.info !== 'function') {
    console.error('SMOKE TEST: clog API missing');
    process.exit(1);
  }

  // Configure deterministically for test output
  if (typeof clog.configure === 'function') {
    clog.configure({ minLevel: 'debug', usePrefix: false, useColors: false });
  }

  clog.info('SMOKE: info');
  if (typeof clog.debug === 'function') clog.debug('SMOKE: debug');
  clog.warn('SMOKE: warn');
  clog.error('SMOKE: error');

  console.log('SMOKE TEST: PASS');
  process.exit(0);
} catch (err) {
  console.error('SMOKE TEST: FAIL', err && err.stack ? err.stack : err);
  process.exit(1);
}
