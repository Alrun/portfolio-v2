import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter';

export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
    counter: counterReducer
});
