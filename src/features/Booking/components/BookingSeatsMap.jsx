import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BookingBill from "./BookingBill";
// Đang dính bug khi chưa load xong dữ liệu mà nhấn ngay tới bước này thì sinh lỗi.
// Bug tự nhảy đến trang chọn ghế mà chưa qua trang chọn số lượng vé
const BookingSeatsMap = () => {
  const listOfseats = useSelector(
    (state) => state.booking.selectedShow.danhSachGhe
  );
  const [seatingChart, setSeatingChart] = useState([]);
  const CommonSeat = (props) => (
    <button className="common seat">{props.data?.soGhe}</button>
  );
  const VipSeat = (props) => (
    <button className="vip seat">{props.data?.soGhe}</button>
  );
  const TakenSeat = (props) => (
    <button className="taken seat cursor-not-allowed">
      {props.data?.soGhe}
    </button>
  );
  const splitRow = (totalSeat, quantity = 16) => {
    if (!totalSeat) return;
    let character = "ABCDEFGHIJKLMNOP".split("");
    let resut = [];
    let rowName = 0;
    for (let i = 0; i < totalSeat.length; i += quantity) {
      let item = {
        index: character[rowName],
        row: totalSeat.slice(i, i + quantity),
      };
      rowName++;
      item.row = item.row.map((slot, index) => {
        return { ...slot, soGhe: index + 1 };
      });
      resut.push(item);
    }
    return resut;
  };
  // console.log(splitRow(listOfseats, 16));
  useEffect(() => {
    if (!listOfseats) return;
    setSeatingChart(splitRow(listOfseats, 16));
  }, [listOfseats]);
  // Hiện tại dữ liệu trả về không có sơ đồ bố trí nên mặc định sẽ có 16 ghế/hàng
  return (
    <section className="seatandbill pt-20 flex justify-between container mx-auto">
      <div className="seatsMap basis-8/12">
        <div className="screen text-center">
          <p className="font-semibold text-white">MÀN HÌNH</p>
        </div>
        <div className="seats">
          {seatingChart.length &&
            seatingChart.map((singleRow) => {
              return (
                <div key={singleRow.index} className="flex justify-around">
                  {singleRow.row.map((seat) => {
                    if (seat.loaiGhe === "Thuong") {
                      if (seat.daDat) {
                        return <TakenSeat data={seat} key={seat.maGhe} />;
                      } else {
                        return <CommonSeat data={seat} key={seat.maGhe} />;
                      }
                    } else {
                      if (seat.daDat) {
                        return <TakenSeat data={seat} key={seat.maGhe} />;
                      } else {
                        return <VipSeat data={seat} key={seat.maGhe} />;
                      }
                    }
                  })}
                </div>
              );
            })}
          <div className="note flex mt-3 h-fit flex-wrap pb-6">
            <div className="flex mr-4 items-center">
              <span className="common"></span><p className="text-white ml-4">: Ghế thường.</p>
            </div>
            <div className="flex mr-4 items-center">
            <span className="vip"></span><p className="text-white ml-4">: Ghế VIP.</p>
            </div>
            <div className="flex mr-4 items-center">
            <span className="taken"></span><p className="text-white ml-4">: Ghế đã đặt.</p>
            </div>
            <div className="flex mr-4 items-center">
            <span className="pending"></span><p className="text-white ml-4">: Ghế đang chọn.</p>
            </div>
          </div>
        </div>
      </div>
      <BookingBill />
    </section>
  );
};
export default BookingSeatsMap;
