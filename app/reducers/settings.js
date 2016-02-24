import {
  UPDATE_SETTINGS
} from '../actions/settings';

const initialState = {
  bibtexPath: ''
};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return Object.assign({}, state, action.settingsDelta);

    default:
      return state;
  }
};

export default settings;
