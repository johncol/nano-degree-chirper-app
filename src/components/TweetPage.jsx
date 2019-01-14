import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tweet from './Tweet';
import NewTweet from './NewTweet';
import TweetsSelector from '../state/selectors/tweets';

class TweetPage extends Component {
  render() {
    const { id, replyIds } = this.props;
    return (
      <div>
        <Tweet id={id} />
        <NewTweet replyingTo={id} />

        {replyIds.length > 0 && (
          <div>
            <h3 className="center">Replies</h3>
            {replyIds.map(replyId => (
              <Tweet key={replyId} id={replyId} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

const stateToProps = (state, props) => ({
  id: props.id,
  replyIds: TweetsSelector.replyIds(state, props)
});

const dispatchToProps = dispatch => ({});

export default connect(
  stateToProps,
  dispatchToProps
)(TweetPage);
