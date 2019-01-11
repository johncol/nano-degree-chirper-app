const SAVE_INITIAL_USERS = 'SAVE_INITIAL_USERS';

export const UsersAction = {
  SAVE_INITIAL_USERS
};

export const UsersActionCreator = {
  saveInitialUsers: users => ({
    type: UsersAction.SAVE_INITIAL_USERS,
    payload: users
  })
};
