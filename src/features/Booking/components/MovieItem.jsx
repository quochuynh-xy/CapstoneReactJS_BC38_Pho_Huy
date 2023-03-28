import { Card } from "antd";
import { types } from "../const";
import { BsStarFill, BsStarHalf, BsStar, BsPlayCircle } from "react-icons/bs";
import { showRating } from "../utilities/utilities";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { stringTrimmer } from "../utilities/utilities";
function MovieItem(props) {
  const item = props.item;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="basis-full px-28 sm:basis-6/12 sm:px-8 lg:basis-1/4 lg:px-4 mb-8">
      <Card
        className="bg-slate-50 relative cursor-default"
        bordered={false}
        hoverable
        cover={
          <div className="h-72 relative">
            <div className="absolute z-10 top-0 right-0 bg--rate px-2 py-1 rounded-md">
              <p className="text-white">Đánh giá: {item.danhGia}/10</p>
              <div className="flex text-yellow-400 justify-end mr-2">
                {showRating(
                  item.danhGia,
                  <BsStarFill />,
                  <BsStarHalf />,
                  <BsStar />
                )}
              </div>
            </div>
            <div className="play-trailer absolute top-0 right-0 left-0 bottom-0 opacity-5 hover:opacity-100 text-slate-200 text-8xl flex justify-center items-center rounded-md flex-col">
              <BsPlayCircle
                className="cursor-pointer rounded-full hover:text-yellow-400 duration-300"
                onClick={() =>
                  dispatch({
                    type: types.SENDING_TRAILER_URL,
                    payload: item.trailer,
                  })
                }
              />
              <p className="text-center text-xl mt-3">Xem trailer</p>
            </div>
            <img src={item.hinhAnh} className="h-full w-full" alt="img" />
          </div>
        }
      >
        <div className="movie-title flex justify-center items-center">
          <h4 className="text-lime-800 text-base font-bold uppercase text-center">
            {stringTrimmer(item.tenPhim, 48)}
          </h4>
        </div>
        <div className="buy-btn text-center h-full flex items-center justify-center">
          <button
            className="bg-red-700 text-white text-lg py-3 w-full uppercase rounded-sm"
            onClick={() => navigate("/Booking/Detail/" + item.maPhim)}
          >
            Chi tiết
          </button>
        </div>
      </Card>
    </div>
  );
}
export default MovieItem;
