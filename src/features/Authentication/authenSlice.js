import produce from "immer";
import types from "./const";
const initState = {
  userLogin: null,
  modalPopUpStatus: false,
  loginMessage: ""
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
        localStorage.setItem("cyberfilmToken", "");
        break
      }
      case types.LOGIN_FAIL: {
        draft.loginMessage = payload;
        break
      }
      case types.SHOW_MODAL: {
        draft.modalPopUpStatus = payload;
        break
      }
      default:
        return;
    }
  });
};
export default authentication;