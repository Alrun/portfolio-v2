import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
// import app from './app';
// import coins from './coins';
// import currency from './currency';
// import spreadsheet from './spreadsheet';
// import market from './market';
// import table from './table';

export default combineReducers({
    counterReducer
    // app,
    // coins,
    // currency,
    // spreadsheet,
    // market,
    // table
});
