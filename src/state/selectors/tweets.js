import * as Helpers from '../../utils/helpers';

const TweetsSelector = {
  tweetIds: state => {
    return Object.keys(state.tweets).sort(
      (tweet1, tweet2) => tweet2.timestamp - tweet1.timestamp
    );
  },

  tweet: ({ users, tweets, authedUser }, { tweetId }) => {
    const tweet = tweets[tweetId];
    if (!tweet) return null;
    const author = users[tweet.author];
    const parentTweet = tweets[tweet.replyingTo];
    return Helpers.formatTweet(tweet, author, authedUser, parentTweet);
  }
};

export default TweetsSelector;
