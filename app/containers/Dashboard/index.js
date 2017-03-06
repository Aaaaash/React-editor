/**
 * Created by easub on 2017/1/9.
 */
import React, { Component, PropTypes } from 'react';

export default class Dashboard extends Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { children, location } = this.props;

    return (
      <div>
        keke
      </div>
    );
  }
}

Dashboard.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
};
