import { useSelector } from "react-redux";
import BookingBill from "./BookingBill";
const BookingSeatsMap = () => {
  const listOfseats = useSelector(
    (state) => state.booking.selectedShow.danhSachGhe
  );
  const CommonSeat = (props) => (
    <button className="p-2 m-1 rounded bg-green-200">{props.data.tenGhe}</button>
  );
  const VipSeat = (props) => (
    <button className="p-2 m-1 rounded bg-red-200">{props.data.tenGhe}</button>
  );

  return (
    <section className="seatandbill pt-20 flex justify-between container mx-auto">
      <div className="seatsMap basis-8/12">
        {listOfseats.length &&
          listOfseats.map((seat) => {
            if (seat.loaiGhe === "Thuong") {
              return <CommonSeat key={seat.tenGhe} data={seat} />;
            } else {
              return <VipSeat key={seat.tenGhe} data={seat} />;
            }
          })}
      </div>
      <BookingBill />
    </section>
  );
};
export default BookingSeatsMap;
