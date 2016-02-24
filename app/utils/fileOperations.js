import fs from 'fs';
import path from 'path';

import { remote } from 'electron';
const dialog = remote.require('dialog');

export const basePath = remote.app.getPath('userData');
export const dataPath = path.join(basePath, 'cache.json');
export const settingsPath = path.join(basePath, 'vorSettings.json');

export const getFilePath = (callback, filters = [
      { name: 'Markdown', extensions: ['md', 'markdown'] },
      { name: 'Text', extensions: ['txt'] }
]) => {
  dialog.showOpenDialog({
    filters,
    title: 'Open a document'
  }, callback);
};

export const getSaveFilePath = (callback, filters = [
      { name: 'Markdown', extensions: ['md'] },
      { name: 'Text', extensions: ['txt'] }
]) => {
  dialog.showSaveDialog({
    filters,
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
    console.log('Error accessing file', e);
    return errorValue;
  }

  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    console.error('Error parsing file', filePath);
  }
};

export const getLastModDate = (filePath) => {
  try {
    return fs.statSync(filePath).mtime;
  } catch (e) {
    console.warn(e);
    return null;
  }
};

export const loadInitialState = () => {
  // load cache from file
  let markdown;
  let settings;

  try {
    markdown = JSON.parse(loadFile(dataPath));
  } catch (e) {
    console.warn('Error loading cache: ', e);
  }

  try {
    settings = JSON.parse(loadFile(settingsPath));
  } catch (e) {
    console.warn('Error loading settings: ', e);
  }

  const combined = { markdown, settings };

  // check if we have a file open
  if (markdown === undefined || markdown.path === '') {
    return combined;
  }

  const lastModded = getLastModDate(markdown.path);

  // check the file still exists
  if (lastModded === null) {
    alert('It looks like the file you had open when you last closed the editor has been renamed or deleted. Please re-save the file to avoid losing your changes.');
    markdown.path = '';
    markdown.dirty = true;
    return combined;
  }

  // check that the file wasn't modified
  if (Math.floor(lastModded.getTime() / 1000) !==
    Math.floor(new Date(markdown.lastMod).getTime() / 1000)) {
    if (!markdown.dirty ||
      askQuestion('Reload Changes',
        'It looks like the file was modified since you last used Emma. Would you like to reload changes from file? If you click "No", you may overwrite any changes you have made since you last saved with the Emma editor.', false)) {
      markdown.text = loadFile(markdown.path);
    }
  }

  return combined;
};
