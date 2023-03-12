import { types } from "./const"; // token cybersoft, type của action
import { movieServices } from "./Services/movieServices";
/**
 * Đây là 1 thunk function, thunkfunction nhận vào 2 tham số:
 * + Tham số thứ nhất đại diện cho dispatch, nó là một hàm để gửi action lên store.
 * + Tham số thứ hai là getState, nó là một hàm để lấy dữ liệu từ store.
 * + Ta có thể gửi dispatch bao nhiêu lần tùy thích.
 * */
// Lấy thông tin banner
export const fetchBanner = async (dispatch, getState) => {
  try {
    const promise = await movieServices.fetchBanner();
    dispatch({
      type: types.SET_BANNER,
      payload: promise.data.content,
    });
  } catch (error) {
    console.log(error);
  }
};
// Lấy thông tin phim phân trang
export const fetchMovies = (page) => async (dispatch, getState) => {
  if (!page) page = 1;
  try {
    const promise = await movieServices.fetchMovies(8, page);
    dispatch({
      type: types.GET_MOVIES_PAGES,
      payload: promise.data.content,
    });
  } catch (error) {
    console.log(error);
  }
};
// Lấy danh sách phim theo rạp
export const fetchListMovies = (theaterId) => async (dispatch, getState) => {
  try {
    const promise = await movieServices.getShowScheduleByTheater(theaterId);
    dispatch({
      type: types.GET_MOVIES_LIST,
      payload: promise.data.content,
    });
  } catch (error) {
    console.log(error);
  }
};
// Lấy thông tin rạp chiếu từ mã lịch chiếu
export const fetchDataShowId = (showId) => (dispatch) => {
  let promise = movieServices.fetchShowById(showId);
  promise
    .then((res) =>
      dispatch({
        type: types.GET_DATA_OF_SHOW_ID,
        payload: res.data.content,
      })
    )
    .catch((err) => console.log(err));
};
