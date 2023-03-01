import produce from "immer";
import types from "./const";
const initState = {
  userLogin: null,
};
const authentication = (state = initState, action) => {
  const { type, payload } = action;
  return produce(state, (draft) => {
    switch (type) {
      case types.LOGIN: {
        draft.userLogin = payload;
        break;
      }
      case types.LOGOUT: {
        draft.userLogin = payload;
        break
      }
      default:
        return;
    }
  });
};
export default authentication;