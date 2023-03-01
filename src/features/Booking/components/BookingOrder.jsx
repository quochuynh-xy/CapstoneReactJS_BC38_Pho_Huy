const BookingOrder = () => {
  return <div className="">
    <table className="rounded-sm">
      <thead>
        <tr>
          <td>Loại vé</td>
          <td>Giá vé</td>
          <td>Số lượng</td>
          <td>Tổng tiền</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            Adult-Stand-2D
          </td>
          <td>
            70.000,00
          </td>
          <td>
            <button className="font-bold text-3xl p-1 text-blue-500">-</button>
            <input className="w-8 border border-green-200 border-solid rounded-md mx-3" type="text"/>
            <button className="font-bold text-3xl p-1 text-green-500">+</button>
          </td>
          <td>
            70.000,00đ
          </td>
        </tr>
        <tr>
          <td>
            Adult-VIP-2D
          </td>
          <td>
            100.000,00
          </td>
          <td>
            <button className="font-bold text-3xl p-1 text-blue-500">-</button>
            <input className="w-8 border border-green-200 border-solid rounded-md mx-3" type="text"/>
            <button className="font-bold text-3xl p-1 text-green-500">+</button>
          </td>
          <td>
            100.000,00đ
          </td>
        </tr>
      </tbody>
    </table>
    <button className="bg-red-600 rounded-md px-4 py-2 text-white">Chọn ghế</button>
  </div>;
};
export default BookingOrder;
