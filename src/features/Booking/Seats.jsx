import PageLayout from "../../HOCs/PageLayout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataShowId } from "./thunk";
import BookingOrder from "./components/BookingOrder";
import BookingSeatsMap from "./components/BookingSeatsMap";
import { TfiHandPointRight } from "react-icons/tfi";
function Seats() {
  const param = useParams();
  const dispatch = useDispatch();
  const selectedShowData = useSelector((state) => state.booking.selectedShow);
  const bookingStep = useSelector((state) => state.booking.bookingStep);
  const [movieInfo, setMovieInfo] = useState({});
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
        <section className="steps container mx-auto ">
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
        {/*Trạng thái chọn số lượng vé*/}
        {bookingStep === 0 ? step1 : null}
        {/*Trạng thái chọn chỗ */}
        {bookingStep === 1 ? <BookingSeatsMap /> : null}
      </div>
    </PageLayout>
  );
}
export default Seats;
