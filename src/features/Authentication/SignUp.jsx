import { useNavigate } from "react-router-dom";
import PageLayout from "../../HOCs/PageLayout";
import { MdMovieFilter } from "react-icons/md";
import { useReducer, useState } from "react";
import { Dropdown, Space } from "antd";
function SignUp() {
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState({
    taiKhoan: "",
    matKhau: "_",
    email: "",
    soDt: "",
    maNhom: "",
    hoTen: "",
  });
  const listGroups = [
    "GP01",
    "GP02",
    "GP03",
    "GP04",
    "GP05",
    "GP06",
    "GP07",
    "GP08",
    "GP09",
    "GP10",
  ];
  const formReducer = (state, element) => {
    let { name: type, value: payload } = element;
    const regexTaiKhoan = /^[a-zA-Z0-9._]+$/;
    const regexMatKhau =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regexPhone = /^[0-9]{10}$/;
    const regexHoTen =
      /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/;
    const lengthCheck = (text, minLength, maxLength) => {
      if (text.length >= minLength && text.length <= maxLength) {
        return true;
      } else {
        return false;
      }
    };
    const pattenCheck = (text, patten) => {
      if (patten.test(text)) {
        return true;
      } else {
        return false;
      }
    };
    const requiredCheck = (text) => {
      if (!text) {
        return false;
      } else {
        return true;
      }
    };
    let messenger = "";
    switch (type) {
      case "taiKhoan": {
        // Từ 6 đến 12 ký tự
        // Không được để trống
        // Chỉ chứa chữ và số
        if (!lengthCheck(payload, 6, 12)) {
          messenger = "*Từ 6 đến 12 ký tự.";
        }
        if (!pattenCheck(payload, regexTaiKhoan)) {
          messenger = "*Tên tài khoản không hợp lệ.";
        }
        if (!requiredCheck(payload)) {
          messenger = "*Không được để trống.";
        }
        state = { ...state, [type]: messenger };
        return state;
      }
      case "matKhau": {
        // từ 8 đến 20 ký tự
        // Không được để trống
        // Chữ thường chữ hoa ký tự đặc biệt
        if (!lengthCheck(payload, 8, 20)) {
          messenger = "*Từ 8 đến 20 ký tự.";
        }
        if (!pattenCheck(payload, regexMatKhau)) {
          messenger = "*Bao gồm chữ in hoa, số và ký tự đặc biệt.";
        }
        if (!requiredCheck(payload)) {
          messenger = "*Không được để trống.";
        }
        state = { ...state, [type]: messenger };
        return state;
      }
      case "email": {
        // Không được để trống
        // Đúng định dạng
        if (!pattenCheck(payload, regexEmail)) {
          messenger = "*Email sai định dạng.";
        }
        if (!requiredCheck(payload)) {
          messenger = "*Không được để trống.";
        }
        state = { ...state, [type]: messenger };
        return state;
      }
      case "soDt": {
        // Không được để trống
        // Đúng định dạng số điện thoại
        if (!pattenCheck(payload, regexPhone)) {
          messenger = "*Gồm 10 chữ số.";
        }
        if (!requiredCheck(payload)) {
          messenger = "*Không được để trống.";
        }
        state = { ...state, [type]: messenger };
        return state;
      }
      case "maNhom": {
        // Không được để trống
        // Đúng mã nhóm
        if (!requiredCheck(payload)) {
          messenger = "*Không được để trống.";
        }
        if (!listGroups.find((name) => name === payload)) {
          messenger = "*Nhóm không hợp lệ.";
        }
        state = { ...state, [type]: messenger };
        return state;
      }
      case "hoTen": {
        // Không được để trống
        // Đúng định dạng, không chứa số
        if (!pattenCheck(payload, regexHoTen)) {
          messenger = "*Họ tên không hợp lệ.";
        }
        if (!requiredCheck(payload)) {
          messenger = "*Không được để trống.";
        }
        state = { ...state, [type]: messenger };
        return state;
      }
      default:
        return state;
    }
  };
  const [errorMessenger, dispatchInput] = useReducer(formReducer, {
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "",
    hoTen: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterInfo({
      ...registerInfo,
      [name]: value,
    });
  };
  const handleSelectGroup = (e) => {
    setRegisterInfo({
      ...registerInfo,
      maNhom: e.key,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let acceptSentData = true;
    for (let key in errorMessenger) {
      if (errorMessenger[key]) {
        acceptSentData = false;
      }
    }
    for (let key in registerInfo) {
      if (!registerInfo[key]) {
        acceptSentData = false;
        dispatchInput({
          name: key,
          value: "",
        });
      }
    }
    console.log(acceptSentData);
  };
  return (
    <PageLayout>
      <div className="signUpPage">
        <div className="signup container mx-auto flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            id="signInForm"
            action=""
            className="signup__form border border-solid border-red-400 rounded"
          >
            <div className="form__header text-center">
              <div className="text-center">
                <button className="logo" onClick={() => navigate("/")}>
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
                <span className="input-error ml-2 text-xs">
                  {errorMessenger.hoTen}
                </span>
                <br />
                <input
                  name="hoTen"
                  id="hoTen"
                  className="tracking-wider mt-1 pl-2 py-1 text-zinc-900 font-semibold border-yellow-700 border-2 border-solid rounded-md"
                  type="text"
                  value={registerInfo.hoTen}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => dispatchInput(e.target)}
                />
              </div>
              <div className="mt-2">
                <label htmlFor="taiKhoan">Tài khoản</label>
                <span className="input-error ml-2 text-xs">
                  {errorMessenger.taiKhoan}
                </span>
                <br />
                <input
                  name="taiKhoan"
                  id="taiKhoan"
                  className="tracking-wider mt-1 pl-2 py-1 text-zinc-900 font-semibold border-yellow-700 border-2 border-solid rounded-md"
                  type="text"
                  value={registerInfo.taiKhoan}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => dispatchInput(e.target)}
                />
              </div>
              <div className="mt-2">
                <label htmlFor="matKhau">Mật khẩu</label>
                <span className="input-error ml-2 text-xs">
                  {errorMessenger.matKhau}
                </span>
                <br />
                <input
                  className="tracking-wider mt-1 pl-2 py-1 text-zinc-900 font-semibold border-yellow-700 border-2 border-solid rounded-md"
                  id="matKhau"
                  name="matKhau"
                  type="password"
                  value={registerInfo.matKhau}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => dispatchInput(e.target)}
                />
              </div>
              <div className="mt-2">
                <label htmlFor="email">Email</label>
                <span className="input-error ml-2 text-xs">
                  {errorMessenger.email}
                </span>
                <br />
                <input
                  name="email"
                  id="email"
                  className="tracking-wider mt-1 pl-2 py-1 text-zinc-900 font-semibold border-yellow-700 border-2 border-solid rounded-md"
                  type="email"
                  value={registerInfo.email}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => dispatchInput(e.target)}
                  autoComplete="false"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="soDt">Số điện thoại</label>
                <span className="input-error ml-2 text-xs">
                  {errorMessenger.soDt}
                </span>
                <br />
                <input
                  id="soDt"
                  name="soDt"
                  className="tracking-wider mt-1 pl-2 py-1 text-zinc-900 font-semibold border-yellow-700 border-2 border-solid rounded-md"
                  type="text"
                  value={registerInfo.soDt}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => dispatchInput(e.target)}
                />
              </div>
              <div className="mt-2">
                <label htmlFor="maNhom">Mã nhóm</label>
                <span className="input-error ml-2 text-xs">
                  {errorMessenger.maNhom}
                </span>
                <br />
                <Dropdown
                  menu={{
                    items: listGroups.map((item) => {
                      return {
                        label: <p>{item}</p>,
                        key: item,
                      };
                    }),
                    onClick: handleSelectGroup,
                  }}
                  trigger={["click"]}
                  autoFocus={false}
                >
                  <input
                    type="text"
                    className="tracking-wider mt-1 cursor-pointer pl-2 py-1 text-zinc-900 font-semibold border-yellow-700 border-2 border-solid rounded-md"
                    placeholder="Chọn nhóm"
                    name="maNhom"
                    value={registerInfo.maNhom}
                    onChange={(e) => {
                      handleChange(e);
                      dispatchInput(e.target);
                    }}
                  />
                </Dropdown>
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
        <div className="signup__bgcover"></div>
      </div>
    </PageLayout>
  );
}
export default SignUp;
