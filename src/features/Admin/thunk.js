import { adminTypes } from "./utils/const";

import { adminServices } from "./services/adminServices";

export const fetchMovieDetail = async (dispatch) => {
  try {
    const res = await adminServices.fetchMovieDetail();
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
    const res = await adminServices.adminDeleteFilm(idFilm);
    alert('Xóa thành công')
    const {admin} = getState()

    dispatch({
      type: adminTypes.FETCH_MOVIE_DETAIL,
      payload: [...admin.filmDetail, res.data.content],
    });
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
export const updateDetailFilm = (id) => async (dispatch) => {
  try {
    const res = await adminServices.adminEditedDetailFilm(id);
    alert("Cập nhật thành công");
    console.log(res.data.content);
    dispatch({
      type: adminTypes.UPDATE_DETAIL_FILM,
      payload: res.data.content,
    });
  } catch (err) {
    console.log(err);
  }
};
