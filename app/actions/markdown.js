export const CREATE_MD_FILE = 'CREATE_MD_FILE';
export const OPEN_MD_FILE = 'OPEN_MD_FILE';
export const SAVE_MD_FILE = 'SAVE_MD_FILE';
export const UPDATE_TEXT = 'UPDATE_TEXT';

export function open(filePath) {
  return {
    type: OPEN_MD_FILE,
    path: filePath
  };
}

export function save(text, filePath) {
  return {
    type: SAVE_MD_FILE,
    text,
    path: filePath
  };
}

export function update(text) {
  return {
    type: UPDATE_TEXT,
    text
  };
}

export function create() {
  return {
    type: 'CREATE_MD_FILE'
  };
}
