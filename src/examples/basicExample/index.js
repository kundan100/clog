/**
 * Basic example — how to consume @kundan100/clog as an npm library
 *
 * ── Running from this repo (no install needed) ────────────────────────────────
 *   node src/examples/basicExample/index.js
 *
 *   The require below uses a relative path ('../../..') which resolves to
 *   clog/index.js via the "main" field in package.json.
 *
 * ── Running after installing from npm ─────────────────────────────────────────
 *   npm install @kundan100/clog
 *
 *   Then replace the require and globals import in this file:
 *     require('../../..')              → require('@kundan100/clog')
 *     require('../../../src/shared/globals.js') → require('@kundan100/clog/src/shared/globals.js')
 */

// Relative path for running directly from the repo (no install needed).
// When consuming as an installed package, replace with: require('@kundan100/clog')
const clog = require('../../..');

// ─── 1. Simple log methods ────────────────────────────────────────────────────
// Each method maps to its console counterpart and is filtered by minLevel in
// config.json. Default minLevel is 'log', so all levels print except debug.

clog.log('Plain log — no level label, white text');
clog.info('Info message — cyan prefix');
clog.warn('Warning message — yellow');
clog.error('Error message — bold red');
clog.debug('Debug message — only prints when minLevel is set to "debug" in config.json');

// ─── 2. Logging objects ───────────────────────────────────────────────────────
// Objects are passed as separate arguments to console — they stay inspectable
// (not JSON.stringify'd) in terminals/DevTools.

const user = { id: 42, name: 'Alice', role: 'admin' };
clog.info('User loaded:', user);
clog.warn('Unexpected field in payload:', { extra: true, count: 3 });

// ─── 3. logWithLocation — explicit caller prefix ──────────────────────────────
// Prints [fileName > functionName] before the message.
// Requires usePrefix: true in config.json (the default).

function processOrder(orderId) {
  clog.logWithLocation('info', 'Processing order', orderId);
  clog.logWithLocation('warn', 'Stock low for order', orderId);
}
processOrder('ORD-001');

// ─── 4. getCallerInfo — inspect call location programmatically ────────────────
// Returns { functionName, fileName, filePath, line, col } for the calling frame.

function diagnose() {
  const info = clog.getCallerInfo();
  clog.log('Called from:', `${info.fileName} > ${info.functionName} (line ${info.line})`);
}
diagnose();

// ─── 5. configure() — override logger settings at runtime ────────────────────
// Useful when consuming clog as a library inside your own app and you want to
// control logger behaviour without editing config.json.

clog.configure({ usePrefix: false, minLevel: 'warn' });
clog.info('This info is now suppressed (minLevel is warn)');
clog.warn('This warn prints — but no [file > fn] prefix (usePrefix is false)');
clog.error('This error prints — no prefix either');

// Restore defaults for the rest of the example
clog.configure({ usePrefix: true, minLevel: 'log' });

// ─── 6. useColors: false — plain text output ─────────────────────────────────
// Useful for piped output, file logging, or CI environments.

clog.configure({ useColors: false });
clog.info('No ANSI codes in this output — plain text only');
clog.error('Same here — plain text error');

clog.configure({ useColors: true });

// ─── 7. globals (optional) — convenience helpers on globalThis ───────────────
// Call initGlobals() once at app startup to install __fn, __loc, logWithLoc.
// These are for quick debugging — prefer the module API in production.

const { initGlobals } = require('../../../src/shared/globals.js');
initGlobals();

// anywhere in code after initGlobals():
clog.log(__loc());             // → "basicExample/index.js > <anonymous>"
clog.log(__fn());              // → function name of the calling frame
logWithLoc('hello from here'); // → logs with [file > fn] prefix
