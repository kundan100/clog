const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '..', '..', 'config.json');

const DEFAULT_CONFIG = {
  DEBUG_LOG_ENABLED: false,
  OPEN_CONFIG_FILE_WHILE_CHECKING_CONFIG: true,
};

function loadAppConfig() {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
    const root = JSON.parse(raw);
    return root?.data?.data || DEFAULT_CONFIG;
  } catch (error) {
    return {
      ...DEFAULT_CONFIG,
      _loadError: error.message,
    };
  }
}

module.exports = {
  loadAppConfig,
  CONFIG_PATH,
};
