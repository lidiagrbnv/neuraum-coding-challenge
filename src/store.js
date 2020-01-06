import {
  compose,
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';

import thunk from 'redux-thunk';

import houseData from './ducks/data';
import sorting from './ducks/sorting';

// eslint-disable-next-line
const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = [
  applyMiddleware(thunk),
];

const store = createStore(
  combineReducers({
    houseData,
    sorting,
  }),
  composeEnhancers(
    ...enhancers,
  ),
);

export default store;
