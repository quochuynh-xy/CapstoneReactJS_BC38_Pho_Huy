import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BookingBill from "./BookingBill";
// Đang dính bug khi chưa load xong dữ liệu mà nhấn ngay tới bước này thì sinh lỗi.
const BookingSeatsMap = () => {
  const listOfseats = useSelector(
    (state) => state.booking.selectedShow.danhSachGhe
  );
  const [seatingChart, setSeatingChart] = useState([]);
  const CommonSeat = (props) => (
    <button className="p-2 m-1 rounded bg-green-200">
      {props.data.soGhe}
    </button>
  );
  const VipSeat = (props) => (
    <button className="p-2 m-1 rounded bg-red-200">{props.data.soGhe}</button>
  );
  const TakenSeat = (props) => (
    <button className="p-2 m-1 rounded bg-slate-400">
      {props.data.soGhe}
    </button>
  );
  const splitRow = (totalSeat, quantity = 16) => {
    if(!totalSeat) return
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
        return { ...slot, soGhe: index+1 };
      });
      resut.push(item);
    }
    return resut;
  };
  // console.log(splitRow(listOfseats, 16));
  useEffect(() => {
    if(!listOfseats) return
    setSeatingChart(splitRow(listOfseats, 16));
  }, [listOfseats]);
  // Hiện tại dữ liệu trả về không có sơ đồ bố trí nên mặc định sẽ có 16 ghế/hàng
  return (
    <section className="seatandbill pt-20 flex justify-between container mx-auto">
      <div className="seatsMap basis-8/12">
        {seatingChart.length &&
          seatingChart.map((singleRow)=>{
            return <div key={singleRow.index}>
              {singleRow.row.map(seat => {
                if(seat.loaiGhe ==="Thuong") {
                  if(seat.daDat) {return <TakenSeat key={seat.maGhe}/>} else {
                    return <CommonSeat data={seat} key={seat.maGhe}/>
                  }
                } else {
                  if(seat.daDat) {return <TakenSeat key={seat.maGhe}/>} else {
                    return <VipSeat data={seat} key={seat.maGhe}/>
                  }
                }
              })}
            </div>
          })}
      </div>
      <BookingBill />
    </section>
  );
};
export default BookingSeatsMap;
