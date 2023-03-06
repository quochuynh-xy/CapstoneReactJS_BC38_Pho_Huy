import { MdMovieFilter, MdKeyboardArrowRight } from "react-icons/md";
import {
  FaFacebookSquare,
  FaYoutubeSquare,
  FaTwitterSquare,
  FaInstagramSquare,
  FaAppStore,
  FaAndroid,
  FaCopyright,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
function Footer() {
  return (
    <footer className="footer">
      <div className="container mx-auto flex footer__top">
        <div className="basis-1/5 col flex flex-col items-start">
          <MdMovieFilter className="logo" />
          <h2 className="name">Tixket box</h2>
        </div>
        <div className="basis-1/5 col uppercase">
          <h3 className="relative">Giới thiệu</h3>
          <div className="col-content">
            <ul>
              <li>
                <NavLink>
                  <MdKeyboardArrowRight className="inline-block align-middle" />
                  Về chúng tôi
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <MdKeyboardArrowRight className="inline-block align-middle" />
                  Thỏa thuận sử dụng
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <MdKeyboardArrowRight className="inline-block align-middle" />
                  Cơ chế bảo mật
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <MdKeyboardArrowRight className="inline-block align-middle" />
                  Cách sử dụng
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="basis-1/5 col uppercase">
          <h3 className="relative">Hỗ trợ</h3>
          <div className="col-content">
            <ul>
              <li>
                <NavLink>
                  <MdKeyboardArrowRight className="inline-block align-middle" />
                  Góp ý
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <MdKeyboardArrowRight className="inline-block align-middle" />
                  Rạp & giá vé
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <MdKeyboardArrowRight className="inline-block align-middle" />
                  Tuyển dụng
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <MdKeyboardArrowRight className="inline-block align-middle" />
                  Dịch vụ khách hàng
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="basis-1/5 col uppercase">
          <h3 className="relative">Kết nối</h3>
          <div className="social">
            <a className="social__item" href="#url">
              <FaFacebookSquare />
            </a>
            <a className="social__item" href="#url">
              <FaYoutubeSquare />
            </a>
            <a className="social__item" href="#url">
              <FaTwitterSquare />
            </a>
            <a className="social__item" href="#url">
              <FaInstagramSquare />
            </a>
          </div>
        </div>
        <div className="basis-1/5 col uppercase">
          <h3 className="relative">Download app</h3>
          <div className="mobile-app">
            <a className="app__item" href="#url">
              <FaAppStore className="inline pr-3"/> <span>IOS</span>
            </a>
            <a className="app__item" href="#url">
              <FaAndroid className="inline pr-3"/> <span>Android</span>
            </a>
          </div>
        </div>
      </div>
      <div className="footer__bot text-center">
        <p>
          <FaCopyright className="inline-block mr-3 align-middle" />
          <span className="align-middle">
            Copyright info Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Recusandae, nam?
          </span>
        </p>
      </div>
    </footer>
  );
}
export default Footer;
