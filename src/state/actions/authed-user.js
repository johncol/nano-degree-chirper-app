const SAVE_AUTHED_USER_ID = 'SAVE_AUTHED_USER_ID';

export const AuthedUserAction = {
  SAVE_AUTHED_USER_ID
};

export const AuthedUserActionCreator = {
  saveAuthedUserId: userId => ({
    type: AuthedUserAction.SAVE_AUTHED_USER_ID,
    payload: userId
  })
};
