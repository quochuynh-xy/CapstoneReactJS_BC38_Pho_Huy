import { Modal } from "antd";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { types } from "../const";

const ModalClips = () => {
  const videoId = useSelector((state) => state.booking.srcTrailer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch({
      type: types.SENDING_TRAILER_URL,
      payload: "",
    });
    if (videoRef.current) {
      videoRef.current = "";
    }
  };
  useEffect(() => {
    if (videoId) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [videoId]);
  return (
      <Modal
        key={videoId}
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
  );
};

export default ModalClips;
