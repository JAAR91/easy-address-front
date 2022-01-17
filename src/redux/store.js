import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import sessionReducer from './session/session';

const reducer = combineReducers({
  session: sessionReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, logger),
);

export default store;