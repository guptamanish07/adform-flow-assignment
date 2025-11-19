import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import userReducer from './reducers/userReducer';
import campaignReducer from './reducers/campaignReducer';

const rootReducer = combineReducers({
  users: userReducer,
  campaigns: campaignReducer
});

const composeEnhancers = 
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
