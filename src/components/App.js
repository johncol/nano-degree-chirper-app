import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SharedActionCreator } from '../state/actions/shared';

class App extends Component {
  componentDidMount() {
    this.props.saveInitialState();
  }

  render() {
    return <div>Starter Code</div>;
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    saveInitialState: () => dispatch(SharedActionCreator.saveInitialState())
  })
)(App);
