import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { TweetsApiActionCreator } from '../state/actions/tweets';

const TWEET_MAX_LENGTH = 120;

const CharactersLeft = ({ tweetLeft }) => {
  if (tweetLeft >= 60) {
    return null;
  }
  return <div className="tweet-length">{tweetLeft} characters left</div>;
};

const TweetInput = ({ text, updateTweetText }) => (
  <textarea
    placeholder="What is happening today?"
    value={text}
    onChange={updateTweetText}
    className="textarea"
    maxLength={TWEET_MAX_LENGTH}
  />
);

const SaveButton = ({ text }) => (
  <button className="btn" type="submit" disabled={text === ''}>
    Create
  </button>
);

class NewTweet extends Component {
  state = {
    text: '',
    redirectToHome: false
  };

  updateTweetText = event => {
    const text = event.target.value;
    this.setState({ text });
  };

  createTweet = event => {
    event.preventDefault();
    this.props.saveNewTweet(this.state.text.trim(), this.props.replyingTo);
    this.setState({
      text: '',
      redirectToHome: this.props.replyingTo ? false : true
    });
  };

  render() {
    const { text, redirectToHome } = this.state;

    if (redirectToHome) {
      return <Redirect to="/dashboard" />;
    }

    const tweetLeft = TWEET_MAX_LENGTH - text.length;
    return (
      <div>
        <h3 className="center">Compose new tweet</h3>

        <form className="new-tweet" autoComplete="off" onSubmit={this.createTweet}>
          <TweetInput text={text} updateTweetText={this.updateTweetText} />
          <CharactersLeft tweetLeft={tweetLeft} />
          <SaveButton text={text} />
        </form>
      </div>
    );
  }
}

const stateToProps = (state, props) => ({
  replyingTo: props.replyingTo
});

const dispatchToProps = dispatch => ({
  saveNewTweet: (text, replyingTo) => {
    dispatch(TweetsApiActionCreator.saveNewTweet({ text, replyingTo }));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(NewTweet);
