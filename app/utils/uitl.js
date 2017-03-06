
export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
import { call, put } from 'redux-saga/effects';

export function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`; // eslint-disable-line
    return acc;
  }, {});
}

export function createRequstActionCreator(types) {
  return ['request', 'success', 'failure'].reduce((acc, type) => {
    acc[type] = ( ...arg) => ({// eslint-disable-line
      type: types[type.toUpperCase()],
      payload: arg.length === 1 ? arg[0] : arg,
    });
    return acc;
  }, {});
}

export function createRequestSaga(entry, api) {
  return function* ({ payload }) {
    try {
      const res = yield call(api, payload);
      yield put(entry.success(res));
    } catch (error) {
      const err = error.msg || error;
      yield put(entry.failure(err));
    }
  };
}
