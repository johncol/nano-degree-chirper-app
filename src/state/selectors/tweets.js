import * as Helpers from '../../utils/helpers';

const TweetsSelector = {
  tweetIds: ({ tweets }) => {
    return Object.keys(tweets).sort((tweet1, tweet2) => tweet2.timestamp - tweet1.timestamp);
  },

  tweet: ({ users, tweets, authedUser }, { tweetId }) => {
    const tweet = tweets[tweetId];
    if (!tweet) return null;
    const author = users[tweet.author];
    const parentTweet = tweets[tweet.replyingTo];
    return Helpers.formatTweet(tweet, author, authedUser, parentTweet);
  },

  replyIds: ({ tweets }, { tweetId }) => {
    const tweet = tweets[tweetId];
    if (!tweet) {
      return [];
    }

    return tweet.replies
      .map(replyId => tweets[replyId])
      .sort((reply1, reply2) => reply2.timestamp - reply1.timestamp)
      .map(reply => reply.id);
  }
};

export default TweetsSelector;
