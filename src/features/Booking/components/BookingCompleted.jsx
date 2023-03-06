import BookingBill from "./BookingBill";
import { useDispatch } from "react-redux";
import { types } from "../const";
const BookingCompleted = () => {
    const dispatch = useDispatch()
  return (
    <div className="booking-done pt-20 flex justify-between container mx-auto">
      <div className="food basis-8/12 flex flex-wrap justify-start">
      </div>
      <div>
        <BookingBill />
        <div className="text-end">
          <button
            className="bg-red-600 rounded-md mt-4 px-6 py-2 text-white ml-auto"
            onClick={() =>
              dispatch({
                type: types.SET_BOOKING_STEP,
                payload: 4,
              })
            }
          >
            Hoàn tất
          </button>
        </div>
      </div>
    </div>
  );
};
export default BookingCompleted;
