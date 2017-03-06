/*
 * App reducer
 */

import {
  SET_AUTH,
  USERINFO_REQUEST_SUCCESS,
  USERINFO_REQUEST_ERROR,
  LOGOUT,
  GLOBAL_ERROR,
  USERI_LIB_REQUEST_SUCCESS,
  CHANGE_PROMPT_INFO,
  THIRD_PARTY_LOGIN,
  CHANGE_BIND_SOCIALS,
  CREATE_LIVE_ERROR,
  CREATE_LIVE_SUCCESS,
  CREATE_LIVE_REQUEST,
  TOGGLE_DIALOG_CREATE_LIVE,
} from './constants';

import {
  TOKEN_ERROR,
} from './errors';

import { fromJS } from 'immutable';

const initialState = fromJS({
  userInfo: {
    avatar: '',
    email: '',
    mobile: '',
    name: '',
    id: '',
    uid: '',
    policy: {
      ad_enabled: 0,
      allow_clip_length: 0,
      ass_enabled: 0,
      create_library_enabled: 0,
      download_enabled: 0,
      live_enabled: 0,
      merge_enabled: 0,
      publish_enabled: 0,
      publish_task_enabled: 0,
      re_upload_enabled: 0,
      share_enabled: 0,
      timer_share_enabled: 0,
      upload_enabled: 0,
      upload_subtitle_enabled: 0,
      user_type: '',
      video_subtitle_enabled: 0,
      video_watermark_enabled: 0,
      youtube_enabled: 0,
    },
    socials: [],
    error: '',
    pic_watermarks: [],
    watermarks: [],
  },
  libraries: [],
  loggedIn: localStorage.access_token && Date.now() < localStorage.expires_in,
  promptInfo: {
    promptOpen: false,
    promptMsg: '默认提示信息',
    promptType: 0,
  },
  createLive: {
    requesting: false,
    isDialogOpen: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return state.set('loggedIn', action.newAuthState);
    case USERINFO_REQUEST_SUCCESS:
      return state.mergeDeep(fromJS({ userInfo: action.userInfo }));
    case USERINFO_REQUEST_ERROR:
      return state.setIn(['userInfo', 'error'], action.error);
    case USERI_LIB_REQUEST_SUCCESS:
      return state.set('libraries', fromJS(action.userLib));
    case LOGOUT: {
      const localStorage = global.window.localStorage;
      localStorage.removeItem('access_token');
      localStorage.removeItem('expires_in');
      localStorage.removeItem('refresh_token');
      window.location.href = window.location.origin;
      return state;
    }
    case GLOBAL_ERROR:
      switch (action.code) {
        case TOKEN_ERROR:
          window.location.href = window.location.origin;
          break;
        default:
          break;
      }
      return state;
    case CHANGE_PROMPT_INFO:
      return state.mergeDeep(fromJS({ promptInfo: action.val }));
    case THIRD_PARTY_LOGIN: {
      const localStorage = global.window.localStorage;
      localStorage.access_token = action.data.access_token;
      localStorage.expires_in = Date.now() + (action.data.expires_in * 1000);
      localStorage.refresh_token = action.data.refresh_token;
      window.location.href = window.location.origin;
      return state.set('loggedIn', true);
    }
    case CHANGE_BIND_SOCIALS:
      return state.update('userInfo', (userInfo) => userInfo.update('socials', (socials) => socials.push(action.val)));

    case CREATE_LIVE_ERROR:
      return state.setIn(['createLive', 'requesting'], false)
        .set('promptInfo', fromJS({
          promptOpen: true,
          promptMsg: action.payload,
          promptType: 0,
        }));
    case CREATE_LIVE_SUCCESS:
      return state.set('createLive', fromJS({
        requesting: false,
        isDialogOpen: false,
      }));
    case CREATE_LIVE_REQUEST:
      return state.setIn(['createLive', 'requesting'], true);
    case TOGGLE_DIALOG_CREATE_LIVE:
      return state.setIn(['createLive', 'isDialogOpen'], action.payload);
    default:
      return state;
  }
}

export default appReducer;
