import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./thunk";
import PageLayout from "../../HOCs/PageLayout";
import { useNavigate } from "react-router-dom";
import { MdMovieFilter } from "react-icons/md";
function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.userLogin);
  const [loginInfo, setLoginInfo] = useState({ taiKhoan: "", matKhau: "" });
  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginAction(loginInfo)); // gửi thông tin đăng nhập
    setLoginInfo({ taiKhoan: "", matKhau: "" }); // clear form
    navigate("/"); // chuyển về trang chủ
  };
  useEffect(() => {
    !isLogin ? navigate("/Authentication/SignIn") : navigate("/");
  }, [isLogin, navigate]);
  return (
    <PageLayout>
      <div className="signInPage">
        <div className="login container mx-auto flex items-center justify-center">
          <form
            action=""
            className="login__form border border-solid border-red-400 rounded"
          >
            <div className="form__header text-center">
              <div className="text-center">
                <button className="logo" onClick={() => navigate("/")}>
                  <MdMovieFilter className="inline-block" />
                  <span>tixket box</span>
                </button>
              </div>
              <h2 className="text-center text-xl mb-4 text-orange-600 font-bold">
                Đăng nhập
              </h2>
            </div>
            <div className="form__body">
              <div>
                <label htmlFor="userid">Tài khoản</label>
                <br />
                <input
                  className="tracking-wider mt-1 pl-2 py-1 text-red-600 font-semibold border-yellow-700 border-2 border-solid rounded-md"
                  id="userid"
                  type="text"
                  placeholder="Tài khoản"
                  name="taiKhoan"
                  onChange={handleChange}
                  value={loginInfo.taiKhoan}
                />
              </div>
              <div className="mt-2">
                <label htmlFor="password">Mật khẩu</label>
                <br />
                <input
                  className="tracking-wider mt-1 pl-2 py-1 text-red-600 font-semibold border-yellow-700 border-2 border-solid rounded-md"
                  id="password"
                  type="password"
                  placeholder="Mật khẩu"
                  name="matKhau"
                  onChange={handleChange}
                  value={loginInfo.matKhau}
                />
              </div>
              <div className="text-end">
                <button
                  className="signin-btn py-2 px-4 mt-4 rounded-lg text-white font-semibold"
                  onClick={handleSubmit}
                >
                  Đăng Nhập
                </button>
              </div>
            </div>
            <div className="login__footer mt-4">
              <p>
                Chưa có tài khoản Tix?
                <span
                  className="cursor-pointer ml-1"
                  onClick={() => navigate("/Authentication/SignUp")}
                >
                  Đăng ký ngay
                </span>
              </p>
            </div>
          </form>
        </div>
        <div className="login__bgcover"></div>
      </div>
    </PageLayout>
  );
}
export default SignIn;
