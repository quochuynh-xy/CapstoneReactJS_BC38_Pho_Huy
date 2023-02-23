import { Carousel} from "antd";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {BsChevronLeft, BsChevronRight} from "react-icons/bs";
function BookingCarousel() {
  const Target = useRef(null);
  const carouselData = useSelector((state) => state.booking.banner);
  const mapCarousel = carouselData.map((item) => {
    return (
      <div className="h-100" key={item.maBanner}>
        <img src={item.hinhAnh} alt="900" className="w-full object-cover h-100" />
        <span className="text-6xl backArrow" onClick={()=>Target.current.next()}><BsChevronLeft/></span>
        <span className="text-6xl nextArrow" onClick={()=>Target.current.next()}><BsChevronRight/></span>
      </div>
    );
  });
  return (
    <Carousel effect="fade" className="mx-auto container booking__carousel" autoplay={false} draggable ref={Target}>
      {mapCarousel}
    </Carousel>
  );
}
export default BookingCarousel;
