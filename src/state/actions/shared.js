import { showLoading, hideLoading } from 'react-redux-loading';

import * as API from './../../utils/api';

import { UsersActionCreator } from './users';
import { TweetsActionCreator } from './tweets';
import { AuthedUserActionCreator } from './authed-user';

const SAVE_INITIAL_STATE = 'SAVE_INITIAL_STATE';

export const SharedAction = {
  SAVE_INITIAL_STATE
};

export const SharedActionCreator = {
  saveInitialState: () => dispatch => {
    dispatch(showLoading());
    return API.getInitialData().then(({ users, tweets, authedUser }) => {
      dispatch(UsersActionCreator.saveInitialUsers(users));
      dispatch(TweetsActionCreator.saveInitialTweets(tweets));
      dispatch(AuthedUserActionCreator.saveAuthedUserId(authedUser));
      dispatch(hideLoading());
    });
  }
};
