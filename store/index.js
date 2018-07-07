import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import elements from './elements/reducer';
import projects from './projects/reducer';
import documents from './documents/reducer';

const reducer = combineReducers({
  elements,
  projects,
  documents,
});
const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middleware)

export default store;
