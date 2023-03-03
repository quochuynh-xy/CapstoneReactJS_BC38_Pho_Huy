import { useSelector } from "react-redux";

const BookingBill = () => {
  const orderInfo = useSelector((state) => state.booking.cartInfo.seatsInfo);
  const selectedShow = useSelector((state) => state.booking.selectedShow);
  const thongTinPhim = selectedShow.thongTinPhim;
  return (
    <div className="bill h-fit border border-solid border-slate-100">
      <div className="title text-center">
        <h2>Giỏ hàng của bạn</h2>
      </div>
      <p className="bill__moviename">{thongTinPhim?.tenPhim}</p>
      <p className="text-xs ml-3 text-slate-400 italic">{thongTinPhim?.tenCumRap +", "+ thongTinPhim?.tenRap}</p>
      <div className="flex flex-wrap justify-end items-center">
        <p className="basis-full ticket-type mt-2 pl-3">
          Adult-Standar-2D:
        </p>
        <span className="mr-4 font-semibold text-slate-200">Số lượng:</span>
        <span className="w-4 font-bold text-green-400 text-center">
          {orderInfo?.countCommon}
        </span>
        <span className="basis-3/12 text-orange-400 ml-2 mr-4 text-end">
          70.000đ
        </span>
      </div>
      <div className="flex flex-wrap justify-end items-center">
        <p className="basis-full ticket-type mt-2 pl-3">
          Adult-VIP-2D:
        </p>
        <span className="mr-4 font-semibold text-slate-200">Số lượng:</span>
        <span className="w-4 font-bold text-green-400 text-center">
          {orderInfo?.countVip}
        </span>
        <span className="basis-3/12 text-orange-400 ml-2 mr-4 text-end">
          200.000đ
        </span>
      </div>
      <div className="selected pl-3 pt-8 font-bold text-slate-200">
        <p className="seat-name">Ghế đã chọn: <span className="text-red-500 ml-4">H11, H12, E11, E12, F31</span></p>
      </div>
      <div className="mt-8 py-4 flex border-t-2 border-solid border-green-500">
        <p className="text-orange-400 text-lg pl-3">
          TỔNG CỘNG:
        </p>
          <span className="font-medium text-lg ml-auto text-orange-400 mr-4"> 270.000đ</span>
      </div>
    </div>
  );
};
export default BookingBill;
