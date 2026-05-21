const ENABLE_COLOR = (!!process.stdout.isTTY || !!process.env.FORCE_COLOR) && !process.env.NO_COLOR;

const C = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
};

let debugEnabled = Boolean(process.env.DEBUG_LOG_ENABLED);

function wrap(code, message) {
  return ENABLE_COLOR ? `${code}${message}${C.reset}` : String(message);
}

function formatMessage(prefix, args) {
  const message = args.map((item) => (typeof item === 'string' ? item : JSON.stringify(item, null, 2))).join(' ');
  return prefix ? `${prefix} ${message}` : message;
}

const logger = {
  setDebugEnabled(enabled) {
    debugEnabled = Boolean(enabled);
  },

  log(...args) {
    console.log(formatMessage(null, args));
  },

  info(...args) {
    console.info(wrap(C.cyan, formatMessage('[INFO]', args)));
  },

  warn(...args) {
    console.warn(wrap(C.yellow, formatMessage('[WARN]', args)));
  },

  error(...args) {
    console.error(wrap(C.red, formatMessage('[ERROR]', args)));
  },

  debug(...args) {
    if (!debugEnabled) return;
    console.debug(wrap(C.dim, formatMessage('[DEBUG]', args)));
  },
};

module.exports = logger;
