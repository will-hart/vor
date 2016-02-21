import {
  CREATE_MD_FILE,
  OPEN_MD_FILE,
  SAVE_MD_FILE,
  UPDATE_TEXT
} from '../actions/markdown';

const initialState = {
  text: ' ',
  path: '',
  dirty: false
};

const markdown = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MD_FILE:
      return Object.assign({}, initialState);

    case OPEN_MD_FILE:
      return Object.assign({}, state, { path: action.path, text: action.text, dirty: false });

    case SAVE_MD_FILE:
      return Object.assign({}, state, { dirty: false, path: action.path });

    case UPDATE_TEXT:
      return Object.assign({}, state, { text: action.text, dirty: true });

    default:
      return state;
  }
};

export default markdown;
