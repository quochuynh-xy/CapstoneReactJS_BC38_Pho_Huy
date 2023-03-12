import types from "./const";
import authenTypes from "../Authentication/const";
const initState = {
  userData: {},
  userBookingHistory: [],
  loginStatus: false, // sucess - pending - error
};
const profileReducer = (state = initState, action) => {
  let { type, payload } = action;
  switch (type) {
    case types.GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        userData: payload.thongTinNguoiDung,
        userBookingHistory: payload.thongTinDatVe,
        loginStatus: "success",
      };
    }
    case types.GET_USER_DATA_ERR: {
      localStorage.setItem("cyberfilmToken", "");
      return { ...initState, loginStatus: "error" };
    }
    case authenTypes.LOGOUT: {
      return initState;
    }
    default:
      return state;
  }
};
export default profileReducer;
