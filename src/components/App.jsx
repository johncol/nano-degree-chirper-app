import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { Switch, Route } from 'react-router-dom';

import { SharedActionCreator } from '../state/actions/shared';
import SharedSelector from '../state/selectors/shared';
import Dashboard from './Dashboard';
import NewTweet from './NewTweet';
import TweetPage from './TweetPage';
import NotFound from './NotFound';

class App extends Component {
  componentDidMount() {
    this.props.saveInitialState();
  }

  render() {
    const { loading } = this.props;
    return (
      <div>
        <LoadingBar />
        {!loading && (
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/tweets/new" component={NewTweet} />
            <Route path="/tweets/:id" component={TweetPage} />
            <Route component={NotFound} />
          </Switch>
        )}
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
