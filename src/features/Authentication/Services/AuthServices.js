import { https } from "../../../services/config";
export const authServices = {
    login: (loginData) => https.post("api/QuanLyNguoiDung/DangNhap", loginData),
    autoFetchProfile: (token) => { 
      return https.post("api/QuanLyNguoiDung/ThongTinTaiKhoan", undefined, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
     }
}