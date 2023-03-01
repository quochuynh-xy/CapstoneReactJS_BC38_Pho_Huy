import { https } from "./config";
export const movieServices = {
  fetchBanner: () => https.get("api/QuanLyPhim/LayDanhSachBanner"),
  fetchMovies: (pageSize = 8, pageIndex) =>
    https.get("api/QuanLyPhim/LayDanhSachPhimPhanTrang", {
      params: {
        maNhom: "GP03",
        soTrang: pageIndex,
        soPhanTuTrenTrang: pageSize,
      },
    }),
  getShowScheduleByTheater: (theaterId) =>
    https.get("/api/QuanLyRap/LayThongTinLichChieuHeThongRap", {
      params: {
        maNhom: "GP01",
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
};
