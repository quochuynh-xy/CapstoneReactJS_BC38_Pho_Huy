import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageLayout from "../../HOCs/PageLayout";
import ProfileHeader from "./components/ProfileHeader";
import "./profile.scss";
import { actionFetchUserData } from "./thunk";
import { Table, Space, Spin } from "antd";
import moment from "moment/moment";
const Profile = () => {
  const dispatch = useDispatch();
  const { userData, userBookingHistory, loginStatus } = useSelector(
    (state) => state.profile
  );

  const totalSpent = useMemo(() => {
    return userBookingHistory.reduce((init, booking) => {
      return (init += booking.giaVe * booking.danhSachGhe.length);
    }, 0);
  }, [userBookingHistory]);
  useEffect(() => {
    const token = localStorage.getItem("cyberfilmToken");
    dispatch(actionFetchUserData(token));
  }, [dispatch]);
  const columns = [
    {
      title: "STT",
      key: "STT",
      dataIndex: "stt",
    },
    {
      title: "Ngày đặt",
      key: "date",
      dataIndex: "date",
    },
    {
      title: "Thời gian",
      key: "time",
      dataIndex: "time",
    },
    {
      title: "Mã vé",
      key: "ticketNo",
      dataIndex: "ticketNo",
    },
    {
      title: "Tên Phim",
      key: "movieName",
      dataIndex: "movieName",
    },
    {
      title: "Cụm rạp",
      key: "cinemaName",
      dataIndex: "cinemaName",
    },
    {
      title: "Hóa đơn",
      key: "bill",
      dataIndex: "bill",
    },
    {
      title: "SL ghế",
      key: "seats",
      dataIndex: "seats",
    },
  ];
  return (
    <PageLayout>
      <ProfileHeader />
      {loginStatus === "success" ? (
        <div className="profile-data pt-10">
          <div className="container mx-auto flex">
            <div className="col-left basis-6/12">
              <div className="bg-slate-100 py-4 mb-4 px-4 rounded-md">
                <p>
                  Hi,{" "}
                  <span className="text-blue-700 font-semibold">
                    {userData.taiKhoan || ""}
                  </span>
                  , Từ bảng thông tin tài khoản, bạn có thể xem bản sao các hoạt
                  động của tài khoản bạn trong thời gian gần đây và cập nhật
                  thông tin tài khoản của bạn. Chọn liên kết bên dưới để xem
                  hoặc chỉnh sửa thông tin”
                </p>
              </div>
              <div className="avatar flex bg-slate-100 py-4 mb-4 px-4 rounded-md">
                <img
                  className="w-32 h-40 mr-5 rounded-sm shadow-md shadow-zinc-500"
                  src="https://picsum.photos/id/49/200/600"
                  alt="avatar"
                />
                <div className="info flex-1">
                  <p className="text-orange-400 capitalize font-mono font-semibold">
                    {userData.hoTen}
                  </p>
                  <ul>
                    <li className="flex justify-between">
                      Tổng Visit<span className="text-blue-600">119</span>
                    </li>
                    <li className="flex justify-between">
                      Số lần đặt vé
                      <span className="text-blue-600">
                        {userBookingHistory.length}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      Tổng chi tiêu
                      <span className="text-blue-600">{totalSpent}đ</span>
                    </li>
                    <li className="flex justify-between">
                      Hạng thành viên
                      <span className="text-blue-600">
                        {totalSpent > 2000000 ? "V.I.P" : "Thường"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <form className="select-none col-right h-fit basis-6/12 flex flex-wrap bg-slate-100 p-8 ml-4 rounded-md">
              <div className="basis-6/12">
                <div className="input-field mb-1">
                  <label className="text-xs tracking-wider font-semibold text-red-600">
                    Họ & tên
                  </label>
                  <br />
                  <input
                    className="border-dotted py-1 px-1 rounded-sm border border-blue-400"
                    type="text"
                    value={userData.hoTen || " "}
                    disabled
                  />
                </div>
                <div className="input-field mb-1">
                  <label className="text-xs tracking-wider font-semibold text-red-600">
                    Email
                  </label>
                  <br />
                  <input
                    className="border-dotted py-1 px-1 rounded-sm border border-blue-400"
                    type="text"
                    value={userData.email || " "}
                    disabled
                  />
                </div>
                <div className="input-field mb-1">
                  <label className="text-xs tracking-wider font-semibold text-red-600">
                    Mật khẩu
                  </label>
                  <br />
                  <input
                    type="password"
                    className="border-dotted py-1 px-1 rounded-sm border border-blue-400"
                    value="Trần Thanh Tài"
                    disabled
                  />
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Cập nhật
                  </button>
                </div>
              </div>
              <div className="basis-6/12">
                <div className="input-field mb-1">
                  <label className="text-xs tracking-wider font-semibold text-red-600">
                    Tài khoản
                  </label>
                  <br />
                  <input
                    className="border-dotted py-1 px-1 rounded-sm border border-blue-400"
                    type="text"
                    value={userData.taiKhoan || " "}
                    disabled
                  />
                </div>
                <div className="input-field mb-1">
                  <label className="text-xs tracking-wider font-semibold text-red-600">
                    Số điện thoại
                  </label>
                  <br />
                  <input
                    className="border-dotted py-1 px-1 rounded-sm border border-blue-400"
                    type="text"
                    value={userData.soDT || " "}
                    disabled
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
      {loginStatus === "success" ? (
        <div className="activities container mx-auto mb-40 bg-slate-200 rounded-md border-slate-300 border-solid border-2">
          <div className="activity">
            <Table
              columns={columns}
              dataSource={userBookingHistory.map((row, index) => {
                return {
                  key: index,
                  stt: index + 1,
                  date: moment(row.ngayDat).format("DD/MM/YYYY"),
                  time: moment(row.ngayDat).format("hh:mm a"),
                  ticketNo: row.maVe,
                  movieName: row.tenPhim,
                  bill: row.danhSachGhe.length * row.giaVe,
                  cinemaName: row.danhSachGhe[0].tenHeThongRap,
                  seats: row.danhSachGhe.length,
                };
              })}
              pagination={{
                pageSize: 10,
                defaultCurrent: 1,
                hideOnSinglePage: true,
                total: userBookingHistory.length,
                showSizeChanger: false,
                showLessItems: true,
              }}
            />
          </div>
        </div>
      ) : (
        <Space className="loading flex justify-center mt-64 items-center text-red-500">
          <Spin tip="Đang tải dữ liệu, vui lòng chờ..." size="large" />
        </Space>
      )}
      <div className="bg"></div>
    </PageLayout>
  );
};
export default Profile;
