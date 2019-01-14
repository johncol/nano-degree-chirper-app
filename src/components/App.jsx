import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';

import { SharedActionCreator } from '../state/actions/shared';
import SharedSelector from '../state/selectors/shared';
import Dashboard from './Dashboard';
import NewTweet from './NewTweet';

class App extends Component {
  componentDidMount() {
    this.props.saveInitialState();
  }

  render() {
    const { loading } = this.props;
    return (
      <div>
        <LoadingBar />
        {!loading && <NewTweet />}
        {!loading && <Dashboard />}
      </div>
    );
  }
}

const stateToProps = state => ({
  loading: SharedSelector.loading(state)
});

const dispatchToProps = dispatch => ({
  saveInitialState: () => dispatch(SharedActionCreator.saveInitialState())
});

export default connect(
  stateToProps,
  dispatchToProps
)(App);
