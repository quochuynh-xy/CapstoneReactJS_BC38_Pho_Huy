import { adminTypes } from "./utils/const";

import { adminServices } from "./services/adminServices";
import Swal from "sweetalert2";

export const fetchMovieDetail = (tenPhim='') => async (dispatch) => {
  try {
    const res = await adminServices.fetchMovieDetail(tenPhim);
    dispatch({
      type: adminTypes.FETCH_MOVIE_DETAIL,
      payload: res.data.content,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchUserDetail = (soTrang) => async (dispatch) => {
  try {
    const res = await adminServices.fetchUserDetailPagination(8, soTrang);
    dispatch({
      type: adminTypes.FETCH_USER_PAGINATION,
      payload: res.data.content,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteFilm = (idFilm) => async (dispatch, getState) => {
  try {
    const result = await Swal.fire({
      title: "Bạn có muốn xóa phim này không?",
      text: "Bạn không thể khôi phục sau khi xóa!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, tôi muốn xóa phim này!",
    });

    if (result.isConfirmed) {
      const res = await adminServices.adminDeleteFilm(idFilm);
      console.log(res.data.content);
      Swal.fire("Xóa thành công!", "success");
      const { admin } = getState();
      const updatedFilmDetail = admin.filmDetail.filter(
        (film) => film.id !== idFilm
      );
      console.log(updatedFilmDetail)
      dispatch({
        type: adminTypes.FETCH_MOVIE_DETAIL,
        payload: updatedFilmDetail,
      });
      dispatch(fetchMovieDetail);
    }
  } catch (err) {
    console.log(err);
  }
};

export const addNewFilm = (formData) => async (dispatch, getState) => {
  try {
    const res = await adminServices.adminAddNewFilm(formData);
    alert("thêm thành công");
    console.log(res.data.content);

    const { admin } = getState();
    dispatch({
      type: adminTypes.FETCH_MOVIE_DETAIL,
      payload: [...admin.filmDetail, res.data.content],
    });
  } catch (err) {
    console.log(err);
  }
};

export const getDetailFilm = (id) => async (dispatch) => {
  try {
    const res = await adminServices.adminGetDetailFilm(id);
    dispatch({
      type: adminTypes.GET_DETAIL_FILM,
      payload: res.data.content,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateDetailFilm = (formData) => async (dispatch, getState) => {
  try {
    const res = await adminServices.adminEditedDetailFilm(formData);
    alert("Cập nhật thành công");
    console.log(res.data.content);

    // Cập nhật thông tin phim trong danh sách phim hiện tại
    const { admin } = getState();
    const updatedMovies = admin.movies.map((movie) =>
      movie.id === res.data.content.id ? res.data.content : movie
    );
    
    dispatch({
      type: adminTypes.FETCH_MOVIE_DETAIL,
      payload: updatedMovies,
    });
  
  } catch (err) {
    console.log(err);
  }
};

export const addNewUser = (formData) => async (dispatch, getState)=> {
  try {
    const res = await adminServices.adminAddUser(formData);
    alert("thêm thành công");
    console.log(res.data.content);

    const { admin } = getState();
    dispatch({
      type: adminTypes.FETCH_USER_PAGINATION,
      payload: [...admin.userDetail, res.data.content],
    });
  } catch (err) {
    console.log(err);
  }
}