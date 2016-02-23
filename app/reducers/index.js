import { combineReducers } from 'redux';
import { routeReducer as routing } from 'react-router-redux';
import markdown from './markdown';

const rootReducer = combineReducers({
  routing,
  markdown
});

export default rootReducer;
