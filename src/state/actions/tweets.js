const SAVE_INITIAL_TWEETS = 'SAVE_INITIAL_TWEETS';

export const TweetsAction = {
  SAVE_INITIAL_TWEETS
};

export const TweetsActionCreator = {
  saveInitialTweets: tweets => ({
    type: TweetsAction.SAVE_INITIAL_TWEETS,
    payload: tweets
  })
};
