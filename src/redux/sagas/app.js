import { takeLatest, put, call } from 'redux-saga/effects';
import { incrementAsync, incrementByAmount } from '../slices/counter';

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

function* appGetData({ payload }) {
    yield call(delay, 1200);
    yield put(incrementByAmount(payload));
}

export default [takeLatest(incrementAsync, appGetData)];
