import { call, put, takeLatest } from 'redux-saga/effects';
import { MARKET_API, request } from '../../api/api';
import C from '../constants';
import { coinsListLoading, coinsListFetchDataSuccess, coinsListError } from '../actions/coins';

export function* fetchCoins() {
    const expirationDays = 1;
    const timestamp = localStorage.getItem('coinsListTimestamp');
    const isExpired = !(timestamp && +timestamp + expirationDays * 24 * 3600 * 1000 > Date.now());

    if (localStorage.getItem('coinsList') !== 'undefined' && !isExpired) {
        return JSON.parse(localStorage.getItem('coinsList'));
    } else {
        yield put(coinsListLoading(true));

        try {
            const { data } = yield call(request, MARKET_API + 'coins/list');
            yield put(coinsListFetchDataSuccess());
            yield put(coinsListLoading(false));

            localStorage.setItem('coinsList', JSON.stringify(data));
            localStorage.setItem('coinsListTimestamp', Date.now());

            return data;
        } catch (err) {
            yield put(coinsListError('Coins list error! ' + err));
        }
    }
}

export default [takeLatest(C.COINS_LIST_FETCH_DATA, fetchCoins)];
