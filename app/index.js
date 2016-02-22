import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.css';

// require('spellchecker/build/Release/spellchecker.node');
import spellchecker from 'spellchecker';

import { loadInitialState } from './utils/fileOperations';

const initialState = loadInitialState();
const store = initialState === null ? configureStore() : configureStore(initialState);

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);


require('web-frame').setSpellCheckProvider('en-GB', true, {
  spellCheck: function check(word) {
    console.log(spellchecker.getCorrectionsForMisspelling(word));
    return !(spellchecker.isMisspelled(word));
  }
});

if (process.env.NODE_ENV !== 'production') {
  // Use require because imports can't be conditional.
  // In production, you should ensure process.env.NODE_ENV
  // is envified so that Uglify can eliminate this
  // module and its dependencies as dead code.
  // require('./createDevToolsWindow')(store);
}
