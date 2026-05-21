const logger = require('#features/logger/logger.js');
const { loadAppConfig } = require('#shared/appConfigManager.js');
const { buildLogPipeline, executeLogPipeline } = require('#features/logPipeline/logPipeline.js');

async function run({ pkg } = {}) {
  const appConfig = loadAppConfig();
  logger.setDebugEnabled(Boolean(appConfig.DEBUG_LOG_ENABLED));
  logger.debug('[src/clog.js] Starting orchestration');

  const context = {
    pkg,
    appConfig,
    logger,
    startedAt: new Date().toISOString(),
  };

  logger.info('[src/clog.js] Application context initialized');

  const pipeline = buildLogPipeline(context);
  await executeLogPipeline({ ...context, pipeline });

  logger.info('[src/clog.js] Orchestration completed successfully');
  return 0;
}

module.exports = {
  run,
};
