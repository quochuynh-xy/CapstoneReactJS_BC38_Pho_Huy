import { types } from "./const"; // token cybersoft, type của action
import { movieServices } from "../../services/movieServices";
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
export const fetchMovies = (page) => async (dispatch, getState) => {
  if (!page) page = 1;
  try {
    const promise = await movieServices.fetchMovies(8, page)
    dispatch({
      type: types.GET_MOVIES_PAGES,
      payload: promise.data.content,
    });
  } catch (error) {
    console.log(error);
  }
};
