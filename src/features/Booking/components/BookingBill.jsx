import { useSelector } from "react-redux";
import { formatCurrency } from "../../../utilities/utilities";
const BookingBill = (props) => {
  // Thông tin số lượng ghế khách đặt
  const orderInfo = useSelector((state) => state.booking.cartInfo.orderInfo);
  const checkOutInfo = useSelector(
    (state) => state.booking.cartInfo.checkOutInfo
  );
  // Thông tin phim khách chọn
  const selectedShow = useSelector((state) => state.booking.selectedShow);
  const thongTinPhim = selectedShow.thongTinPhim;
  const { countCommon, countVip, vipPrice, commonPrice } = orderInfo;
  return (
    <>
      <div className="bill">
        <div className="movie-name text-center">{thongTinPhim?.tenPhim}</div>
        <div className="data-time flex justify-between">
          <p className="time__title text-start">Ngày chiếu:</p>
          <p className="time__data text-end">
            <span className="mx-1 text-orange-500">
              {thongTinPhim?.gioChieu}
            </span>
            - {thongTinPhim?.ngayChieu}
          </p>
        </div>
        <div className="data-theater flex justify-between">
          <p className="theater__title text-start">Cụm rạp:</p>
          <p className="theater__data text-end">{thongTinPhim?.tenCumRap}</p>
        </div>
        <div className="data-room flex justify-between">
          <p className="room__title text-start">Thông tin rạp:</p>
          <p className="room__data text-end">{thongTinPhim?.tenRap}</p>
        </div>
        <div className="common-ticket">
          <p className="tiket__title text-start flex justify-between">
            Adult-Standar-2D:
            <span className="price">
              {" "}
              {formatCurrency(Math.floor(commonPrice))} đ
            </span>
          </p>
          <p className="qty text-end">
            Số lượng:{" "}
            <span className="font-semibold ml-4 mr-8">{countCommon}</span>
          </p>
        </div>
        <div className="vip-ticket">
          <p className="tiket__title text-start flex justify-between">
            Adult-VIP-2D{" "}
            <span className="price">
              {formatCurrency(Math.floor(vipPrice))} đ
            </span>
          </p>
          <p className="qty text-end">
            Số lượng:{" "}
            <span className="font-semibold ml-4 mr-8">{countVip}</span>
          </p>
        </div>
        <div className="selected-seat">
          <p>
            Ghế đã chọn:
            <span className="ml-3 text-red-700 font-semibold">
              {checkOutInfo?.danhSachVe.map((item) => item.viTri).join(" - ")}
              {checkOutInfo?.danhSachVe[0] ? "." : ""}
            </span>
          </p>
        </div>
        <div className="total-cash flex justify-between mt-2">
          <p>Tổng cộng</p>
          <p>
            {formatCurrency(
              Math.floor(commonPrice * countCommon + vipPrice * countVip)
            )}{" "}
            đ
          </p>
        </div>
      </div>
    </>
  );
};
export default BookingBill;
