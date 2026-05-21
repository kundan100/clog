# clog

A small reusable npm utility for consistent CLI logging.

## Install

```bash
npm install @kundan100/clog
```

## CLI usage

```bash
npx clog
```

## Library usage

Use `clog.*` instead of `console.*`:

```js
const clog = require('@kundan100/clog');

clog.info('Application started');
clog.warn('This is a warning');
clog.error('Something failed');
clog.debug('Debug details');
```

`clog` also exposes the underlying logger object if you need it:

```js
const { logger } = require('@kundan100/clog');
logger.info('Hello from logger');
```
