import { https } from "../../../services/config";

export const adminServices = {
    fetchMovieDetail : () => https.get('api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01'),
}