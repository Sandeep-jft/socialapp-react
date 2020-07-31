export const initialState = null;

export const reducer = (state, action) => {
  // switch (action.type) {
  //   case "USER":
  //     return action.payload;
  //     break;
  //   default:
  //     return state;
  //     break;
  // }
  if ((action.type = "USER")) {
    return action.payload;
  } else if ((action.type = "CLEAR")) {
    return null;
  } else {
    return state;
  }
};
