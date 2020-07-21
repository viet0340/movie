const defaultState = {
  token: undefined,
  user: undefined,
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        token: action.token,
        user: action.user,
      };
    case 'REMOVE_USER':
      return {
        token: undefined,
        user: undefined,
      };
    default:
      return state;
  }
};

export default userReducer;
