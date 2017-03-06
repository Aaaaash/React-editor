/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createStructuredSelector } from 'reselect';
import theme from 'theme/theme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { userinfoRequest, userLibRequest, changePromptInfo, thirdPartyLogin, changeBindSocials } from './actions';
import { connect } from 'react-redux';
import { selectLoggedIn, selectUserInfo, selectpromptInfo } from './selectors';
import styles from './styles.css';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { children, promptInfo } = this.props;
    const prompt = promptInfo.toJS();

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <div style={{height: '100%'}}>
          {React.Children.toArray(children)}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  requestUserInfo: PropTypes.func,
  requestUserLib: PropTypes.func,
  onThirdPartyLogin: PropTypes.func,
  onChangePromptInfo: PropTypes.func,
  onBindSocials: PropTypes.func,
  loggedIn: PropTypes.bool,
  userInfo: PropTypes.object,
  promptInfo: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loggedIn: selectLoggedIn(),
  userInfo: selectUserInfo(),
  promptInfo: selectpromptInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    requestUserInfo: () => dispatch(userinfoRequest()),
    requestUserLib: () => dispatch(userLibRequest()),
    onChangePromptInfo: (val) => dispatch(changePromptInfo(val)),
    onThirdPartyLogin: (val) => dispatch(thirdPartyLogin(val)),
    onBindSocials: (val) => dispatch(changeBindSocials(val)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
