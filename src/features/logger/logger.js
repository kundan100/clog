/**
 * Core logger
 *
 * Configured externally via configure(cfg) — called from clog.js after
 * loading appConfig. Falls back to safe defaults until configure() is called.
 *
 * Config fields (all from config.json via appConfigManager):
 *   - usePrefix:  prepend [fileName > functionName] to every message
 *   - minLevel:   suppress messages below the given priority
 *   - useColors:  enable/disable ANSI color codes
 */
const path = require('path');
const { formatPrefix } = require('#shared/formatter/formatter.js');
const { configure: configureColors } = require('#shared/formatter/colors.js');
const { parseStackLine, findExternalCaller } = require('#shared/stackParser.js');

let _cfg = { usePrefix: true, minLevel: 'log', useColors: true };

function configure(cfg = {}) {
  if (cfg.usePrefix !== undefined) _cfg.usePrefix = !!cfg.usePrefix;
  if (cfg.minLevel !== undefined) _cfg.minLevel = cfg.minLevel;
  if (cfg.useColors !== undefined) _cfg.useColors = !!cfg.useColors;
  configureColors({ useColors: _cfg.useColors !== false });
}

function getCallerInfo(preferredOffset = 2) {
  const err = new Error();
  const stack = (err.stack || '').split('\n').map(s => s.trim());
  const loggerDir = path.resolve(__dirname);
  const parsed = findExternalCaller(stack, [loggerDir]);
  if (parsed) {
    return { functionName: parsed.functionName, filePath: parsed.filePath, fileName: path.basename(parsed.filePath), line: parsed.line, col: parsed.col };
  }
  const fallback = parseStackLine(stack[preferredOffset] || '') || parseStackLine(stack[2] || '') || { functionName: '<unknown>', filePath: '<unknown>' };
  return { functionName: fallback.functionName, filePath: fallback.filePath, fileName: path.basename(fallback.filePath || ''), line: fallback.line, col: fallback.col };
}

function shouldLog(level) {
  const levelPriority = { error: 50, warn: 40, info: 30, log: 20, debug: 10 };
  const msgPrio = levelPriority[level] || levelPriority.log;
  const minPrio = levelPriority[_cfg.minLevel] || levelPriority.log;
  return msgPrio >= minPrio;
}

function getConsoleMethod(level) {
  return (console[level] && typeof console[level] === 'function') ? console[level].bind(console) : console.log.bind(console);
}

function logWithLocation(level = 'log', ...args) {
  if (!shouldLog(level)) return;
  const method = getConsoleMethod(level);
  if (!_cfg.usePrefix) {
    method(...args);
    return;
  }
  const info = getCallerInfo();
  const prefix = formatPrefix(info, level);
  method(prefix, ...args);
}

module.exports = {
  configure,
  getCallerInfo,
  logWithLocation,
  log:   (...a) => logWithLocation('log',   ...a),
  info:  (...a) => logWithLocation('info',  ...a),
  warn:  (...a) => logWithLocation('warn',  ...a),
  error: (...a) => logWithLocation('error', ...a),
  debug: (...a) => logWithLocation('debug', ...a),
};
