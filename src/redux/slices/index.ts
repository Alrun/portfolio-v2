import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter';
import tableReducer from './table/table';

export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
    counter: counterReducer,
    table: tableReducer
});
