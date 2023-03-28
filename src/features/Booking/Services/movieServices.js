import { https } from "../../../services/config";
import { maNhom as GROUP_NAME } from "../../../services/config";
export const movieServices = {
  fetchBanner: () => https.get("api/QuanLyPhim/LayDanhSachBanner"),
  fetchMovies: (pageSize = 8, pageIndex) =>
    https.get("api/QuanLyPhim/LayDanhSachPhimPhanTrang", {
      params: {
        maNhom: GROUP_NAME,
        soTrang: pageIndex,
        soPhanTuTrenTrang: pageSize,
      },
    }),
  getShowScheduleByTheater: (theaterId) =>
    https.get("/api/QuanLyRap/LayThongTinLichChieuHeThongRap", {
      params: {
        maNhom: GROUP_NAME,
        maHeThongRap: theaterId,
      },
    }),
  fetchMovieDetail: (movieId) =>
    https.get("api/QuanLyPhim/LayThongTinPhim", {
      params: {
        maPhim: movieId,
      },
    }),
  fetchShowTimeByMovie: (movieId) =>
    https.get("api/QuanLyRap/LayThongTinLichChieuPhim", {
      params: {
        maPhim: movieId,
      },
    }),
  fetchTheatersList: () => https.get("api/QuanLyRap/LayThongTinHeThongRap"),
  fetchShowById: (MaLichChieu) =>
    https.get("api/QuanLyDatVe/LayDanhSachPhongVe", {
      params: {
        MaLichChieu: MaLichChieu,
      },
    }),
  fetchAccessToken: (data) => https.post("api/QuanLyNguoiDung/DangNhap", data),
  sendCheckOutTikets: (data, token) =>
    https.post("api/QuanLyDatVe/DatVe", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  fetchListMoviesLooking: (keyword) => {

      return https.get("api/QuanLyPhim/LayDanhSachPhim", {
        params: {
          maNhom: GROUP_NAME,
          tenPhim: keyword,
        },
      });
    
  },
};
