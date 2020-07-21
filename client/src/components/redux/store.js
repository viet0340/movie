import { createStore, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';
import reducer from './reducers/reducer';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
