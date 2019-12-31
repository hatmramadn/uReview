import {
  AUTHENTICATE,
  AUTHENTICATE_SILENTLY,
  GET_CURRENT_USER
} from "../actions/authAction";
const initialState = {
  user: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        user: action.payload
      };
    case AUTHENTICATE_SILENTLY:
      return {
        ...state,
        user: action.payload
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
