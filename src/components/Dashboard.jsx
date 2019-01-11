import React, { Component } from 'react';
import { connect } from 'react-redux';

import TweetsSelector from '../state/selectors/tweets';

class Dashboard extends Component {
  render() {
    const { tweetIds } = this.props;
    return (
      <section>
        <h1>Your timeline</h1>
        {tweetIds.map(tweetId => (
          <div key={tweetId}>Tweet Id: {tweetId}</div>
        ))}
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
