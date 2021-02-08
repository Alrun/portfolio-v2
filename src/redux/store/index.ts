import { configureStore } from '@reduxjs/toolkit';

import rootReducer from '../reducers';

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
    reducer: rootReducer
});

// import createSagaMiddleware from 'redux-saga';
// import { createStore, applyMiddleware, compose } from 'redux';
// import rootSaga from '../sagas';
// import { rootReducer } from '../reducers';
//
// const saga = createSagaMiddleware();
//
// const composeEnhancers =
//     typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//         ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//         : compose;
//
// const enhancer = composeEnhancers(applyMiddleware(saga));
// const store = createStore(rootReducer, enhancer);
//
// saga.run(rootSaga);
//
// export default store;
