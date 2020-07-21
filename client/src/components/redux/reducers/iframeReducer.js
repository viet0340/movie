const defaultState = {
  iframe: false,
  url: undefined,
};

const iframeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'IFRAME_TRUE':
      return {
        ...state,
        iframe: true,
        url: action.url,
      };
    case 'IFRAME_FALSE':
      return {
        ...state,
        iframe: false,
      };

    default:
      return state;
  }
};

export default iframeReducer;
