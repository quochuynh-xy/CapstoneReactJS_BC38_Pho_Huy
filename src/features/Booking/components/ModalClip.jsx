import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { types } from "../const";
const ModalClips = () => {
  const videoId = useSelector((state) => state.booking.srcTrailer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const handleCancel = () => {
    console.log("Tắt modal");
    setIsModalOpen(false);
    dispatch({
      type: types.SENDING_TRAILER_URL,
      payload: "",
    });
  };
  useEffect(() => {
    if (videoId) {
      setIsModalOpen(true);
      console.log(">>>>> Set ID", videoId);
    } else {
      setIsModalOpen(false);
      console.log("Cleared ID <<<<<<", videoId);
    }
  }, [videoId]);
  console.log("render component", videoId)
  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="modal__trailer"
        centered
        width={""}
        afterClose={handleCancel}
        mum={videoId}
      >
        <iframe
          src={videoId && `https://www.youtube.com/embed/${videoId}`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="youtube"
        ></iframe>
      </Modal>
      <div className=" fixed top-0 bg-red-600 p-5">
        <h1 className="text-green-400">Hay lắm đ!t mẹ mày {videoId && `https://www.youtube.com/embed/${videoId}`}</h1>
        <button
          className="bg-yellow-300 p-1"
          onClick={handleCancel}
        >Click</button>
      </div>
    </>
  );
};
export default ModalClips;
