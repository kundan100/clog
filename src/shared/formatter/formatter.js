/**
 * Formatter
 *
 * Provides small helpers to format a log prefix and a readable file:line:col
 * location string. Used by the core logger when printing messages.
 */
const { colorizeByLevel } = require('./colors');

function formatPrefix(info, logLevel) {
  const prefix = `[${info.fileName || '<unknown>'} > ${info.functionName || '<anonymous>'}]`;
  return logLevel ? colorizeByLevel(prefix, logLevel) : prefix;
}

// TBD: to be used in future.
function formatLocation(info) {
  return `${info.filePath || '<unknown>'}:${info.line || '?'}:${info.col || '?'}`;
}

module.exports = { formatPrefix, formatLocation };
