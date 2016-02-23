import {
  CREATE_MD_FILE,
  OPEN_MD_FILE,
  SAVE_MD_FILE,
  UPDATE_TEXT
} from '../actions/markdown';

const initialState = {
  text: ' ',
  path: '',
  dirty: false,
  lastMod: ''
};

const markdown = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MD_FILE:
      return Object.assign({}, initialState);

    case OPEN_MD_FILE:
      return Object.assign({}, state, { path: action.path, text: action.text, dirty: false, lastMod: action.lastModDate });

    case SAVE_MD_FILE:
      return Object.assign({}, state, { dirty: false, path: action.path, lastMod: action.lastModDate });

    case UPDATE_TEXT:
      return Object.assign({}, state, { text: action.text, dirty: true });

    default:
      return state;
  }
};

export default markdown;
