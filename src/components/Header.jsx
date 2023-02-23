import { NavLink } from "react-router-dom";
// THIS IS SITE HEADER
function Header() {
  const headerMenu = "mx-3 text-orange-800";
  return (
    <header className="bg-yellow-300 ">
      <div className="flex justify-between container mx-auto py-2">
        <NavLink to="/">
          <h1 className="text-red-500 text-2xl font-black">Tixket box</h1>
        </NavLink>
        <div>
          <nav>
            <NavLink
              to="/trag lịch chíu"
              className={(param) => {
                return param.isActive ? `${headerMenu} underline` : headerMenu;
              }}
            >
              Lịch chiếu
            </NavLink>
            <NavLink
              to="/trag lịch chíu"
              className={(param) => {
                return param.isActive ? `${headerMenu} underline` : headerMenu;
              }}
            >
              Cụm rạp
            </NavLink>
            <NavLink
              to="/trag lịch chíu"
              className={(param) => {
                return param.isActive ? `${headerMenu} underline` : headerMenu;
              }}
            >
              Tin tức
            </NavLink>
            <NavLink
              to="/trag lịch chíu"
              className={(param) => {
                return param.isActive ? `${headerMenu} underline` : headerMenu;
              }}
            >
              Ứng dụng
            </NavLink>
          </nav>
        </div>
        <div>
          <NavLink
            to="/Authentication/SignIn"
            className={(params) =>
              params.isActive
                ? "mx-1 text-stone-800 italic"
                : "mx-1 text-stone-800 italic underline"
            }
          >
            Đăng nhập
          </NavLink>
          <span className=" text-orange-800 text-sm mx-2 cursor-default">hoặc</span>
          <NavLink
            to="/Authentication/SignUp"
            className={(params) =>
              params.isActive
                ? "mx-1 text-stone-800 italic"
                : "mx-1 text-stone-800 italic underline"
            }
          >
            Đăng ký
          </NavLink>
        </div>
      </div>
    </header>
  );
}
export default Header;
