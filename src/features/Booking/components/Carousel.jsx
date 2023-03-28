import { Carousel} from "antd";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {BsChevronLeft, BsChevronRight} from "react-icons/bs";
import bannerPlus1 from "../../../app/assets/img/images/banner1.jpg"
import bannerPlus2 from "../../../app/assets/img/images/banner2.jpg"
import bannerPlus3 from "../../../app/assets/img/images/banner3.jpg"
function BookingCarousel() {
  const Target = useRef(null);
  let carouselData = useSelector((state) => state.booking.banner);
  const moreItemsToDisplay = [
    {
      "maBanner": "-1",
      "maPhim": 2846,
      "hinhAnh": bannerPlus3
    },
    {
      "maBanner": "-3",
      "maPhim": 2826,
      "hinhAnh": bannerPlus1
    },
    {
      "maBanner": "-2",
      "maPhim": 2836,
      "hinhAnh": bannerPlus2
    },
  ];
  if (carouselData.length < 4) {
    carouselData = moreItemsToDisplay.concat(carouselData);
  }
  const mapCarousel = carouselData.map((item) => {
    return (
      <div className="h-100 carousel-item" key={item.maBanner}>
        <img src={item.hinhAnh} alt="900" className="w-full object-cover h-100" />
        <span className="text-6xl backArrow" onClick={()=>Target.current.prev()}><BsChevronLeft/></span>
        <span className="text-6xl nextArrow" onClick={()=>Target.current.next()}><BsChevronRight/></span>
      </div>
    );
  });
  return (
    <Carousel autoplaySpeed={4000} effect="fade" className="mx-auto container booking__carousel" autoplay={true} draggable ref={Target}>
      {mapCarousel}
    </Carousel>
  );
}
export default BookingCarousel;
