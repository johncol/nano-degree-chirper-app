import * as API from './../../utils/api';

const SAVE_INITIAL_TWEETS = 'SAVE_INITIAL_TWEETS';
const TOGGLE_TWEET_LIKE = 'TOGGLE_TWEET_LIKE';

export const TweetsAction = {
  SAVE_INITIAL_TWEETS,
  TOGGLE_TWEET_LIKE
};

export const TweetsActionCreator = {
  saveInitialTweets: tweets => ({
    type: TweetsAction.SAVE_INITIAL_TWEETS,
    payload: tweets
  }),

  toggleTweetLike: ({ tweetId, authedUser }) => ({
    type: TweetsAction.TOGGLE_TWEET_LIKE,
    payload: {
      tweetId,
      authedUser
    }
  })
};

export const TweetsApiActionCreator = {
  toggleTweetLike: ({ tweetId, authedUser }) => (dispatch, getState) => {
    dispatch(TweetsActionCreator.toggleTweetLike({ tweetId, authedUser }));
    const tweet = getState().tweets[tweetId];
    return API.saveLikeToggle({
      id: tweetId,
      hasLiked: !tweetHasUserInLikesList(tweet),
      authedUser
    }).catch(() => {
      dispatch(TweetsActionCreator.toggleTweetLike({ tweetId, authedUser }));
      alert('Could not toggle tweet like state for ' + authedUser);
    });
  }
};

const tweetHasUserInLikesList = (tweet, user) => {
  const { likes } = tweet;
  const hasUserInList = likes.indexOf(user) !== -1;
  return hasUserInList;
};
