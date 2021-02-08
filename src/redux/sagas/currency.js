import { call, put, takeLatest } from 'redux-saga/effects';
import C from '../constants';
import { currenciesListLoading, currenciesListFetchDataSuccess, currenciesListError } from '../actions/currency';
import { request, MARKET_API } from '../../api/api';

function* fetchCurrenciesList() {
    const expirationDays = 1;
    const timestamp = +localStorage.getItem('currenciesListTimestamp');
    const isExpired = !(timestamp && timestamp + expirationDays * 24 * 3600 * 1000 > Date.now());

    if (localStorage.getItem('currenciesList') && !isExpired) {
        yield put(currenciesListFetchDataSuccess(JSON.parse(localStorage.getItem('currenciesList'))));
    } else {
        yield put(currenciesListLoading(true));

        try {
            const { data } = yield call(request, MARKET_API + 'simple/supported_vs_currencies');

            yield put(currenciesListFetchDataSuccess(data));
            yield put(currenciesListLoading(false));

            localStorage.setItem('currenciesList', JSON.stringify(data));
            localStorage.setItem('currenciesListTimestamp', Date.now());
        } catch (err) {
            yield put(currenciesListError('Currencies list error! ' + err));
        }
    }
}

export default [takeLatest(C.CURRENCIES_LIST_FETCH_DATA, fetchCurrenciesList)];
