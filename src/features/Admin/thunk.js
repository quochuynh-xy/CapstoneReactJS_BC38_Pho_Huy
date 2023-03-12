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

export const fetchUserDetail =  (soTrang) => async (dispatch) => {
  try {
    const res = await adminServices.fetchUserDetailPagination(8, soTrang)
    dispatch({
      type: adminTypes.FETCH_USER_PAGINATION,
      payload: res.data.content
    })
  } catch(err) {
    console.log(err)
  }
}

export const deleteFilm = (idFilm) => async (dispatch) => {
  try {
    const res = await adminServices.adminDeleteFilm(idFilm)
    dispatch({
      type: adminTypes.DELETE_FILM,
      payload: res.data.content
    })
  } catch(err) {
    console.log(err)
  }
}