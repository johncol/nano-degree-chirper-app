import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TweetsApiActionCreator } from '../state/actions/tweets';

const CharactersLeft = ({ tweetLeft }) => (
  <div className="tweet-length">{tweetLeft} characters left</div>
);

const TweetInput = ({ text, updateTweetText }) => (
  <textarea
    placeholder="What is happening yoday?"
    value={text}
    onChange={updateTweetText}
    className="textarea"
    maxLength="280"
  />
);

const SaveButton = ({ text }) => (
  <button className="btn" type="submit" disabled={text === ''}>
    Create
  </button>
);

class NewTweet extends Component {
  state = {
    text: ''
  };

  updateTweetText = event => {
    const text = event.target.value.trim();
    this.setState({ text });
  };

  createTweet = event => {
    event.preventDefault();
    this.props.saveNewTweet(this.state.text, this.props.replyingTo);
    this.setState({ text: '' });
  };

  render() {
    const { text } = this.state;
    const tweetLeft = 250 - text.length;
    return (
      <div>
        <h3 className="center">Compose new tweet</h3>

        <form className="new-tweet" autoComplete="off" onSubmit={this.createTweet}>
          <TweetInput text={text} updateTweetText={this.updateTweetText} />
          {tweetLeft < 100 && <CharactersLeft tweetLeft={tweetLeft} />}
          <SaveButton text={text} />
        </form>
      </div>
    );
  }
}

const stateToProps = state => ({});

const dispatchToProps = dispatch => ({
  saveNewTweet: (text, replyingTo) => {
    dispatch(TweetsApiActionCreator.saveNewTweet({ text, replyingTo }));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(NewTweet);
