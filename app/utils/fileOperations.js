import fs from 'fs';
import path from 'path';

import { remote } from 'electron';
const dialog = remote.require('dialog');

export const dataPath = path.join(remote.app.getPath('userData'), 'cache.txt');

export const getFilePath = (callback) => {
  dialog.showOpenDialog({
    filters: [
      { name: 'Markdown', extensions: ['md', 'markdown'] },
      { name: 'Text', extensions: ['txt'] }
    ],
    title: 'Open a document'
  }, callback);
};

export const getSaveFilePath = (callback) => {
  dialog.showSaveDialog({
    filters: [
      { name: 'Markdown', extensions: ['md'] },
      { name: 'Text', extensions: ['txt'] }
    ],
    title: 'Save a document'
  }, callback);
};

export const askQuestion = (title, question, allowCancel = false) => {
  const result = dialog.showMessageBox({
    title,
    message: question,
    buttons: allowCancel ? ['Yes', 'No', 'Cancel'] : ['Yes', 'No']
  });

  return result === 0;
};

export const saveFile = (text, filePath) => {
  // write settings, bibliography and writing to file
  fs.writeFile(filePath, text, e => {
    if (e !== null) {
      console.warn('An error occurred writing to file', filePath, text, e);
    }
  });
};

export const loadFile = (filePath, errorValue = undefined) => {
  try {
    fs.accessSync(filePath, fs.R_OK);
  } catch (e) {
    return errorValue;
  }

  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    console.error('Error parsing JSON from file', filePath);
  }
};

export const getLastModDate = (filePath) => {
  return fs.statSync(filePath).mtime;
}

export const loadInitialState = () => {
  // load cache from file
  let cachedState = null;

  try {
    cachedState = JSON.parse(loadFile(dataPath));
  } catch (e) {
    console.warn('Error loading cache: ', e);
    return null;
  }

  // check if we have a file open
  if (cachedState.markdown.path === '') {
    return cachedState;
  }

  // check that the file wasn't modified
  const lastModded = getLastModDate(cachedState.markdown.path);
  if (Math.floor(lastModded.getTime() / 1000) !==
    Math.floor(new Date(cachedState.markdown.lastMod).getTime() / 1000)) {

    if (!cachedState.markdown.dirty ||
      askQuestion('Reload Changes',
        'It looks like the file was modified since you last used Emma. Would you like to reload changes from file? If you click "No", you may overwrite any changes you have made since you last saved with the Emma editor.', false)) {
      cachedState.markdown.text = loadFile(cachedState.markdown.path);
    }
  }

  return cachedState;
}
