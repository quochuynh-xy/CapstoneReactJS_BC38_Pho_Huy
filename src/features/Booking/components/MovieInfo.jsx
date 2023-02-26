import { useEffect } from "react";
import { movieServices } from "../../../services/movieServices";
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
        <div className="info__movie flex">
          <div className="basis-4/12 text-center">
            <img
              src={movieInfo?.hinhAnh}
              className="w-64 h-96 mx-auto"
              alt="img title"
            />
          </div>
          <div className="basis-8/12 flex justify-between ml-3">
            <div className="basis-6/12 ">
              <h1 className="movie__name mt-10 text-4xl font-bold">
                {movieInfo.tenPhim}
              </h1>
              <p className="movie__date mt-2">
                Khởi chiếu:{" "}
                {moment(movieInfo.ngayKhoiChieu).format("DD.MM.YYYY")}
              </p>
              <p className="my-8 movie__des indent-2">{movieInfo?.moTa}</p>
              <button
                className="buybtn text-white px-8 py-2 rounded-md font-bold"
                onClick={() => alert(MovieInfo.trailer)}
              >
                MUA VÉ
              </button>
              <button
                className="trailerbtn text-white px-6 ml-5 py-2 rounded-md font-bold"
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
            <div className="rate__movie basis-4/12 mt-14 flex flex-col items-center">
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
      {/* <div className="detail__info__bg absolute inset-0 -z-10" style={{backgroundImage:`url(${movieInfo?.hinhAnh}`}}> */}
      <div className="detail__info__bg absolute inset-0 -z-10"></div>
    </section>
  );
};
export default MovieInfo;
