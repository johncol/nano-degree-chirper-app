import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tweet from './Tweet';
import NewTweet from './NewTweet';
import TweetsSelector from '../state/selectors/tweets';

class TweetPage extends Component {
  render() {
    const { tweet, replyIds } = this.props;
    return (
      <div>
        <Tweet tweetId={tweet.id} />
        <NewTweet replyingTo={tweet.id} />

        {replyIds.length > 0 && (
          <div>
            <h3 className="center">Replies</h3>
            {replyIds.map(replyId => (
              <Tweet key={replyId} tweetId={replyId} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

const stateToProps = (state, props) => ({
  tweet: TweetsSelector.tweet(state, props),
  replyIds: TweetsSelector.replyIds(state, props)
});

const dispatchToProps = dispatch => ({});

export default connect(
  stateToProps,
  dispatchToProps
)(TweetPage);
