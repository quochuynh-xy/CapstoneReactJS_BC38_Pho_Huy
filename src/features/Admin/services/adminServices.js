import { https } from "../../../services/config";
import { adminToken } from "../utils/const";

export const adminServices = {
    fetchMovieDetail : () => https.get('api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01'),
    fetchUserDetailPagination : (pagesize, pageindex) => {
        return https.get("api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang", {
            params: {
                maNhom: "GP01",
                soTrang: pageindex,
                soPhanTuTrenTrang: pagesize
            },
        })
    },
    adminDeleteFilm: (idFilm) => {
        return https.delete('api/QuanLyPhim/XoaPhim', {
            params:{
                MaPhim: idFilm
            },
            headers: {
                Authorization:"Bearer " + adminToken
            }
        })
    }
}