
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import AuthReducer from './reducers/authReducer';

// import apodReducer from './reducers/apod';

// compose enhancers
const composeEnhancers =
  (window && (window)).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = () => {
  const store = createStore(
    combineReducers({
      auth: AuthReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
export default store;