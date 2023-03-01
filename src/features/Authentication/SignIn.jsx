import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./thunk";
import PageLayout from "../../HOCs/PageLayout";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector( state => state.auth.userLogin);
  const [loginInfo, setLoginInfo] = useState({ taiKhoan: "", matKhau: "" });
  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction(loginInfo)); // gửi thông tin đăng nhập
    setLoginInfo({taiKhoan: "", matKhau: "" }) // clear form
    navigate("/") // chuyển về trang chủ
  };
  useEffect(()=> {
    !isLogin? navigate("/Authentication/SignIn") : navigate("/")
  },[isLogin, navigate])
  return (
    <PageLayout>
      <Header/>
      <div className="login container mx-auto mt-10 flex items-center justify-center">
        <form action="">
          <h2 className="text-center text-3xl mb-4 text-orange-600 font-bold">
            Đăng nhập
          </h2>
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
              placeholder="Tài khoản"
              name="matKhau"
              onChange={handleChange}
              value={loginInfo.matKhau}
            />
          </div>
          <div className="text-end">
            <button
              className="mr-2 py-2 px-4 bg-red-500 mt-4 rounded-lg text-white font-semibold"
              onClick={handleSubmit}
            >
              Đăng Nhập
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}
export default SignIn;
