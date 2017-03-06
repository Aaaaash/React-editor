/*
 * App sagas
 */

import {
  USERINFO_REQUESTING, USERI_LIB_REQUESTING, CREATE_LIVE_REQUEST,
} from './constants';

import {
  userinfoRequestSuccess,
  userinfoRequestError,
  userLibRequestSuccess,
  createLiveSuccess,
  createLiveError,
} from './actions';

import appRequest from './appRequests';
import { take, call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { push } from 'react-router-redux';
import { browserHistory } from 'react-router';

export function* requestUserInfo() {
  try {
    yield take(USERINFO_REQUESTING);
    const userInfo = yield call(appRequest.userinfoRequest);
    yield put(userinfoRequestSuccess(userInfo));
    localStorage.setItem('user_type', userInfo.policy.user_type);
    if (browserHistory.getCurrentLocation().pathname === '/') {
      yield put(push('/home'));
    }
  } catch (error) {
    yield put(userinfoRequestError(error));
  }
}

export function* requestUserLib() {
  try {
    yield take(USERI_LIB_REQUESTING);
    const userLib = yield call(appRequest.userLibRequest);
    yield put(userLibRequestSuccess(userLib));
  } catch (error) {
    yield put(userinfoRequestError(error));
  }
}

export function* createLiveWather() {
  yield takeLatest(CREATE_LIVE_REQUEST, function* ({ payload }) {
    try {
      const liveInfo = yield call(appRequest.createLive, ...payload);
      yield put(createLiveSuccess(liveInfo));
    } catch (error) {
      const err = error.message || error;
      yield put(createLiveError(err));
    }
  });
}

export default [
  createLiveWather,
  requestUserInfo,
  requestUserLib,
];
