/**
 * Colors
 *
 * ANSI escape code map for log level colorization.
 * Set useColors: false in loggerConfig.json to disable.
 */

const ENABLE_COLOR = (!!process.stdout.isTTY || !!process.env.FORCE_COLOR) && !process.env.NO_COLOR;

let _useColors = true;

function configure({ useColors } = {}) {
  if (typeof useColors === 'boolean') _useColors = useColors;
}

// ANSI has background color codes in the 4x range (vs 3x for foreground):
const RESET = '\x1b[0m';
const COLOR_CODES = {
  dim:      '\x1b[2m',
  white:    '\x1b[37m',
  cyan:     '\x1b[36m',
  yellow:   '\x1b[33m',
  red:      '\x1b[31m',
  boldRed:  '\x1b[1;31m',
  green:    '\x1b[32m',
  magenta:  '\x1b[35m',
  blue:     '\x1b[34m',
};
const BG_COLOR_CODES = {
  black:   '\x1b[40m',
  red:     '\x1b[41m',
  green:   '\x1b[42m',
  yellow:  '\x1b[43m',
  blue:    '\x1b[44m',
  magenta: '\x1b[45m',
  cyan:    '\x1b[46m',
  white:   '\x1b[47m',
};

const LEVEL_COLORS = {
  debug: COLOR_CODES.dim,
  log:   COLOR_CODES.white,
  info:  COLOR_CODES.cyan + BG_COLOR_CODES.blue,
  warn:  COLOR_CODES.yellow,
  error: COLOR_CODES.boldRed + BG_COLOR_CODES.black,  // fg: bold red, bg: black
};

function colorizeByLevel(str, logLevel) {
  if (!ENABLE_COLOR || !_useColors) return str;
  const colorCode = LEVEL_COLORS[logLevel] || '';
  return colorCode ? `${colorCode}${str}${RESET}` : str;
}

module.exports = { colorizeByLevel, configure, COLOR_CODES, BG_COLOR_CODES, LEVEL_COLORS, RESET };
