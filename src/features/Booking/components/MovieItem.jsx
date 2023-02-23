import { Card } from "antd";
import { types } from "../const";
import { BsStarFill, BsStarHalf, BsStar, BsPlayCircle } from "react-icons/bs";
import { showRating } from "../utilities/utilities";
import { useDispatch } from "react-redux";
function MovieItem(props) {
  const item = props.item;
  const dispatch = useDispatch();
  const onShow = (
    <button className="bg-green-700 text-white text-lg w-32 py-2 rounded-lg">
      Mua vé
    </button>
  );
  const commingSoon = (
    <button className="bg-yellow-600 text-white text-lg w-32 py-2 rounded-lg">
      Sắp ra mắt
    </button>
  );
  return (
    <div className="basis-1/4 px-4 mb-8">
      <Card
        className="bg-slate-50 relative cursor-default"
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
              <BsPlayCircle className="cursor-pointer rounded-full hover:text-yellow-400 duration-300" 
                onClick={()=> dispatch({
                  type: types.SENDING_TRAILER_URL,
                  payload: item.trailer
                })}
                />
                <p className="text-center text-base">Xem trailer</p>
            </div>
            <img src={item.hinhAnh} className="h-full w-full" alt="img" />
          </div>
        }
      >
        <div className="h-9">
          <h4 className="text-gray-900 text-base font-bold">{item.tenPhim}</h4>
        </div>
        <div className="text-center mt-4">
          {!item.sapChieu ? onShow : commingSoon}
        </div>
      </Card>
    </div>
  );
}
export default MovieItem;
