import { createStore } from 'redux';
import rootReducer from '../Redux/reducers/rootReducer';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(rootReducer, composeEnhancers());
const store = createStore(rootReducer);

export default store;
