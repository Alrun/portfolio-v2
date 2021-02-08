import { call, put, select, takeLatest } from 'redux-saga/effects';
import C from '../constants';
import { marketError, marketFetchDataSuccess, marketLoading } from '../actions/market';
import { schemaMarket } from '../../api/schemas';
import { MARKET_API, request } from '../../api/api';
// import { appLoading } from '../actions/app';
import { tableLoading, tableSetData } from '../actions/table';

function* fetchMarket({ payload: { spreadsheet, currency } }) {
    const state = yield select();

    const coinsWODoubles = spreadsheet.reduce(
        (acc, cur) => {
            if (!acc.includes(cur.title.toLowerCase())) {
                acc.push(cur.title.toLowerCase());
            }
            return acc;
        },
        ['bitcoin', 'tether']
    );

    const coinsIdList = JSON.parse(localStorage.getItem('coinsList'))
        .filter((item) => coinsWODoubles.includes(item.name.toLowerCase()))
        .map((item) => item.id);

    yield put(marketLoading(true));

    try {
        const { data } = yield call(
            request,
            `${MARKET_API}coins/markets`,
            `vs_currency=${currency}&ids=${coinsIdList.join(',')}`
        );
        const normalizedData = schemaMarket(data);

        yield put(marketFetchDataSuccess(normalizedData));

        const extendTableData = spreadsheet.map((coin) => {
            const addMarketData = normalizedData.filter(
                (item) => item.title.toLowerCase() === coin.title.toLowerCase()
            )[0];

            return { ...coin, ...addMarketData };
        });

        yield put(tableSetData(extendTableData, normalizedData, currency, state.table.sortBy, state.table.sortOrder));

        yield put(marketLoading(false));
        yield put(tableLoading(false));
        // yield put(appLoading(false));
    } catch (err) {
        yield put(marketError('Market error! ' + err));
        // yield put(appLoading(false));
    }
}

export default [takeLatest(C.MARKET_FETCH_DATA, fetchMarket)];
