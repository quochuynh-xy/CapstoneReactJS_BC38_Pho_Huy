import { useEffect } from "react";
import { movieServices } from "../Services/movieServices";
import { useState } from "react";
import { showRating } from "../utilities/utilities";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { types } from "../const";
import { Progress } from "antd";
import moment from "moment/moment";
const MovieInfo = (props) => {
  const { maPhim } = props;
  const [movieInfo, setMovieInfo] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const data = async () => {
      try {
        const res = await movieServices.fetchMovieDetail(maPhim);
        setMovieInfo(res.data.content);
      } catch (error) {
        console.log(error);
      }
    };
    data();
  }, [maPhim]);
  return (
    <section className="detail__info relative">
      <div className="container info mx-auto">
        <div className="info__movie flex-wrap sm:flex justify-center">
          <div className="basis-full sm:flex sm:items-end md:basis-4/12 text-center">
            <img
              src={movieInfo?.hinhAnh}
              className="sm:w-48 md:w-56 md:h-72 shadow-md mx-auto"
              alt="img title"
            />
            <div className="sm:hidden mt-4 text-center">
              <p className="text-red-500">Điểm đánh giá</p>
              <div className="star mt-1 text-center">
                <div className="flex justify-center text-red-600 ">
                  {showRating(
                    movieInfo?.danhGia,
                    <BsStarFill />,
                    <BsStarHalf />,
                    <BsStar />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="basis-full m-0 sm:basis-9/12 md:basis-8/12 flex justify-between">
            <div className="px-8 sm:px-0 sm:basis-9/12 sm:mr-8 lg:basis-6/12 flex flex-wrap items-end">
              <div className="basis-full">
                <h1 className="movie__name mt-10 text-xl md:text-2xl lg:text-4xl font-bold">
                  {movieInfo.tenPhim}
                </h1>
                <p className="movie__date mt-2">
                  Khởi chiếu:{" "}
                  {moment(movieInfo.ngayKhoiChieu).format("DD.MM.YYYY")}
                </p>
                <p className="my-4 movie__des sm:text-sm lg:text-base indent-2">
                  {movieInfo?.moTa}
                </p>
              </div>
              <div className="flex justify-center sm:block basis-full">
                <button
                  className="buybtn text-white sm:text-sm px-6 md:px-4 lg:px-8 py-2 rounded-md font-bold"
                  onClick={() => {
                    document.getElementById('movieDetailsTabs').scrollIntoView()
                    
                  }}
                >
                  MUA VÉ
                </button>
                <button
                  className="trailerbtn text-white sm:text-sm px-2 md:px-4 lg:px-6 ml-5 py-2 rounded-md font-bold"
                  onClick={() =>
                    dispatch({
                      type: types.SENDING_TRAILER_URL,
                      payload: movieInfo.trailer,
                    })
                  }
                >
                  XEM TRAILER
                </button>
              </div>
            </div>
            <div className="rate__movie hidden sm:flex sm:basis-3/12 md:basis-4/12 sm:mt-9 md:mt-14 flex-col items-center sm:mr-4 lg:mr-0">
              <Progress
                type="circle"
                percent={movieInfo.danhGia * 10}
                format={(data) => data / 10 + "/10"}
                strokeColor="#7ed321"
                trailColor="#fff"
                width={140}
                strokeWidth="10"
              />
              <div className="star mt-1 text-center">
                <div className="flex text-red-600 ">
                  {showRating(
                    movieInfo?.danhGia,
                    <BsStarFill />,
                    <BsStarHalf />,
                    <BsStar />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MovieInfo;
