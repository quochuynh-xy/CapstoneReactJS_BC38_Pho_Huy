import { Carousel} from "antd";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {BsChevronLeft, BsChevronRight} from "react-icons/bs";
function BookingCarousel() {
  const Target = useRef(null);
  let carouselData = useSelector((state) => state.booking.banner);
  const moreItemsToDisplay = [
    {
      "maBanner": "-3",
      "maPhim": 2826,
      "hinhAnh": "https://streamcoimg-a.akamaihd.net/000/237/8662/2378662-Banner-L2-fad61129d49a8f7e50747aa82f4e8a34.jpeg"
    },
    {
      "maBanner": "-2",
      "maPhim": 2836,
      "hinhAnh": "https://3.bp.blogspot.com/_OvryYdVtfSo/STMqB4Y-gPI/AAAAAAAADFI/cht3TZJ_XPI/w1200-h630-p-k-no-nu/Transporter_3_quad.jpg"
    },
    {
      "maBanner": "-1",
      "maPhim": 2846,
      "hinhAnh": "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/0BF28882186FCB07F83DACB3E658FDEDE7865E7165C5F94F4FF0FBD78E0D3064/scale?width=1200&aspectRatio=1.78&format=jpeg"
    }
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
