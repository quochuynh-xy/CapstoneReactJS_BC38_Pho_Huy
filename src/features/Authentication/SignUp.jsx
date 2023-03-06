import { useNavigate } from "react-router-dom";
import PageLayout from "../../HOCs/PageLayout";
import { MdMovieFilter } from "react-icons/md";
function SignUp() {
  const navigate = useNavigate();
  return (
    <PageLayout>
      <div className="signup__bgcover">
        <div className="signup container mx-auto flex items-center justify-center">
          <form
            action=""
            className="signup__form border border-solid border-red-400 rounded"
          >
            <div className="form__header text-center">
              <div className="text-center">
                <button className="logo"
                onClick={()=> navigate("/")}
                >
                  <MdMovieFilter className="inline-block" />
                  <span>tixket box</span>
                </button>
              </div>
              <h2 className="text-center text-xl mb-4 text-orange-600 font-bold">
                Đăng ký
              </h2>
            </div>
            <div className="form__body">
              <div>
                <label htmlFor="hoTen">Họ & tên</label>
                <br />
                <input
                  name="hoTen"
                  id="hoTen"
                  className="tracking-wider mt-1 pl-2 py-1 text-red-600 font-semibold border-yellow-700 border-2 border-solid rounded-md"
                  type="text"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="taiKhoan">Tài khoản</label>
                <br />
                <input
                  name="taiKhoan"
                  id="taiKhoan"
                  className="tracking-wider mt-1 pl-2 py-1 text-red-600 font-semibold border-yellow-700 border-2 border-solid rounded-md"
                  type="text"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="matKhau">Mật khẩu</label>
                <br />
                <input
                  className="tracking-wider mt-1 pl-2 py-1 text-red-600 font-semibold border-yellow-700 border-2 border-solid rounded-md"
                  id="matKhau"
                  name="matKhau"
                  type="password"
                  placeholder=""
                />
              </div>
              <div className="mt-2">
                <label htmlFor="email">Email</label>
                <br />
                <input
                  name="email"
                  id="email"
                  className="tracking-wider mt-1 pl-2 py-1 text-red-600 font-semibold border-yellow-700 border-2 border-solid rounded-md"
                  type="email"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="soDt">Số điện thoại</label>
                <br />
                <input
                  id="soDt"
                  name="soDt"
                  className="tracking-wider mt-1 pl-2 py-1 text-red-600 font-semibold border-yellow-700 border-2 border-solid rounded-md"
                  type="text"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="maNhom">Mã nhóm (GP01-GP10)</label>
                <br />
                <input
                  className="tracking-wider mt-1 pl-2 py-1 text-red-600 font-semibold border-yellow-700 border-2 border-solid rounded-md"
                  id="maNhom"
                  name="maNhom"
                />
              </div>
              <div className="text-end">
                <button className="signin-btn py-2 px-4 mt-4 rounded-lg text-white font-semibold">
                  Đăng ký
                </button>
              </div>
            </div>
            <div className="signup__footer mt-4">
              <p>
                Đã có tài khoản Tix?
                <span
                  className="cursor-pointer ml-2"
                  onClick={() => navigate("/Authentication/SignIn")}
                >
                  Đăng nhập
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
export default SignUp;
