import { dataPath, saveFile, settingsPath } from '../utils/fileOperations';

import { UPDATE_SETTINGS } from '../actions/settings';

/**
 * Writes the current text file and settings to files
 */
const fileWriterMiddleware = store => next => action => {
  if (action.type === UPDATE_SETTINGS) {
    writeSettings(store);
  } else {
    writeCache(store);
  }

  return next(action);
};

const writeCache = store => {
  Promise.resolve().then(() => {
    const { markdown } = store.getState();
    saveFile(JSON.stringify(markdown), dataPath);
  });
};

const writeSettings = store => {
  Promise.resolve().then(() => {
    const { settings } = store.getState();
    saveFile(JSON.stringify(settings), settingsPath);
  });
};

export default fileWriterMiddleware;
