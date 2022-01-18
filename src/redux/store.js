import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import sessionReducer from './session/session';
import addressReduce from './address/address';

const reducer = combineReducers({
  session: sessionReducer,
  addresses: addressReduce,
});

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware),
);

export default store;