import produce from "immer";
import { types } from "./const"; // action type
const initState = {
  banner: [], // Thông tin banner
  pageMovies: {}, // Danh sách phim phân trang
  srcTrailer: null, // URL xem trước trailer
  listOfMovies: [], // Danh sách phim tổng hợp (có thể là tất cả phim || phim theo cụm rạp)
};
const booking = (state = initState, action) => {
  const { type, payload } = action;
  return produce(state, (draft) => {
    switch (type) {
      case types.SET_BANNER: {
        draft.banner = payload;
        break;
      }
      case types.GET_MOVIES_PAGES: {
        draft.pageMovies = payload;
        break;
      }
      case types.SENDING_TRAILER_URL: {
        draft.srcTrailer = payload.split("/").pop();
        break;
      }
      case types.GET_MOVIES_LIST :{
        draft.listOfMovies = payload;
        break
      }
      default:
        return state;
    }
  });
};
export default booking