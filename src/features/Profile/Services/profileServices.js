import { https } from "../../../services/config";
const userServices = {
  fetchUserData: (userTokenBearer) => {
    return https.post("api/QuanLyNguoiDung/ThongTinTaiKhoan", undefined, {
      headers: {
        Authorization: "Bearer " + userTokenBearer,
      },
    });
  },
};
export default userServices;
