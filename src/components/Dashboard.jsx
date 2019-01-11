import React, { Component } from 'react';
import { connect } from 'react-redux';

import TweetsSelector from '../state/selectors/tweets';
import Tweet from './Tweet';

class Dashboard extends Component {
  render() {
    const { tweetIds } = this.props;
    return (
      <section>
        <h3 className="center">Your timeline</h3>
        <ul className="dashboard-list">
          {tweetIds.map(tweetId => (
            <li key={tweetId}>
              <Tweet tweetId={tweetId} />
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

const stateToProps = state => ({
  tweetIds: TweetsSelector.tweetIds(state)
});

const dispatchToProps = dispatch => ({});

export default connect(
  stateToProps,
  dispatchToProps
)(Dashboard);
