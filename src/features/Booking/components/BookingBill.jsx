import { useSelector } from "react-redux";

const BookingBill = () => {
  const orderInfo = useSelector((state) => state.booking.cartInfo.seatsInfo);
  const selectedShow = useSelector((state) => state.booking.selectedShow);
  const thongTinPhim = selectedShow.thongTinPhim;
  return (
    <div className="bill border border-solid border-green-500 p-2">
      <h2 className="title">Giỏ hàng của bạn</h2>
      <p className="bill__moviename">{thongTinPhim?.tenPhim}.</p>
      <div className="flex flex-wrap justify-between">
        <p className="basis-full">Adult-Standar-2D:</p>
        <span className="basis-4/12">Số lượng:</span>
        <span className="font-bold text-green-400">{orderInfo?.countCommon}</span>
        <span className="text-orange-400">70.000đ</span>
      </div>
      <div className="flex flex-wrap justify-between">
        <p className="basis-full">Adult-VIP-2D:</p>
        <span className="basis-4/12">Số lượng:</span>
        <span className="font-bold text-green-400">{orderInfo?.countVip}</span>
        <span className="text-orange-400">200.000đ</span>
      </div>
      <hr />
      <p>
        TỔNG CỘNG:
        <span className="font-medium ml-3 text-orange-500"> 270.000đ</span>
      </p>
    </div>
  );
};
export default BookingBill;
