/*
 * token manager
 */

import { API_BASE } from 'common/constants';
import request from './request';
import { setAuth } from 'containers/App/actions';

let globalStore;
export function injectStoreToken(store) {
  globalStore = store;
}

export function watchNRefreshToken() {
  // refresh token in 5 hours
  if (global.window.localStorage.refresh_token) {
    setInterval(refreshToken, 18000000);
  }
}

export function refreshToken() {
  const localStorage = global.window.localStorage;
  const options = {
    method: 'POST',
    body: JSON.stringify({
      refresh_token: localStorage.refresh_token,
    }),
  };

  return request(`${API_BASE}/auth/refresh_token`, options)
    .then((body) => {
      localStorage.access_token = body.data.access_token;
      localStorage.expires_in = Date.now() + (body.data.expires_in * 1000);
      localStorage.refresh_token = body.data.refresh_token;
      globalStore.dispatch(setAuth(true));
      return true;
    });
}

export function clearToken() {
  const localStorage = global.window.localStorage;
  localStorage.access_token = '';
  localStorage.refresh_token = '';
  localStorage.expires_in = '';
}
