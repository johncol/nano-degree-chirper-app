import { showLoading, hideLoading } from 'react-redux-loading';

import * as API from './../../utils/api';

const SAVE_INITIAL_TWEETS = 'SAVE_INITIAL_TWEETS';
const TOGGLE_TWEET_LIKE = 'TOGGLE_TWEET_LIKE';
const SAVE_NEW_TWEET = 'SAVE_NEW_TWEET';

export const TweetsAction = {
  SAVE_INITIAL_TWEETS,
  TOGGLE_TWEET_LIKE,
  SAVE_NEW_TWEET
};

export const TweetsActionCreator = {
  saveInitialTweets: tweets => ({
    type: TweetsAction.SAVE_INITIAL_TWEETS,
    payload: tweets
  }),

  toggleTweetLike: (tweetId, authedUser) => ({
    type: TweetsAction.TOGGLE_TWEET_LIKE,
    payload: {
      tweetId,
      authedUser
    }
  }),

  saveNewTweet: tweet => ({
    type: TweetsAction.SAVE_NEW_TWEET,
    payload: tweet
  })
};

export const TweetsApiActionCreator = {
  toggleTweetLike: (tweetId, authedUser) => (dispatch, getState) => {
    dispatch(TweetsActionCreator.toggleTweetLike(tweetId, authedUser));
    const tweet = getState().tweets[tweetId];
    return API.saveLikeToggle({
      id: tweetId,
      hasLiked: !tweetHasUserInLikesList(tweet, authedUser),
      authedUser
    }).catch(() => {
      dispatch(TweetsActionCreator.toggleTweetLike(tweetId, authedUser));
      alert('Could not toggle tweet like state for ' + authedUser);
    });
  },

  saveNewTweet: (text, replyingTo) => (dispatch, getState) => {
    const author = getState().authedUser;
    dispatch(showLoading());
    return API.saveTweet({ text, author, replyingTo })
      .then(tweet => dispatch(TweetsActionCreator.saveNewTweet(tweet)))
      .catch(() => alert('Could not save new tweet for ' + author))
      .finally(() => dispatch(hideLoading()));
  }
};

const tweetHasUserInLikesList = (tweet, user) => {
  const { likes } = tweet;
  const hasUserInList = likes.indexOf(user) !== -1;
  return hasUserInList;
};
