import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { MdMovieFilter } from "react-icons/md";
import types from "../features/Authentication/const";
import { IoMdArrowDropdown } from "react-icons/io";
import { stringTrimmer } from "../features/Authentication/utilities/utilities";
// THIS IS SITE HEADER
function Header() {
  const headerMenu = "mx-3 nav-item";
  const navigate = useNavigate();
  const NotLogin = () => {
    return (
      <>
        <NavLink to="/Authentication/SignIn" className="auth">
          Đăng nhập
        </NavLink>
        <span className=" text-white text-sm mx-2 cursor-default">hoặc</span>
        <NavLink to="/Authentication/SignUp" className="auth">
          Đăng ký
        </NavLink>
      </>
    );
  };
  const Logged = () => {
    return (
      <div className="user flex items-center">
        <div className="avatar">
          <img src="https://picsum.photos/id/40/100" alt="avatar" />
        </div>
        <div className="user__mng ml-2 relative">
          <h3 className="user__name cursor-pointer text-sm">
            {stringTrimmer(userLogin.taiKhoan, 10)}
            <IoMdArrowDropdown className="inline ml-2 text-orange-400" />
          </h3>
          <ul className="user__action absolute">
            <li 
              onClick={()=> navigate("/Profile")}
            >Tài khoản</li>
            <li onClick={handleLogOut}>Đăng xuất</li>
          </ul>
        </div>
      </div>
    );
  };
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch({
      type: types.LOGOUT,
      payload: null,
    });
    localStorage.setItem("cyberfilmToken", "");
  };
  const userLogin = useSelector((state) => state.auth.userLogin);
  return (
    <header className="nav-bar flex items-center">
      <div className="flex justify-between items-center container mx-auto">
        <NavLink to="/">
          <h1 className="home text-red-500 font-black flex items-center">
            <MdMovieFilter className="inline-block text-5xl mr-2" />
            <span className="text-2xl">Tixket box</span>
          </h1>
        </NavLink>
        <div>
          <nav>
            <NavLink
              to="/trag lịch chiếu"
              className={(param) => {
                return param.isActive ? `${headerMenu} active` : headerMenu;
              }}
            >
              Lịch chiếu
            </NavLink>
            <NavLink
              to="/cụm rạp"
              className={(param) => {
                return param.isActive ? `${headerMenu} active` : headerMenu;
              }}
            >
              Cụm rạp
            </NavLink>
            <NavLink
              to="/tin tức"
              className={(param) => {
                return param.isActive ? `${headerMenu} active` : headerMenu;
              }}
            >
              Tin tức
            </NavLink>
            <NavLink
              to="/ứng dụng"
              className={(param) => {
                return param.isActive ? `${headerMenu} active` : headerMenu;
              }}
            >
              Ứng dụng
            </NavLink>
          </nav>
        </div>
        <div className="action">{!userLogin ? <NotLogin /> : <Logged />}</div>
      </div>
    </header>
  );
}
export default Header;
