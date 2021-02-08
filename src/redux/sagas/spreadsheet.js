import { call, put, takeLatest } from 'redux-saga/effects';
import C from '../constants';
import { request } from '../../api/api';
import { spreadsheetLoading, spreadsheetFetchDataSuccess, spreadsheetError } from '../actions/spreadsheet';
import { schemaSpreadsheet } from '../../api/schemas';

export function* fetchSpreadsheet(link) {
    const SPREADSHEET_API = `https://spreadsheets.google.com/feeds/list/${link}/od6/public/values?alt=json`;

    yield put(spreadsheetLoading(true));

    try {
        const { data } = yield call(request, SPREADSHEET_API);

        if (!data.feed.entry) {
            yield put(spreadsheetLoading(false));

            return null;
        }

        const normalizedData = schemaSpreadsheet(data.feed.entry);

        yield put(spreadsheetFetchDataSuccess(normalizedData));
        yield put(spreadsheetLoading(false));

        return normalizedData;
    } catch (err) {
        yield put(spreadsheetError(`Spreadsheet error! ${err}`));
    }
}

export default [takeLatest(C.SPREADSHEET_FETCH_DATA, fetchSpreadsheet)];
