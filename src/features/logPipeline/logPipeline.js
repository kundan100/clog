function buildLogPipeline(context) {
  return {
    name: 'default-log-pipeline',
    appConfig: context.appConfig,
  };
}

async function executeLogPipeline({ logger, pipeline }) {
  logger.debug('[src/features/logPipeline.js] Running pipeline:', pipeline.name);
  // Placeholder for future pipeline steps.
  logger.info(`[src/features/logPipeline.js] Pipeline '${pipeline.name}' initialized`);
}

module.exports = {
  buildLogPipeline,
  executeLogPipeline,
};
