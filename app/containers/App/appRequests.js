/*
 * App request
 */

import { API_BASE } from 'common/constants';
import request, { get, camelToSnake } from 'utils/request';
import { GLOBAL_ERRORS } from './errors';

const appRequest = {
  userinfoRequest() {
    return request(`${API_BASE}/user/info`)
      .then((data) => {
        const userInfo = data.data;
        return userInfo;
      })
      .catch((err) => {
        throw new Error(GLOBAL_ERRORS[err.data.code]);
      });
  },

  userLibRequest() {
    return get(`${API_BASE}/libraries?include=channels`)
      .then((data) => data.data)
      .catch(() => {
        throw new Error('获取失败');
      });
  },

  createLive(title, liveUrl, beginTime, endTime, libraryId, channels, streamType = '') {
    return request(`${API_BASE}/live`, {
      method: 'POST',
      body: JSON.stringify(camelToSnake({
        beginTime,
        channels,
        endTime,
        libraryId,
        liveUrl,
        streamType,
        title,
      })),
    });
  },
};

export default appRequest;
