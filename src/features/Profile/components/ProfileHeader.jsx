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
        <div></div>
        <nav>
          <NavLink to="/" className="nav-item mx-3">
            Trang chủ
          </NavLink>
          <NavLink to="/Profile" className="nav-item mx-3">
            Trang cá nhân
          </NavLink>
          <NavLink to="/liên hệ" className="nav-item mx-3">
            Liên Hệ
          </NavLink>
          <NavLink to="/tin tức" className="nav-item mx-3">
            Tin Tức
          </NavLink>
        </nav>
        <p className="user-name flex items-center select-none text-white">
          {userData.hoTen || "Đang xác thực"}
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
