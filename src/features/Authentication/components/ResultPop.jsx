import { Modal } from 'antd';
import { useState } from 'react';
import { MdMovieFilter } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const ResultPop = () => {
    const [modalOpen, setModalOpen] = useState(true);
    const navigate = useNavigate();
    const handleDirectToSignIn = () => {
        navigate("/Authentication/SignIn")
    }
    const messengerSuccess = "Chúc mừng bạn đã đăng ký thành công.";
    const messengerError = "Có lỗi xảy ra, vui lòng thử lại";
    useEffect(()=>{
        // navigate("/Authentication/SignIn")
    }, [modalOpen])
    return (
        <Modal
          centered
          open={modalOpen}
          onOk={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
          footer={null}
          closable={false}
          afterClose={handleDirectToSignIn}
        >
          <div className="modal__content text-center">
            <h2 className='title text-green-700 text-lg font-semibold'>{messengerSuccess}</h2>
            <p className='text-center'><img className='w-64 py-8 mx-auto block' src="https://media.istockphoto.com/id/1368531657/vector/congratulations-colorful-typography-banner.jpg?s=612x612&w=0&k=20&c=wLDsEtMDLracjmXSWOownzagyurdZH-lXlNLmZXWsVM=" alt="img" /></p>
            <button
                className='px-3 py-2 rounded border border-solid border-red-500 text-red-600 font-medium'
                onClick={()=> {
                    setModalOpen(false)
                }}
            >Đăng nhập ngay</button>
          </div>
        </Modal>
    );
};
export default ResultPop;
