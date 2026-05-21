# clog

Lightweight reusable logging utility for Node.js CLI tools and apps.

## Install

```bash
npm install @kundan100/clog
```

## Quick CLI

Run the included CLI with:

```bash
npx clog
```

The CLI initializes the library and prints informational startup messages.

## Programmatic usage

Require and use `clog` in your project instead of `console`:

```js
const clog = require('@kundan100/clog');

// simple logging
clog.info('Application started');
clog.warn('This is a warning');
clog.error('Something failed');
clog.debug('Debug details');

// configure runtime behaviour
clog.configure({ minLevel: 'info', usePrefix: true, useColors: true });

// access low-level logger if needed
const { logger } = require('@kundan100/clog');
logger.info('Direct logger call');
```

## Configuration

Configuration keys (from `config.json` and `clog.configure()`):

- `minLevel` : one of `error`, `warn`, `info`, `log`, `debug`. Messages below this level are suppressed.
- `usePrefix`: boolean. When true, each message is prefixed with `[file > function]` for easier tracing.
- `useColors`: boolean. When true, output includes ANSI color codes.

You can set these programmatically with `clog.configure(cfg)` or by editing the package `config.json` shipped with the module.

## Example

See the example in `src/examples/basicExample/index.js` for a minimal usage snippet.

## API

- `run({ pkg })` — orchestration entry used by the CLI.
- `log/info/warn/error/debug(...)` — logging helpers.
- `configure(cfg)` — update logger configuration at runtime.
- `getCallerInfo()` — inspect where the call originated (file/function/line).

## Notes & recommendations

- The project aims to remain small and modular. Core logic lives under `src/features` and shared helpers under `src/shared`.
- `logger` uses an internal module-scoped config; call `clog.configure()` early in your app to set desired behaviour.
- `package.json` currently includes a `postinstall` script (`clog --version`) which can cause noisy installs or fail in some CI environments — consider removing or guarding it if you publish widely.

## Contributing

Feel free to open issues or PRs. Suggested small improvements:

- Add a `createLogger()` factory to support isolated logger instances.
- Add unit tests around `shouldLog()` and `getCallerInfo()`.
- Provide a small smoke `test` script in `package.json`.

## License

MIT
