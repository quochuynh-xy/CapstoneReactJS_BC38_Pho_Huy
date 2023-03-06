import produce from "immer";
import { types } from "./const"; // action type
const initState = {
  banner: [], // Thông tin banner
  pageMovies: {}, // Danh sách phim phân trang
  srcTrailer: null, // URL xem trước trailer
  listOfMovies: [], // Danh sách phim tổng hợp (có thể là tất cả phim || phim theo cụm rạp)
  selectedShow: {}, // Thông tin của phim và rạp được lựa chọn
  cartInfo: {
    orderInfo: {}, // Thông tin số lượng ghế khách yêu cầu
    checkOutInfo: {
      maLichChieu: 0,
      danhSachGhe: [],
    }, // Thông tin đặt ghế sau khi chọn chỗ.
  }, // Thông tin giỏ hàng
  bookingStep: 0, // Chọn số lượng vé - đặt ghế - chọn đồ ăn - Thanh toán: 0 - 1 - 2 - 3
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
      case types.GET_MOVIES_LIST: {
        draft.listOfMovies = payload;
        break;
      }
      case types.GET_DATA_OF_SHOW_ID: {
        draft.selectedShow = payload;
        break;
      }
      case types.SET_BOOKING_STEP: {
        draft.bookingStep = payload;
        break;
      }
      case types.START_SELECT_SEATS: {
        draft.cartInfo = {
          ...draft.cartInfo,
          orderInfo: payload,
        };
        break;
      }
      case types.SELECTING_SEATS: {
        draft.cartInfo = {
          ...draft.cartInfo,
          checkOutInfo: payload,
        };
        break;
      }
      case types.GETBACK_STEP_0: {
        draft.bookingStep = 0;
        draft.cartInfo.checkOutInfo.danhSachGhe = [];
        break;
      }
      default:
        return state;
    }
  });
};
export default booking;
