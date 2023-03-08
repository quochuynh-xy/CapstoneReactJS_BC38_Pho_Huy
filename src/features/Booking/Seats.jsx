import PageLayout from "../../HOCs/PageLayout";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataShowId } from "./thunk";
import BookingOrder from "./components/BookingOrder";
import BookingSeatsMap from "./components/BookingSeatsMap";
import { TfiHandPointRight } from "react-icons/tfi";
import BookingFood from "./components/BookingFood";
import BookingCompleted from "./components/BookingCompleted";
import { types } from "./const";
import { AiOutlineHome } from "react-icons/ai";
function Seats() {
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();
  const selectedShowData = useSelector((state) => state.booking.selectedShow);
  const bookingStep = useSelector((state) => state.booking.bookingStep);
  const [movieInfo, setMovieInfo] = useState({});
  let [movieShowId, setMovieShowId] = useState(null);
  const handleBackToStep0 = () => {
    // Quay về step 0
    dispatch({
      type: types.GETBACK_STEP_0,
    });
  };
  const hanleBackToHomePage = () => {
    dispatch({
      type: types.SET_BOOKING_STEP,
      payload:0
    })
    navigate("/")
  }
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
  const step1 = (
    <section className="content container mx-auto mt-12 flex justify-center">
      <div className="booking__info">
        <div className="info__movie flex">
          <img src={movieInfo?.hinhAnh} alt={movieInfo?.tenPhim} />
          <div className="detail">
            <h3 className="detail__name font-semibold">{movieInfo?.tenPhim}</h3>
            <p className="detail__theater font-bold">{movieInfo?.tenCumRap}</p>
            <p className="detail__address">{movieInfo?.diaChi}</p>
            <p className="detail__time">
              Giờ chiếu: <span>{movieInfo?.gioChieu}</span>
            </p>
            <p className="detail__day">
              Ngày: <span>{movieInfo?.ngayChieu}</span>
            </p>
            <p className="detail__screen">
              Thông tin rạp: <span>{movieInfo?.tenRap}</span>
            </p>
          </div>
        </div>
        <div className="info__warn">
          <h2 className="text-red-500 font-bold text-2xl ml-4">LƯU Ý:</h2>
          <ul>
            <li>
              <TfiHandPointRight /> Hãy chọn kỹ loại vé và số lượng vé bạn muốn
              mua.
            </li>
            <li>
              <TfiHandPointRight /> Bạn có thể mua tối đa 10 vé trong một lần
              giao dịch.
            </li>
            <li>
              <TfiHandPointRight />
              Để có trải nghiệm mua vé tốt nhất, vui lòng giữ một kết nối
              internet ổn định.
            </li>
            <li>
              <TfiHandPointRight /> Không đổi trả hay hoàn tiền sau khi thanh
              toán.
            </li>
          </ul>
        </div>
        <BookingOrder />
      </div>
      {/* <BookingBill /> */}
    </section>
  );
  return (
    <PageLayout>
      <div className="booking__checkout">
        <section className="steps container mx-auto pt-8">
          <div className="flex justify-between head relative">
            <div
              className="basis-3/12 step start text-center cursor-pointer"
              onClick={handleBackToStep0}
            >
              <p className="font-semibold text-white">1. Chọn vé.</p>
            </div>
            <div
              className={`basis-3/12 step next text-center ${
                bookingStep >= 1 ? " active" : ""
              }`}
            >
              <p className="font-semibold text-white cursor-default">
                2. Chọn ghế.
              </p>
            </div>
            <div
              className={`basis-3/12 step next text-center ${
                bookingStep >= 2 ? " active" : ""
              }`}
            >
              <p className="font-semibold text-white cursor-default">
                3. Chọn đồ ăn.
              </p>
            </div>
            <div
              className={`basis-3/12 step next text-center ${
                bookingStep >= 3 ? " active" : ""
              }`}
            >
              <p className="font-semibold text-white cursor-default">
                4. Thanh toán.
              </p>
            </div>
            <button className="back absolute flex justify-center items-center"
              onClick={hanleBackToHomePage}
            >
                <AiOutlineHome/>
            </button>
          </div>
        </section>
        {/*Trạng thái 0 chọn số lượng vé*/}
        {bookingStep === 0 ? step1 : null}
        {/*Trạng thái 1 chọn chỗ */}
        {bookingStep === 1 ? <BookingSeatsMap /> : null}
        {/* Trạng thái 2 chọn đồ ăn */}
        {bookingStep === 2 ? <BookingFood /> : null}
        {/* Trạng thái 3 kết thúc */}
        {bookingStep === 3 ? <BookingCompleted /> : null}
      </div>
    </PageLayout>
  );
}
export default Seats;
