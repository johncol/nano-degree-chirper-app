import { TweetsAction } from '../actions/tweets';

const tweetsReducer = (state = {}, action) => {
  switch (action.type) {
    case TweetsAction.SAVE_INITIAL_TWEETS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default tweetsReducer;
