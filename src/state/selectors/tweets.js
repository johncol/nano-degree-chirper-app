import * as Helpers from '../../utils/helpers';

const TweetsSelector = {
  tweetIds: ({ tweets }) => {
    return Object.values(tweets)
      .sort((tweet1, tweet2) => tweet2.timestamp - tweet1.timestamp)
      .map(tweet => tweet.id);
  },

  tweet: ({ users, tweets, authedUser }, { id }) => {
    const tweet = tweets[id];
    if (!tweet) return null;
    const author = users[tweet.author];
    const parentTweet = tweets[tweet.replyingTo];
    return Helpers.formatTweet(tweet, author, authedUser, parentTweet);
  },

  replyIds: ({ tweets }, props) => {
    const { id } = props.match.params;
    const tweet = tweets[id];
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
