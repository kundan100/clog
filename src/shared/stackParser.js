/**
 * Stack parser
 *
 * Small helpers to parse V8 Error stack lines and find the first stack frame
 * that is outside the logger implementation. Used to determine the caller
 * function name and file path.
 */
const path = require('path');

function parseStackLine(line) {
  const r1 = /^at\s+(?:async\s+)?([^\s(]+)\s+\((.*):(\d+):(\d+)\)$/;
  const r2 = /^at\s+(.*):(\d+):(\d+)$/;
  let m = line.match(r1);
  if (m) return { functionName: m[1], filePath: m[2], line: +m[3], col: +m[4] };
  m = line.match(r2);
  if (m) return { functionName: '<anonymous>', filePath: m[1], line: +m[2], col: +m[3] };
  return null;
}

function findExternalCaller(stackLines = [], skipFiles = []) {
  // skipFiles can contain resolved file paths or directory prefixes
  const resolvedSkips = skipFiles.map((s) => path.resolve(s));
  for (let i = 2; i < stackLines.length; i++) {
    const parsed = parseStackLine(stackLines[i]);
    if (parsed && parsed.filePath) {
      try {
        const resolved = path.resolve(parsed.filePath);
        let skip = false;
        for (const s of resolvedSkips) {
          if (resolved === s || resolved.startsWith(s + path.sep)) {
            skip = true;
            break;
          }
        }
        if (!skip) return parsed;
      } catch (e) {
        // ignore resolution errors and continue
      }
    }
  }
  return null;
}

module.exports = { parseStackLine, findExternalCaller };
