import { TweetsAction } from '../actions/tweets';

const tweetsReducer = (state = {}, action) => {
  switch (action.type) {
    case TweetsAction.SAVE_INITIAL_TWEETS:
      return saveInitialTweets(state, action);

    case TweetsAction.TOGGLE_TWEET_LIKE:
      return toggleTweetLike(state, action);

    case TweetsAction.SAVE_NEW_TWEET:
      return saveNewTweet(state, action);

    default:
      return state;
  }
};

export default tweetsReducer;

const saveInitialTweets = (state, action) => {
  return {
    ...state,
    ...action.payload
  };
};

const toggleTweetLike = (state, action) => {
  const { tweetId, authedUser } = action.payload;
  const tweet = state[tweetId];

  const likes =
    tweet.likes.indexOf(authedUser) === -1
      ? [...tweet.likes, authedUser]
      : tweet.likes.filter(user => user !== authedUser);

  return {
    ...state,
    [tweetId]: {
      ...tweet,
      likes
    }
  };
};

const saveNewTweet = (state, action) => {
  const tweet = action.payload;
  const newState = {
    ...state,
    [tweet.id]: tweet
  };

  const replyingToTweetId = tweet.replyingTo;
  if (replyingToTweetId != null) {
    const replyingToTweet = state[replyingToTweetId];
    newState[replyingToTweetId] = {
      ...replyingToTweet,
      replies: [...replyingToTweet.replies, tweet.id]
    };
  }

  return newState;
};
