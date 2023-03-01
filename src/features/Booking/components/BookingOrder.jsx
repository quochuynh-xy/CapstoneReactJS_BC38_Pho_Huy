import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import { types } from "../const";
const BookingOrder = () => {
  // Danh sách ghế của rạp
  const seatList = useSelector(
    (state) => state.booking.selectedShow.danhSachGhe
  );
  const dispatch = useDispatch();
  // Danh sách ghế order
  const [orderList, setOrderList] = useState({
    countCommon: 0,
    countVip: 0,
  });
  const [commonPrice, setCommonPrice] = useState(0);
  const [vipPrice, setVipPrice] = useState(0);
  const [conditionOrder, setConditionOrder] = useState({
    isClickAble: true,
    message: "",
  });
  useEffect(() => {
    if (!seatList?.length) return;
    setCommonPrice(seatList?.find((seat) => seat.loaiGhe === "Thuong").giaVe);
    setVipPrice(seatList?.find((seat) => seat.loaiGhe === "Vip").giaVe);
  }, [seatList]);
  useLayoutEffect(() => {
    let total = orderList.countCommon + orderList.countVip;
    if (total > 10) {
      setConditionOrder({
        isClickAble: false,
        message: "Số lượng vé tối đa có thể đặt một lần là 10 vé",
      });
    }
    if (total === 0) {
      setConditionOrder({
        isClickAble: false,
        message: "",
      });
    }
    if (total > 0 && total <= 10) {
      setConditionOrder({
        isClickAble: true,
        message: "",
      });
    }
    if (orderList.countCommon < 0) {
      setOrderList({
        ...orderList,
        countCommon: 0,
      });
    }
    if (orderList.countVip < 0) {
      setOrderList({
        ...orderList,
        countVip: 0,
      });
    }
  }, [orderList]);
  const handleChangeQuantity = (type, action) => {
    switch (type) {
      case "VIP": {
        if (action === "+") {
          setOrderList({ ...orderList, countVip: orderList.countVip + 1 });
        } else {
          setOrderList({ ...orderList, countVip: orderList.countVip - 1 });
        }
        break;
      }
      case "common": {
        if (action === "+") {
          setOrderList({
            ...orderList,
            countCommon: orderList.countCommon + 1,
          });
        } else {
          setOrderList({
            ...orderList,
            countCommon: orderList.countCommon - 1,
          });
        }
        break;
      }
      default:
        break;
    }
  };
  const handleInputQuantity = (type, value) => {
    switch (type) {
      case "VIP": {
        setOrderList({
          ...orderList,
          countVip: value,
        });
        break;
      }
      case "common": {
        setOrderList({
          ...orderList,
          countCommon: value,
        });
        break;
      }
      default:
        break;
    }
  };
  const handleStartSelectSeats = () => {
    let total = orderList.countCommon + orderList.countVip;
    if (total > 10 || total <= 0) return;
    dispatch({
      type: types.SET_BOOKING_STEP,
      payload: 1,
    });
    dispatch({
      type: types.START_SELECT_SEATS,
      payload: orderList,
    });
  };
  return (
    <div className="table__order">
      <table className="bg-slate-100 p-2">
        <thead className="text-center">
          <tr>
            <td>Loại vé</td>
            <td>Giá vé</td>
            <td>Số lượng</td>
            <td>Tổng tiền</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="font-semibold text-slate-700">Adult-Stand-2D</td>
            <td>{commonPrice} đ</td>
            <td className="flex items-center">
              <FaMinus
                className="btn--minus font-bold cursor-pointer"
                onClick={() => handleChangeQuantity("common", "-")}
              />
              <input
                className="w-16 text-center"
                type="number"
                min="0"
                value={orderList.countCommon}
                onChange={(e) => handleInputQuantity("common", +e.target.value)}
              />
              <FaPlus
                className="btn--plus font-bold cursor-pointer"
                onClick={() => handleChangeQuantity("common", "+")}
              />
            </td>
            <td className="tracking-wide text-slate-700 text-end">
              {orderList.countCommon * commonPrice} đ
            </td>
          </tr>
          <tr>
            <td className="font-semibold text-orange-500">Adult-VIP-2D</td>
            <td>{vipPrice} đ</td>
            <td className="flex items-center">
              <FaMinus
                className="btn--minus font-bold cursor-pointer"
                onClick={() => handleChangeQuantity("VIP", "-")}
              />
              <input
                className="w-16 text-center"
                type="number"
                min="0"
                value={orderList.countVip}
                onChange={(e) => handleInputQuantity("VIP", +e.target.value)}
              />
              <FaPlus
                className="btn--plus font-bold cursor-pointer"
                onClick={() => handleChangeQuantity("VIP", "+")}
              />
            </td>
            <td className="tracking-wide text-orange-500 text-end">
              {orderList.countVip * vipPrice} đ
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="font-semibold text-2xl">
              Tổng:
            </td>
            <td
              colSpan={2}
              className="tracking-wide font-semibold text-2xl text-end"
            >
              {orderList.countVip * vipPrice +
                orderList.countCommon * commonPrice}{" "}
              đ
            </td>
          </tr>
          <tr>
            <td colSpan={4} className="text-end">
              <button
                className={
                  conditionOrder.isClickAble
                    ? "bg-red-600 rounded-md px-6 py-2 text-white ml-auto"
                    : "bg-slate-600 rounded-md px-6 py-2 text-white ml-auto"
                }
                onClick={handleStartSelectSeats}
              >
                Chọn ghế
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="text-end">
        <h3 className="h-8 mt-2 ml-3 errmessage text-start">
          {conditionOrder.message}
        </h3>
      </div>
    </div>
  );
};
export default BookingOrder;
