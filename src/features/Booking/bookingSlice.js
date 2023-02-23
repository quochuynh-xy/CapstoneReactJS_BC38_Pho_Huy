import produce from "immer";
import { types } from "./const"; // action type
const initState = {
  banner: [],
  pageMovies: {},
  srcTrailer: null
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
      default:
        return state;
    }
  });
};
export default booking