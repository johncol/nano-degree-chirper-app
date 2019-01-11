import { UsersAction } from '../actions/users';

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case UsersAction.SAVE_INITIAL_USERS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default usersReducer;
