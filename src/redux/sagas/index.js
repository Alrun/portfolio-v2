import { all } from 'redux-saga/effects';
import app from './app';
import coins from './coins';
import currency from './currency';
import spreadsheet from './spreadsheet';
import market from './market';

export default function* rootSaga() {
    yield all([...app, ...coins, ...currency, ...spreadsheet, ...market]);
}
