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

export const askQuestion = (title, question) => {
  const result = dialog.showMessageBox({
    title,
    message: question,
    buttons: ['Yes', 'No', 'Cancel']
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
