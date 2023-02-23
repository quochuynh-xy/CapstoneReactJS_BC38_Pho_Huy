import { https } from "./config";
export const movieServices = {
  fetchBanner: () => https.get("api/QuanLyPhim/LayDanhSachBanner"),
  fetchMovies: (pageSize = 8, pageIndex) =>
    https.get("api/QuanLyPhim/LayDanhSachPhimPhanTrang", {
      params: {
        maNhom: "GP01",
        soTrang: pageIndex,
        soPhanTuTrenTrang: pageSize,
      },
    }),
  getShowScheduleByTheater: () =>
    https.get("/api/QuanLyRap/LayThongTinLichChieuHeThongRap", {
      params: {
        maNhom: "GP01",
      },
    }),
};
