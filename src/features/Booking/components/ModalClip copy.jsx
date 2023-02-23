import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { types } from "../const";
const ModalClips = () => {
  const videoId = useSelector((state) => state.booking.srcTrailer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [src, setSrc] = useState("")
  const dispatch = useDispatch();
  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch({
      type: types.SENDING_TRAILER_URL,
      payload: "",
    });
  };
  useEffect(() => {
    if (videoId) {
      setIsModalOpen(true);
      setSrc(`https://www.youtube.com/embed/${videoId}`);
    } else {
      setIsModalOpen(false);
      setSrc("");
    }
    console.log("Giá trị id", videoId);
  }, [videoId]);
  console.log("render component");
  return (
    <>
      <Modal
        // key={src}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="modal__trailer"
        centered
        width={""}
        afterClose={handleCancel}
      >
        <iframe
        src={src}
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="youtube"
      ></iframe>
      </Modal>
    </>
  );
};
export default ModalClips;
