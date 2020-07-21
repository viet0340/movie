const defaultState = {
  show: false,
};

const modelReducer = (state = defaultState, action) => {
  if (action.type === 'SHOW_MODEL') {
    return {
      show: true,
    };
  }
  if (action.type === 'HIDDEN_MODEL') {
    return {
      show: false,
    };
  }
  return state;
};

export default modelReducer;
