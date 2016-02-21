import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.css';

import { dataPath, loadFile } from './utils/fileOperations';

let initialState = null;
console.log(typeof(loadFile(dataPath)));
try {
  initialState = JSON.parse(loadFile(dataPath));
  console.log('Loaded initial state:', initialState);
} catch (e) {
  console.warn('Error loading initial state from cache', e);
}

console.log(initialState)
const store = initialState === null ? configureStore() : configureStore(initialState);

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
  // Use require because imports can't be conditional.
  // In production, you should ensure process.env.NODE_ENV
  // is envified so that Uglify can eliminate this
  // module and its dependencies as dead code.
  // require('./createDevToolsWindow')(store);
}
