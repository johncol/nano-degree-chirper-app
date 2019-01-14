import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tweet from './Tweet';
import NewTweet from './NewTweet';
import TweetsSelector from '../state/selectors/tweets';

const TweetReplies = ({ replyIds }) => {
  if (replyIds.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <h3 className="center">Replies</h3>
      <ul>
        {replyIds.map(replyId => (
          <li key={replyId}>
            <Tweet id={replyId} />
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

class TweetPage extends Component {
  render() {
    const { id, replyIds } = this.props;
    return (
      <React.Fragment>
        <Tweet id={id} />
        <NewTweet replyingTo={id} />
        <TweetReplies replyIds={replyIds} />
      </React.Fragment>
    );
  }
}

const stateToProps = (state, props) => ({
  id: props.match.params.id,
  replyIds: TweetsSelector.replyIds(state, props)
});

const dispatchToProps = dispatch => ({});

export default connect(
  stateToProps,
  dispatchToProps
)(TweetPage);
