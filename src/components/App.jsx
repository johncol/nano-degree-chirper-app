import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoadingBar from 'react-redux-loading';

import { SharedActionCreator } from '../state/actions/shared';
import SharedSelector from '../state/selectors/shared';

import Dashboard from './Dashboard';
import NewTweet from './NewTweet';
import TweetPage from './TweetPage';
import NotFound from './NotFound';
import Navigation from './Navigation';

class App extends Component {
  componentDidMount() {
    this.props.saveInitialState();
  }

  render() {
    const { loading } = this.props;
    return (
      <BrowserRouter>
        <React.Fragment>
          <LoadingBar />
          <div className="container">
            <Navigation />
            {!loading && (
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/tweet/new" component={NewTweet} />
                <Route path="/tweet/:id" component={TweetPage} />
                <Route component={NotFound} />
              </Switch>
            )}
          </div>
        </React.Fragment>
      </BrowserRouter>
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
