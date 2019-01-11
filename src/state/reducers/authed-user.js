import { AuthedUserAction } from '../actions/authed-user';

const authedUserReducer = (state = null, action) => {
  switch (action.type) {
    case AuthedUserAction.SAVE_AUTHED_USER_ID:
      return action.payload;
    default:
      return state;
  }
};

export default authedUserReducer;
