import { Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import types from "../const";
import successImg from "../../../app/assets/img/images/success.jpg";
import errorImg from "../../../app/assets/img/images/error.jpg";
const ResultPop = (props) => {
  const { requestCode, title } = props;
  const modalPopUpStatus = useSelector((state) => state.auth.modalPopUpStatus);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const directToSignIn = () => {
    dispatch({ type: types.SHOW_MODAL, payload: false });
    if (requestCode === 200) {
      navigate("/Authentication/SignIn");
    } else {
      return;
    }
  };
  useEffect(() => {
    setModalOpen(modalPopUpStatus);
  }, [modalPopUpStatus]);
  return (
    <Modal
      centered
      open={modalOpen}
      footer={null}
      closable={false}
      afterClose={directToSignIn}
    >
      <div className="modal__content text-center realative">
        <h2 className="title text-red-500 text-lg pt-8 font-semibold">
          {title}
        </h2>
        <p className="text-center">
          <img
            className="h-64 mx-auto block"
            src={requestCode === 200 ? successImg : errorImg}
            alt="img"
          />
        </p>
        <button
          className="px-8 py-2 rounded border border-solid border-red-500 text-white font-bold bg-red-600 tracking-widest hover:bg-slate-50 hover:text-red-500 transition-all duration-300"
          onClick={() => {
            setModalOpen(false);
          }}
        >
          OK
        </button>
      </div>
    </Modal>
  );
};
export default ResultPop;
