/*
 * App selectors
 */
import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');

const selectLoggedIn = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('loggedIn')
);

const selectUserInfo = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('userInfo')
);

const selectAvatar = () => createSelector(
  selectUserInfo(),
  (userInfo) => userInfo.get('avatar')
);

const selectEmail = () => createSelector(
  selectUserInfo(),
  (userInfo) => userInfo.get('email')
);

const selectName = () => createSelector(
  selectUserInfo(),
  (userInfo) => userInfo.getIn('name')
);

const selectVerify = () => createSelector(
  selectUserInfo(),
  (userInfo) => userInfo.get('verifies')
);

const selectLibraries = () => createSelector(
  selectGlobal(),
  (gloabl) => gloabl.get('libraries')
);

const selectpromptInfo = () => createSelector(
  selectGlobal(),
  (gloabl) => gloabl.get('promptInfo')
);

const selectCreateLive = () => createSelector(
  selectGlobal(),
  (global) => global.get('createLive').toJS()
);


// selectLocationState expects a plain JS object for the routing state
const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectLoggedIn,
  selectUserInfo,
  selectAvatar,
  selectEmail,
  selectName,
  selectVerify,
  selectLocationState,
  selectLibraries,
  selectpromptInfo,
  selectCreateLive,
};
