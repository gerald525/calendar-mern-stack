import types from "../types";

const initialState = {
  checking: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        checking: false,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
