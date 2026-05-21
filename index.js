#!/usr/bin/env node

// Ensure color output is available on Windows and when piped through npm.
process.env.FORCE_COLOR = process.env.FORCE_COLOR || '1';

const pkg = require('#root/package.json');
const { run } = require('#root/src/clog.js');
const logger = require('#features/logger/logger.js');
const { initGlobals } = require('#shared/globals.js');

async function cli() {
  logger.info(`Starting clog ${pkg.version}... This is a reusable npm utility to log messages.`);
  // init globals
  initGlobals();

  try {
    const exitCode = await run({ pkg });
    process.exit(exitCode);
  } catch (error) {
    logger.error('Fatal error:', error);
    process.exit(1);
  }
}

const clog = {
  run,
  log: logger.log,
  info: logger.info,
  warn: logger.warn,
  error: logger.error,
  debug: logger.debug,
  configure: logger.configure,
  getCallerInfo: logger.getCallerInfo,
  logWithLocation: logger.logWithLocation,
};

module.exports = clog;

if (require.main === module) {
  cli();
}
