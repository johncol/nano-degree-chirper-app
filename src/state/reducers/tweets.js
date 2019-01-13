import { TweetsAction } from '../actions/tweets';

const tweetsReducer = (state = {}, action) => {
  switch (action.type) {
    case TweetsAction.SAVE_INITIAL_TWEETS: {
      return {
        ...state,
        ...action.payload
      };
    }

    case TweetsAction.TOGGLE_TWEET_LIKE: {
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
    }

    case TweetsAction.SAVE_NEW_TWEET: {
      const tweet = action.payload;
      const newState = {
        ...state,
        [tweet.id]: tweet
      };

      if (tweet.replyingTo) {
        const replyingTo = { tweet };
        newState[replyingTo.id] = {
          ...replyingTo,
          replies: [...replyingTo.replies, tweet.id]
        };
      }

      return newState;
    }

    default:
      return state;
  }
};

export default tweetsReducer;
