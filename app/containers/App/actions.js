/*
 * App actions
 */

import {
  USERINFO_REQUESTING,
  USERINFO_REQUEST_SUCCESS,
  USERINFO_REQUEST_ERROR,
  USERI_LIB_REQUESTING,
  USERI_LIB_REQUEST_SUCCESS,
  USERI_LIB_REQUEST_ERROR,
  LOGOUT,
  GLOBAL_ERROR,
  SET_AUTH,
  CHANGE_PROMPT_INFO,
  THIRD_PARTY_LOGIN,
  CHANGE_BIND_SOCIALS,
  CREATE_LIVE_ERROR,
  CREATE_LIVE_SUCCESS,
  CREATE_LIVE_REQUEST,
  TOGGLE_DIALOG_CREATE_LIVE,
} from './constants';

export function setAuth(newAuthState) {
  return { type: SET_AUTH, newAuthState };
}

export function userinfoRequest() {
  return { type: USERINFO_REQUESTING };
}

export function userinfoRequestSuccess(userInfo) {
  return { type: USERINFO_REQUEST_SUCCESS, userInfo };
}

export function userinfoRequestError(error) {
  return { type: USERINFO_REQUEST_ERROR, error };
}

export function createLiveRequest(...arg) {
  return { type: CREATE_LIVE_REQUEST, payload: arg };
}

export function createLiveSuccess(arg) {
  return { type: CREATE_LIVE_SUCCESS, payload: arg };
}

export function createLiveError(error) {
  return { type: CREATE_LIVE_ERROR, payload: error };
}

export function userLibRequest() {
  return { type: USERI_LIB_REQUESTING };
}

export function userLibRequestSuccess(userLib) {
  return { type: USERI_LIB_REQUEST_SUCCESS, userLib };
}

export function userLibRequestError(error) {
  return { type: USERI_LIB_REQUEST_ERROR, error };
}

export function logout() {
  return { type: LOGOUT };
}

export function globalError(code) {
  return { type: GLOBAL_ERROR, code };
}

export function changePromptInfo(val) {
  return {
    type: CHANGE_PROMPT_INFO,
    val,
  };
}

export function thirdPartyLogin(data) {
  return {
    type: THIRD_PARTY_LOGIN,
    data,
  };
}

export function changeBindSocials(val) {
  return {
    type: CHANGE_BIND_SOCIALS,
    val,
  };
}

export function toggleDialogCreateLive(isOpen) {
  return {
    type: TOGGLE_DIALOG_CREATE_LIVE,
    payload: isOpen,
  };
}
