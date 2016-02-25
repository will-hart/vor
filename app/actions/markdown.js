import {
  askQuestion,
  getFilePath,
  getLastModDate,
  getSaveFilePath,
  loadFile,
  saveFile
} from '../utils/fileOperations';

export const CREATE_MD_FILE = 'CREATE_MD_FILE';
export const OPEN_MD_FILE = 'OPEN_MD_FILE';
export const SAVE_MD_FILE = 'SAVE_MD_FILE';
export const UPDATE_TEXT = 'UPDATE_TEXT';

export function update(text) {
  return {
    type: UPDATE_TEXT,
    text
  };
}

const _doOpen = filePath => {
  return dispatch => {
    const md = loadFile(filePath);
    const modDate = getLastModDate(filePath);

    dispatch({
      type: OPEN_MD_FILE,
      text: md,
      path: filePath,
      lastModDate: modDate
    });
  };
};

export function open() {
  return (dispatch, getState) => {
    const { markdown } = getState();

    if (markdown.dirty) {
      const result = askQuestion('There are unsaved changes',
        'You have unsaved changes. Do you want to save before continuing?');
      if (result) {
        dispatch(save());
      }
    }

    getFilePath(paths => {
      if (paths !== undefined && paths.length >= 1) {
        dispatch(_doOpen(paths[0]));
      } else {
        console.warn('No path found! Aborting open.');
      }
    });
  };
}

const _doSave = (text, filePath) => {
  return dispatch => {
    saveFile(text, filePath);
    const modDate = getLastModDate(filePath);

    dispatch({
      type: SAVE_MD_FILE,
      text,
      path: filePath,
      lastModDate: modDate
    });
  };
};

export function save() {
  return (dispatch, getState) => {
    setTimeout(() => {
      const { markdown } = getState();

      if (markdown.path === '') {
        getSaveFilePath(paths => {
          if (paths !== undefined) {
            dispatch(_doSave(markdown.text, paths));
          } else {
            console.warn('No path found! Aborting save.');
          }
        });
      } else {
        dispatch(_doSave(markdown.text, markdown.path));
      }
    }, 500);
  };
}

export function create() {
  return {
    type: 'CREATE_MD_FILE'
  };
}
