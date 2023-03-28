import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingBill from "./BookingBill";
import { BsFillPersonFill } from "react-icons/bs";
import { types } from "../const";
// Đang dính bug khi chưa load xong dữ liệu mà nhấn ngay tới bước này thì sinh lỗi.
// Bug tự nhảy đến trang chọn ghế mà chưa qua trang chọn số lượng vé
const BookingSeatsMap = () => {
  // Lấy danh sách ghế và mã lịch chiếu của phim
  const listOfseats = useSelector(
    (state) => state.booking.selectedShow?.danhSachGhe
  );
  const maLichChieu = useSelector(
    (state) => state.booking.selectedShow?.thongTinPhim?.maLichChieu
  );
  // Lấy thông tin đặt ghế của khách hàng
  const { orderInfo } = useSelector((state) => state.booking.cartInfo);
  let { countCommon, countVip } = orderInfo;
  // Mảng chứa những ghế đang chọn
  const [danhSachGhe, setDanhSachGhe] = useState([]);
  // Sơ đồ ghế ngồi
  const [seatingChart, setSeatingChart] = useState([]);
  const dispatch = useDispatch();
  const CommonSeat = (props) => (
    <button
      className={`common seat ${props?.className ? props.className : ""}`}
      onClick={() => {
        handleSelect(props.data);
      }}
    >
      {props.data?.soGhe}
    </button>
  );
  const VipSeat = (props) => (
    <button
      className={`vip seat ${props?.className ? props.className : ""}`}
      onClick={() => {
        handleSelect(props.data);
      }}
    >
      {props.data?.soGhe}
    </button>
  );
  const TakenSeat = (props) => (
    <button className="taken seat cursor-not-allowed text-center">
      <BsFillPersonFill className="mx-auto" />
    </button>
  );
  const splitRow = (totalSeat, quantity = 16) => {
    if (!totalSeat) return;
    let character = "ABCDEFGHIJKLMNOP".split("");
    let resut = [];
    let rowName = 0;
    for (let i = 0; i < totalSeat.length; i += quantity) {
      let item = {
        rowIndex: character[rowName],
        row: totalSeat.slice(i, i + quantity),
      };
      let x = character[rowName];
      item.row = item.row.map((slot, index) => {
        return {
          ...slot,
          soGhe: index + 1,
          viTri: `${x}${index + 1}`,
        };
      });
      rowName++;
      resut.push(item);
    }
    return resut;
  };
  const handleSelect = (slot) => {
    const {maGhe} = slot;
    let cloneDanhSachGhe = [...danhSachGhe];
    let index = cloneDanhSachGhe.findIndex((item) => item.maGhe === maGhe);
    if (index !== -1) {
      cloneDanhSachGhe.splice(index, 1);
    } else {
      cloneDanhSachGhe.push(slot);
    }
    const selectedCommon = cloneDanhSachGhe.reduce((init, item) => {
      if (item.loaiGhe === "Thuong") {
        return (init += 1);
      }
      return init;
    }, 0);
    const selectedVip = cloneDanhSachGhe.reduce((init, item) => {
      if (item.loaiGhe === "Vip") {
        return (init += 1);
      }
      return init;
    }, 0);
    if (selectedVip > countVip) {
      let index = cloneDanhSachGhe.findIndex((item) => item.loaiGhe === "Vip");
      cloneDanhSachGhe.splice(index, 1);
    }
    if (selectedCommon > countCommon) {
      let index = cloneDanhSachGhe.findIndex(
        (item) => item.loaiGhe === "Thuong"
      );
      cloneDanhSachGhe.splice(index, 1);
    }
    dispatch({
      type: types.SELECTING_SEATS,
      payload: {
        maLichChieu: maLichChieu,
        danhSachVe: cloneDanhSachGhe,
      },
    });
    setDanhSachGhe(cloneDanhSachGhe);
  };
  useEffect(() => {
    if (!listOfseats) return;
    setSeatingChart(splitRow(listOfseats, 16));
  }, [listOfseats, maLichChieu]);
  // Hiện tại dữ liệu trả về không có sơ đồ bố trí nên mặc định sẽ có 16 ghế/hàng
  return (
    <section className="seatandbill pt-20 flex flex-wrap justify-between items-center container mx-auto">
      <div className="seatsMap basis-full lg:basis-8/12">
        <p className="text-white mb-6 indent-1">
          Quý khách vui lòng chọn ghế trong theo sơ đồ phía dưới. Nếu bạn muốn
          chọn loại ghế khác hoặc thay đổi số lượng vé muốn mua, vui lòng nhấn
          vào
          <span className="text-green-500 font-semibold">
            {" "}
            "Bước 1: chọn vé"{" "}
          </span>
          ở thanh công cụ bên trên để quay về màn hình chọn.
        </p>
        <div className="screen text-center">
          <p className="font-semibold text-white">MÀN HÌNH</p>
        </div>
        <div className="seats">
          {seatingChart.length &&
            seatingChart.map((singleRow) => {
              return (
                <div
                  key={singleRow.rowIndex}
                  className="flex justify-around items-center"
                >
                  <span className="text-white row-index">
                    {singleRow.rowIndex}
                  </span>
                  {singleRow.row.map((seat) => {
                    if (seat.loaiGhe === "Thuong") {
                      if (seat.daDat) {
                        return <TakenSeat data={seat} key={seat.maGhe} />;
                      } else {
                        return (
                          <CommonSeat
                            rowIndex={singleRow.rowIndex}
                            data={seat}
                            key={seat.maGhe}
                            className={
                              danhSachGhe.find(
                                (item) => item.maGhe === seat.maGhe
                              )
                                ? "selecting"
                                : ""
                            }
                          />
                        );
                      }
                    } else {
                      if (seat.daDat) {
                        return <TakenSeat data={seat} key={seat.maGhe} />;
                      } else {
                        return (
                          <VipSeat
                            rowIndex={singleRow.rowIndex}
                            data={seat}
                            key={seat.maGhe}
                            className={
                              danhSachGhe.find(
                                (item) => item.maGhe === seat.maGhe
                              )
                                ? "selecting"
                                : ""
                            }
                          />
                        );
                      }
                    }
                  })}
                </div>
              );
            })}
          <div className="note flex mt-3 flex-wrap pb-6 h-fit">
            <div className="basis-6/12 pl-4 lg:basis-3/12 flex items-center">
              <span className="common"></span>
              <p className="text-white ml-4">: Ghế thường.</p>
            </div>
            <div className="basis-6/12 pl-4 lg:basis-3/12 flex items-center">
              <span className="vip"></span>
              <p className="text-white ml-4">: Ghế VIP.</p>
            </div>
            <div className="basis-6/12 pl-4 lg:basis-3/12 flex items-center">
              <span className="taken flex items-center">
                <BsFillPersonFill className="mx-auto" />
              </span>
              <p className="text-white ml-4">: Ghế đã đặt.</p>
            </div>
            <div className="basis-6/12 pl-4 lg:basis-3/12 flex items-center">
              <span className="pending"></span>
              <p className="text-white ml-4">: Ghế đang chọn.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="basis-full px-12 lg:basis-3/12 lg:px-0">
        <BookingBill />
        <div className="text-end next-step">
          <button
            className={countCommon + countVip === danhSachGhe?.length ? "btn-next bg-red-700 hover:bg-red-800 duration-300 w-full py-4 rounded-b-sm text-white": "btn-next bg-slate-600 rounded-b-sm w-full py-4 text-white"}
            onClick={() => {
              let selected = danhSachGhe.length;
              if (countCommon + countVip !== selected) {
                return;
              } else {
                dispatch({
                  type: types.SET_BOOKING_STEP,
                  payload: 2,
                });
              }
            }}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </section>
  );
};
export default BookingSeatsMap;