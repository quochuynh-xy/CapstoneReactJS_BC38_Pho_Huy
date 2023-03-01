const BookingBill = () => {
  return (
    <div className="border border-solid border-green-500 p-8">
      <h2>Giỏ hàng của bạn</h2>
      <p className="text-red-500 text-2xl">TÊN PHIM Ở ĐÂY</p>
      <p>
        Adult-Standar-2D:
        <span className="font-bold text-green-400 mx-2"> 01</span>
        <span className="text-orange-400">70.000đ</span>
      </p>
      <p>
        Adult-VIP-2D: <span className="font-bold text-green-400 mx-2"> 02</span>
        <span className="text-orange-400">200.000đ</span>
      </p>
      <hr />
      <p>
        TỔNG CỘNG:
        <span className="font-medium ml-3 text-orange-500"> 270.000đ</span>
      </p>
    </div>
  );
};
export default BookingBill;
