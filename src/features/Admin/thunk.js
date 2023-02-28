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
