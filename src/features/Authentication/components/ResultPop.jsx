import { Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import types from "../const";
const ResultPop = (props) => {
  const { requestCode, title } = props;
  const modalPopUpStatus = useSelector(state => state.auth.modalPopUpStatus)
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const successImage =
    "https://t4.ftcdn.net/jpg/04/50/48/81/360_F_450488163_mSAKsfAWgmlzePsyGEuDtoRhKBz7W1ku.jpg";
  const errorImage =
    "https://t4.ftcdn.net/jpg/04/37/65/95/360_F_437659599_4CCVndUWyvCdVskW9SnBvlnY8Sg7ZMvT.jpg";
  const directToSignIn = () => {
    dispatch({type: types.SHOW_MODAL, payload:false})
    if (requestCode === 200) {
      navigate("/Authentication/SignIn");
    } else {
      return;
    }
  };
  useEffect(()=> {
    setModalOpen(modalPopUpStatus)
  }, [modalPopUpStatus])
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
            src={requestCode === 200 ? successImage : errorImage}
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
