import 'whatwg-fetch';
import _ from 'lodash';
import { GLOBAL_ERRORS } from 'containers/App/errors';
import { globalError } from 'containers/App/actions';
import { clearToken } from 'utils/tokenManager';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json();
}

let globalStore;
export function injectStore(store) {
  globalStore = store;
}

function parseData(data) {
  if (data.code === 9001) {
    clearToken();
  }

  if (data.code === 0 || (data.status_code >= 200 && data.status_code < 300)) {
    return data;
  }

  if (GLOBAL_ERRORS[data.code]) {
    globalStore.dispatch(globalError(data.code));
  }

  const error = new Error(data.message);
  error.data = data;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const defaultOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (global.window.localStorage.access_token) {
    defaultOptions.headers.Authorization = `Bearer ${global.window.localStorage.access_token}`;
  }

  const mergeOptions = _.merge({}, defaultOptions, options);
  return fetch(url, mergeOptions)
    .then(parseJSON)
    .then(parseData);
}

export function get(urlString, params = {}) {
  const query = Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
  const options = {
    method: 'GET',
  };
  if (query) {
    return request(`${urlString}?${query}`, options);
  }
  return request(`${urlString}`, options);
}


/* eslint-disable */
function mapKeysDeep(obj, func) {
  return _.forEach(obj, (value, key, objReference) => {
    if (_.isObject(value)) {
      mapKeysDeep(value, func);
    }
    if (_.isNumber(key)) {
      return objReference[key] = value;
    } else {
      delete objReference[key];
      objReference[func(key)] = value;
    }
  });
}
/* eslint-enable  */

export function camelToSnake(obj) {
  return mapKeysDeep(obj, _.snakeCase);
}
