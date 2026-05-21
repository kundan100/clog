const logger = require('#features/logger/logger.js');
const { loadAppConfig } = require('#shared/appConfigManager.js');
const { buildLogPipeline, executeLogPipeline } = require('#features/logPipeline/logPipeline.js');

async function run({ pkg } = {}) {
  const appConfig = loadAppConfig();
  logger.configure(appConfig);
  logger.debug('Starting orchestration');

  const context = {
    pkg,
    appConfig,
    logger,
    startedAt: new Date().toISOString(),
  };

  logger.debug('Application context initialized');

  const pipeline = buildLogPipeline(context);
  await executeLogPipeline({ ...context, pipeline });

  logger.debug('Orchestration completed successfully');
  return 0;
}

module.exports = {
  run,
};
