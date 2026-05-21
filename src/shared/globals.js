/**
 * Globals initializer
 *
 * Exposes small convenience helpers on `globalThis` when `initGlobals()` is
 * called. These are useful for quick debugging and simple scripts. Prefer
 * the module API in production code.
 *
 * Production API example:
 *
 * // require the shared logger module
 * const logger = require('../shared/logger');
 *
 * // use the module API (preferred)
 * logger.info('service started');
 * const info = logger.getCallerInfo();
 *
 * // optionally install globals at application startup
 * // logger.initGlobals();
 */
const logger = require('#features/logger/logger.js');

function initGlobals() {
  if (typeof globalThis === 'undefined') return;
  globalThis.__fn = (offset) => logger.getCallerInfo(offset).functionName;
  globalThis.__loc = (offset) => {
    const i = logger.getCallerInfo(offset);
    return `${i.fileName} > ${i.functionName}`;
  };
  globalThis.logWithLoc = (...a) => logger.logWithLocation('log', ...a);
}

module.exports = { initGlobals };
