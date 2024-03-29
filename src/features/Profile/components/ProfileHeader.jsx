import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiLogIn } from "react-icons/bi";
import AuthenTypes from "../../Authentication/const";
const ProfileHeader = () => {
  const { userData } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  return (
    <header className="header">
      <div className="container mx-auto flex items-center justify-between py-4">
        <nav>
          <NavLink to="/" className="nav-item mx-3">
            Trang chủ
          </NavLink>
          <NavLink to="/Profile" className="nav-item mx-3">
            Trang cá nhân
          </NavLink>
          {userData?.maLoaiNguoiDung !== "KhachHang" ?<NavLink to="/Admin" className="nav-item mx-3">
            Quản lý
          </NavLink> : null}
        </nav>
        <p className="user-name flex items-center select-none text-white">
          {userData.taiKhoan || "Đang xác thực"}
          <button
            className="lg-out-btn px-2 text-blue-200 duration-300 relative hover:text-orange-400"
            onClick={() =>
              dispatch({
                type: AuthenTypes.LOGOUT,
                payload: null,
              })
            }
          >
            <BiLogIn />
          </button>
        </p>
      </div>
    </header>
  );
};
export default ProfileHeader;
