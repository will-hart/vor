import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

import fileCacheMiddleware from '../middleware/fileCacheMiddleware';

const router = syncHistory(hashHistory);
const enhancer = compose(
  applyMiddleware(thunk, router, fileCacheMiddleware),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&]+)\b/
    )
  )
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  router.listenForReplays(store);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
}
