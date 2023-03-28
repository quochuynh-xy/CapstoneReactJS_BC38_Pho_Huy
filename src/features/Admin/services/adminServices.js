import { https } from "../../../services/config";

export const adminServices = {
    fetchMovieDetail : (tenPhim = '') => {
        if( tenPhim !== ''){
            return https.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${tenPhim}`)
        } 
        return    https.get('api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01')
        
    },
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
                Authorization:"Bearer " + localStorage.getItem('cyberfilmToken')
            }
        })
    },

    adminAddNewFilm : (formData) => {
        return https.post('api/QuanLyPhim/ThemPhimUploadHinh',formData)
    },
    adminEditedDetailFilm: (formData) => {
        return https.post('api/QuanLyPhim/CapNhatPhimUpload',formData,{
            headers:{
                Authorization: "Bearer " + localStorage.getItem('cyberfilmToken')
            }
        })
    },
    adminGetDetailFilm: (id) => {
        return https.get('api/QuanLyPhim/LayThongTinPhim',{
            params: {
                MaPhim: id
            }
        })
    },
    adminAddUser: (formData)=> {
        return https.post('api/QuanLyNguoiDung/ThemNguoiDung',formData,{
            headers:{
                Authorization:"Bearer " + localStorage.getItem('cyberfilmToken')
            }
        })
    },
    adminGetInfoCinemaSys: ()=> {
        return https.get('/api/QuanLyRap/LayThongTinHeThongRap')
    },
    adminGetInfoCinema: (maHeThongRap) => {
        return https.get(`api/QuanLyRap/LayThongTinCumRapTheoHeThong`,{
            params:{
                maHeThongRap:  maHeThongRap
            }
        } )
    },
    adminTaoLichChieu: (thongTinLichChieu) => {
        return https.post(`api/QuanLyDatVe/TaoLichChieu`, thongTinLichChieu,{
            headers:{
                Authorization:'Bearer ' + localStorage.getItem('cyberfilmToken')
            }
        })
    }
}