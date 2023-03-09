// import BookingBill from "./BookingBill";
import { useDispatch, useSelector } from "react-redux";
import { getStandFor } from "../utilities/utilities";
import { movieServices } from "../../../services/movieServices";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import {types} from "../const";
import { useNavigate } from "react-router-dom";
const BookingCompleted = () => {
  const thongTinPhim = useSelector(
    (state) => state.booking.selectedShow.thongTinPhim
  );
  const checkOutInfo = useSelector(
    (state) => state.booking.cartInfo.checkOutInfo
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.auth.userLogin);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    mess: "",
    imgUrl:
      "https://png.pngtree.com/png-vector/20221107/ourmid/pngtree-pop-corn-line-art-illustration-png-image_6427458.png",
    status: 200,
  });
  const { taiKhoan, matKhau } = userLogin;
  const [totalCash, setTotalCash] = useState(0);
  useEffect(() => {
    if (!checkOutInfo.danhSachVe) {
      return;
    } else {
      let sum = checkOutInfo.danhSachVe.reduce((init, item) => {
        return (init += item.giaVe);
      }, 0);
      setTotalCash(sum);
    }
  }, [checkOutInfo]);
  const handleBooking = async () => {
    try {
      // Đăng nhập để lấy cái accessToken, không lấy trực tiếp từ localStorage
      // Lý do: sợ user hãm tài.
      const promise_1 = await movieServices.fetchAccessToken({
        taiKhoan,
        matKhau,
      });
      let accessToken = promise_1.data.content.accessToken;
      // Dùng token đã lấy được sau khi đăng nhập để book vé
      const promise_2 = await movieServices.sendCheckOutTikets(
        checkOutInfo,
        accessToken
      );
      console.log(promise_2);
      setModalContent({
        status: 200,
        title: "Đặt vé thành công",
        mess: "Chúc bạn xem phim vui vẻ",
        imgUrl:
          "https://png.pngtree.com/png-vector/20221107/ourmid/pngtree-pop-corn-line-art-illustration-png-image_6427458.png",
      });
    } catch (error) {
      setModalContent({
        status: 400,
        title: "Có lỗi xảy ra với yêu cầu của bạn",
        mess: "Click để thử lại",
        imgUrl:
          "https://image.spreadshirtmedia.net/image-server/v1/products/T1459A839PA4459PT28D150039830W10000H9847/views/1,width=550,height=550,appearanceId=839,backgroundColor=F2F2F2/400-bad-request-error-code-sticker.jpg",
      });
      console.log(error);
    }
    setModalOpen(true);
  };
  return (
    <div className="booking--done pt-20 container mx-auto">
      <div className="checkout-step flex justify-center items-start">
        <div className="img">
          <img
            className="w-44 h-60 ml-auto mr-8"
            src={thongTinPhim?.hinhAnh}
            alt={thongTinPhim?.tenPhim}
          />
        </div>
        <div className="order mt-3 text-white">
          <div className="movie">
            <h3 className="movie-name text-green-500 font-semibold text-2xl pb-1">
              {thongTinPhim?.tenPhim}
            </h3>
            <p className="theater text-slate-300">
              {getStandFor(thongTinPhim?.tenCumRap)}
            </p>
            <p className="theater--address text-slate-300 text-sm">
              {thongTinPhim?.diaChi}
            </p>
            <p className="movie--time text-slate-300 tracking-wide">
              {thongTinPhim?.gioChieu} - {thongTinPhim?.ngayChieu}
            </p>
          </div>
          <div className="order--detail font-semibold pt-8">
            <p className="detail__person">
              Người đặt:{" "}
              <span className="font-normal pl-4 text-slate-300">
                {userLogin?.hoTen}
              </span>
            </p>
            <p className="detail__phone tracking-wide">
              SĐT:{" "}
              <span className="font-normal pl-4 text-slate-300">
                {userLogin?.soDT}
              </span>
            </p>
            <p className="detail__tickets">
              Danh sách vé:{" "}
              <span className="pl-2 font-semibold text-slate-300">
                {checkOutInfo?.danhSachVe.map((item) => item.viTri).join(" - ")}
                {checkOutInfo?.danhSachVe[0] ? "." : ""}
              </span>
            </p>
            <p className="detail__cash">
              Tổng tiền:{" "}
              <span className="pl-4 text-slate-300">{totalCash}đ</span>
            </p>
          </div>
          <div className="checkout text-end">
            <button
              className="px-8 py-2 bg-red-700 font-semibold hover:bg-red-800 duration-300 rounded-sm mt-8"
              onClick={handleBooking}
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
      <Modal open={modalOpen} footer={false} closable={false} centered={true}>
        <div className="result text-center">
          <div className="img text-center">
            <h2 className="text-slate-700 uppercase text-xl">
              {modalContent.title}
            </h2>
            <img
              className="mx-auto w-36 h-36"
              src={modalContent.imgUrl}
              alt="result"
            />
            <p className="mb-3">{modalContent.mess}</p>
            <button
              className="px-4 py-2 border border-solid rounded-md font-bold hover:text-red-600 duration-300"
              onClick={() => {
                setModalOpen(false);
                dispatch({
                  type: types.GETBACK_STEP_0,
                  payload:0
                })
                navigate("/")
              }}
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </Modal>
      {/* <div className="food basis-8/12 flex flex-wrap justify-start">
        .
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
      </div> */}
    </div>
  );
};
export default BookingCompleted;
// const Test = () => {
//   const dispatch = useDispatch();
//   const handleSubmit = async ()=>{
//     try {
//       let promiseA = await promise(data);
//       let ketQua = promiseA.data.content;
//       let promiseB = await promise(ketQua);
//       console.log(promiseB);
//     } catch (error) {
//       console.log(error);
//     }
//     dispatch({
//       type: "huhu"
//     })
//   }
//   return <button onClick={handleSubmit}> click </button>
// }
