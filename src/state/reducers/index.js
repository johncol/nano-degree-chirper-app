import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading';

import users from './users';
import tweets from './tweets';
import authedUser from './authed-user';

export default combineReducers({
  users,
  tweets,
  authedUser,
  loadingBar
});
