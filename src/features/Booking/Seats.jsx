import PageLayout from "../../HOCs/PageLayout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataShowId } from "./thunk";
import BookingOrder from "./components/BookingOrder";
import BookingBill from "./components/BookingBill";
function Seats() {
  const param = useParams();
  const dispatch = useDispatch();
  const selectedShowData = useSelector((state) => state.booking.selectedShow);
  const [movieInfo, setMovieInfo] = useState({});
  // let [step, setStep] = useState(0);
  let [movieShowId, setMovieShowId] = useState(null);
  useEffect(() => {
    setMovieShowId(param.maLichChieu);
  }, [param.maLichChieu]);
  useEffect(() => {
    if (movieShowId) {
      dispatch(fetchDataShowId(movieShowId));
    }
  }, [movieShowId, dispatch]);
  useEffect(() => {
    setMovieInfo(selectedShowData.thongTinPhim);
  }, [selectedShowData]);
  return (
    <PageLayout>
      <div className="container mx-auto booking__checkout">
        <section>
          <p> Mã lịch chiếu {movieShowId}</p>
          <div className="border-2 border-solid border-green-400 h-8 text-center flex justify-center">
            <button className="mx-2 bg-red-400 text-purple-900">
              Chọn số lượng vé
            </button>
            <span>===</span>
            <button className="mx-2 bg-orange-400 text-purple-900">
              Chọn ghế
            </button>
            <span>===</span>
            <button className="mx-2 bg-yellow-400 text-purple-900">
              Chọn đồ ăn
            </button>
            <span>===</span>
            <button className="mx-2 bg-green-400 text-purple-900">
              Thanh toán
            </button>
          </div>
        </section>
        <section className="flex justify-between">
          <div>
            <div className="flex items-center">
              <img
                className="w-24 h-32 rounded-sm"
                src={movieInfo?.hinhAnh}
                alt={movieInfo?.tenPhim}
              />
              <div className="ml-3">
                <h3 className="font-semibold text-2xl text-green-400">
                  {movieInfo?.tenPhim}
                </h3>
                <p className="text-xl font-bold">{movieInfo?.tenCumRap}</p>
                <p>{movieInfo?.diaChi}</p>
                <p>Giờ chiếu: {movieInfo?.gioChieu}</p>
                <p>Thông tin rạp: {movieInfo?.tenRap}</p>
              </div>
            </div>
            <div>
              <div>
                <h2 className="text-red-500 font-bold text-2xl">LƯU Ý</h2>
                <ul>
                  <li>Hãy chọn kỹ loại vé và số lượng vé bạn muốn mua</li>
                  <li>Bạn có thể mua tối đa 10 vé trong một lần giao dịch</li>
                  <li>
                    Để có trải nghiệm mua vé tốt nhất, vui lòng giữ một kết nối
                    internet ổn định
                  </li>
                </ul>
              </div>
            </div>
            <BookingOrder />
          </div>
          <BookingBill/>
        </section>
      </div>
    </PageLayout>
  );
}
export default Seats;
