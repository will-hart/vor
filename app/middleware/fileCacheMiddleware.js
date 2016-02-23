import { dataPath, saveFile } from '../utils/fileOperations';

/**
 * If requested by users settings, writes the current DB to file
 * as a backup
 */
const fileWriterMiddleware = store => next => action => {
  Promise.resolve().then(() => {
    const state = store.getState();
    saveFile(JSON.stringify(state), dataPath);
  });

  return next(action);
};

export default fileWriterMiddleware;
