import { put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import C from '../constants';
// import { request } from '../../api/api';
// import { spreadsheetLoading, spreadsheetFetchDataSuccess, spreadsheetError } from '../actions/spreadsheet';
import { appLoading } from '../actions/app';
// import { schemaSpreadsheet } from '../../api/schemas';
import { fetchCoins } from './coins';
import { fetchSpreadsheet } from './spreadsheet';
import { tableSetData } from '../actions/table';

function* appGetData() {
    yield put(appLoading(true));

    const state = yield select();
    const spreadsheet = yield* fetchSpreadsheet(state.spreadsheet.link);
    const coins = yield* fetchCoins();

    if (spreadsheet === null) {
        yield put(appLoading(false));

        return [
            {
                id: 'empty',
                title: '',
                buyPrice: 0,
                quantity: 0,
                buyFee: 0,
                sellFee: 0,
                wallet: ''
            }
        ];
    }

    yield put(tableSetData(spreadsheet, undefined, state.currency.value, state.table.sortBy, state.table.sortOrder));
    yield put(appLoading(false));
    yield put({type: C.MARKET_FETCH_DATA, payload: {spreadsheet, currency: state.currency.value, coins}});
}

export default [takeLatest(C.APP_GET_DATA, appGetData)];
