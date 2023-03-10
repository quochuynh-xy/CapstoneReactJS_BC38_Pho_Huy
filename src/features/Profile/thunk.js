import types from "./const";
import userServices from "./Services/profileServices";
export const actionFetchUserData =
  (userToken) => async (dispatch, getState) => {
    try {
        const promise = await userServices.fetchUserData(userToken);
      const thongTinNguoiDung = {
        taiKhoan: promise.data.content.taiKhoan,
        matKhau: promise.data.content.matKhau,
        hoTen: promise.data.content.hoTen,
        email: promise.data.content.email,
        soDT: promise.data.content.soDT,
        maNhom: promise.data.content.maNhom,
        maLoaiNguoiDung: promise.data.content.maLoaiNguoiDung,
      };
      const { thongTinDatVe } = promise.data.content;
      return dispatch({
        type: types.GET_USER_DATA_SUCCESS,
        payload: { thongTinNguoiDung, thongTinDatVe },
      });
    } catch (error) {
        console.log(error);
      return dispatch({
        type: types.GET_USER_DATA_ERR,
        payload: "Đăng nhập lỗi",
      });
    }
  };
