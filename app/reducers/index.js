import { combineReducers } from 'redux';
import { routeReducer as routing } from 'react-router-redux';
import markdown from './markdown';
import settings from './settings';

const rootReducer = combineReducers({
  routing,
  markdown,
  settings
});

export default rootReducer;
