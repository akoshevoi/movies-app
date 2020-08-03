// @flow
const INITIAL_STATE = {
  authUser: null
};

const applySetAuthUser = (state, action) => ({
  ...state,
  authUser: action.authUser
});

const sessionState = (state: Object = INITIAL_STATE, action: Object) => {
  switch (action.type) {
    case 'AUTH_USER_SET': {
      return applySetAuthUser(state, action);
    }
    default:
      return state;
  }
};

export default sessionState;
