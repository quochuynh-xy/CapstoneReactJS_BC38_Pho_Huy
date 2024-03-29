import BookingBill from "./BookingBill";
import { types } from "../const";
import { useDispatch } from "react-redux";
import coca from "../../../app/assets/img/images/coca.jpg";
import popcorncoca from "../../../app/assets/img/images/popcorn1coca.jpg";
import popcorn2coca from "../../../app/assets/img/images/popcorn2coca.jpg";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
const BookingFood = () => {
  const dispatch = useDispatch();
  return (
    <div className="foodandbill pt-20 flex flex-wrap justify-between container mx-auto">
      <div className="food basis-full lg:basis-8/12 flex flex-wrap justify-around">
        <div className="basis-full text-red-500">
          <h2 className="text-lg pb-3">
            *Tính năng này đang trong quá trình phát triển, vui lòng đến bước kế
            tiếp.
          </h2>
        </div>
        <div className="food__item cursor-not-allowed basis-5/12 lg:basis-3/12 mb-10 flex flex-col px-3 justify-center items-center">
          <div className="item__des">
            <img className="w-full h-44 block" src={coca} alt="combo1" />
            <div className="border-x-4 border-b-4 border-green-700 border-solid p-2 pb-4">
              <h3 className="text-white font-semibold h-20">
                Nước ngọt tùy chọn size S.
              </h3>
              <p className="text-slate-300">Giá: 69.000đ</p>
              <div className="text-white flex items-center justify-center mt-2">
                <span className="text-lg cursor-pointer">
                  <BsChevronLeft />
                </span>
                <span className="px-4">0</span>
                <span className="text-lg cursor-pointer">
                  <BsChevronRight />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="food__item cursor-not-allowed basis-5/12 lg:basis-3/12 mb-10 flex flex-col px-3 justify-center items-center">
          <div className="item__des">
            <img className="w-full h-44 block" src={coca} alt="combo1" />
            <div className="border-x-4 border-b-4 border-green-700 border-solid p-2 pb-4">
              <h3 className="text-white font-semibold h-20">
                Nước ngọt tùy chọn size L.
              </h3>
              <p className="text-slate-300">Giá: 79.000đ</p>
              <div className="text-white flex items-center justify-center mt-2">
                <span className="text-lg cursor-pointer">
                  <BsChevronLeft />
                </span>
                <span className="px-4">0</span>
                <span className="text-lg cursor-pointer">
                  <BsChevronRight />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="food__item cursor-not-allowed basis-5/12 lg:basis-3/12 mb-10 flex flex-col px-3 justify-center items-center">
          <div className="item__des">
            <img className="w-full h-44 block" src={popcorncoca} alt="combo1" />
            <div className="border-x-4 border-b-4 border-green-700 border-solid p-2 pb-4">
              <h3 className="text-white font-semibold h-20">
                Combo 1 bắp + nước vị tùy chọn.
              </h3>
              <p className="text-slate-300">Giá: 109.000đ</p>
              <div className="text-white flex items-center justify-center mt-2">
                <span className="text-lg cursor-pointer">
                  <BsChevronLeft />
                </span>
                <span className="px-4">0</span>
                <span className="text-lg cursor-pointer">
                  <BsChevronRight />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="food__item cursor-not-allowed basis-5/12 lg:basis-3/12 mb-10 flex flex-col px-3 justify-center items-center">
          <div className="item__des">
            <img
              className="w-full h-44 block"
              src={popcorn2coca}
              alt="combo1"
            />
            <div className="border-x-4 border-b-4 border-green-700 border-solid p-2 pb-4">
              <h3 className="text-white font-semibold h-20">
                Combo 1 bắp + 2 nước vị tùy chọn.
              </h3>
              <p className="text-slate-300">Giá: 119.000đ</p>
              <div className="text-white flex items-center justify-center mt-2">
                <span className="text-lg cursor-pointer">
                  <BsChevronLeft />
                </span>
                <span className="px-4">0</span>
                <span className="text-lg cursor-pointer">
                  <BsChevronRight />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="basis-full px-12 lg:basis-3/12 lg:px-0">
        <BookingBill />
        <div className="text-end">
          <button
            className="btn-next bg-red-700 hover:bg-red-800 duration-300 w-full py-4 rounded-b-sm text-white"
            onClick={() =>
              dispatch({
                type: types.SET_BOOKING_STEP,
                payload: 3,
              })
            }
          >
            Tiếp theo
          </button>
        </div>
      </div>
    </div>
  );
};
export default BookingFood;
