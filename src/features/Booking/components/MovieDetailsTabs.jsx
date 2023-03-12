import { useEffect } from "react";
import { movieServices } from "../Services/movieServices";
import { useState } from "react";
import { Tabs, Collapse } from "antd";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
const { Panel } = Collapse;
const MovieDetailsTabs = (props) => {
  const navigate = useNavigate();
  const { maPhim } = props;
  const [allTheaters, setAllTheaters] = useState([]); // danh sách hệ thống rạp
  const [movieData, setMovieData] = useState([]); // thông tin phim và cụm rạp
  useEffect(() => {
    // Lấy danh sách cụm rạp
    movieServices
      .fetchTheatersList()
      .then((res) => {
        setAllTheaters(res.data.content);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    // Lấy thông tin của phim được lựa chọn
    let data = async () => {
      try {
        const res = await movieServices.fetchShowTimeByMovie(maPhim);
        setMovieData(res.data.content);
      } catch (error) {
        console.log(error);
      }
    };
    data();
  }, [maPhim]);
  const mergeData = allTheaters.map((item) => {
    const found =
      movieData.heThongRapChieu &&
      movieData.heThongRapChieu.find((cumRap) => {
        return item.maHeThongRap === cumRap.maHeThongRap;
      });
    if (found) {
      return { ...item, ...found };
    } else {
      return item;
    }
  });
  const showTime = (
    <Tabs
      className="theaterlist"
      tabPosition="left"
      items={mergeData.map((theater, index) => {
        return {
          key: index,
          label: (
            <img src={theater.logo} className="w-14 h-14 mr-2 ml-2" alt="img" />
          ),
          children: (
            <div>
              {theater.cumRapChieu &&
                theater.cumRapChieu.map((cumRap) => {
                  // Danh sách lịch chiếu
                  return (
                    <Collapse
                      key={cumRap.tenCumRap}
                      expandIconPosition="end"
                      defaultActiveKey={1}
                      className="border-b mb-1 border-solid border-neutral-200"
                    >
                      <Panel
                        key={1}
                        header={
                          <div className="flex">
                            <img
                              src={cumRap.hinhAnh}
                              alt={cumRap.tenCumRap}
                              className="h-16 w-16 rounded"
                            />
                            <div className="ml-4">
                              <h3 className="font-bold">{cumRap.tenCumRap}.</h3>
                              <p className="text-sm text-neutral-400">
                                {cumRap.diaChi}.
                              </p>
                            </div>
                          </div>
                        }
                      >
                        <div className="flex mb-3 flex-wrap">
                          {cumRap.lichChieuPhim.map((rap, index) => {
                            return (
                              <button
                                key={index}
                                className="bg-green-100 hover:bg-white text-stone-600 border-solid border border-lime-500 hover:shadow-md hover:border-orange-500 hover:text-orange-500 duration-300 font-bold py-2 px-3 ml-2 mb-3 rounded-md"
                                onClick={() =>
                                  navigate(
                                    `/Booking/TicketRoom/${rap.maLichChieu}`
                                  )
                                }
                              >
                                {moment(rap.ngayChieuGioChieu).format("hh:mm a")}{" "}
                                -
                                <span className="">
                                  {moment(rap.ngayChieuGioChieu).format(
                                    " DD/MM/YY"
                                  )}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </Panel>
                    </Collapse>
                  );
                })}
              {!theater.cumRapChieu && (
                <p className="text-2xl mt-10 text-center">
                  Không có thông tin suất chiếu.
                </p>
              )}
            </div>
          ),
        };
      })}
    />
  );
  const MovieIntroduce = (
    <div className="movieInfo flex justify-around">
      <div className="flex justify-between basis-5/12 my-11">
        <div className="text-lime-600 font-bold mr-4">
          <p>Tên Phim:</p>
          <p>Ngày khởi chiếu:</p>
          <p>Mã phim:</p>
          <p>Điểm đánh giá:</p>
        </div>
        <div className="info__detail">
          <p className="font-semibold">{movieData.tenPhim}</p>
          <p>{moment(movieData.ngayKhoiChieu).format("DD/MM/YYYY")}</p>
          <p>{movieData.maPhim}</p>
          <p>{movieData.danhGia}/10</p>
        </div>
      </div>
      <div className="basis-6/12 my-11">
        <h2 className="underline font-semibold mb-2 text-lg">Nội dung:</h2>
        <p className="indent-2">{movieData.moTa}</p>
      </div>
    </div>
  );
  const Feedback = (
    <div className="movieFeedback h-72 ">
      <p className="text-center text-xl text-slate-50 pt-40">
        Hiện chưa có đánh giá cho phim này
      </p>
    </div>
  );
  return (
    <section className="container mx-auto detail__showtime">
      <Tabs
        className="showtime__parent"
        tabPosition="top"
        centered
        items={[
          {
            key: 1,
            label: <h2 className="parent__tab">Xem Lịch chiếu</h2>,
            children: showTime,
          },
          {
            key: 2,
            label: <h2 className="parent__tab">Thông tin phim</h2>,
            children: MovieIntroduce,
          },
          {
            key: 3,
            label: <h2 className="parent__tab">Đánh giá</h2>,
            children: Feedback,
          },
        ]}
      />
    </section>
  );
};
export default MovieDetailsTabs;
