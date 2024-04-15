import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import api from './middleware/api'
import rootReducer from './reducers'
import { devToolsEnhancer } from 'redux-devtools-extension';

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, api, createLogger()),
      devToolsEnhancer(),
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(rootReducer, () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
}

export default configureStore
