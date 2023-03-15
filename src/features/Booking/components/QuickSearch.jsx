import { Dropdown } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as thunkActions from "../thunk";
import { movieServices } from "../Services/movieServices";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
const QuickSearch = () => {
  const [hasSelectedMovie, setHasSelectedMovie] = useState([]); // dropdown - Mảng chứa danh sách phim hệ thống đang có
  const [movieName, setMovieName] = useState(""); // input field - tên phim người dùng chọn
  const [movieId, setMovieId] = useState(null); // id của phim tương ứng với tên phim được chọn
  const [cinemasNameList, setCinemasNameList] = useState([]); // dropdown - Danh sách các rạp chiếu phim được chọn
  const [cinemaName, setCinemaName] = useState("Chọn rạp"); // input field - Tên rạp được chọn
  const [cinemaId, setCinemaId] = useState(""); // Mã rạp được chọn tương ứng với tên rạp
  const [days, setDays] = useState([]); // dropdown - Danh sách ngày chiếu.
  const [selectedDay, setSelectedDay] = useState("Chọn ngày chiếu"); // input field - ngày được chọn để xem lịch chiếu
  const [listShowsByDaySelected, setListShowsByDaySelected] = useState([]); // Danh sách tất cả các suất chiếu trong ngày được chọn.
  const [listShows, setListShow] = useState([]); // dropdown - Danh sách lịch chiếu tương ứng với ngày được chọn (được lọc từ listShowsByDaySelected)
  const [selectedShowInfo, setSelectedShowInfo] = useState("Chọn suất chiếu"); // input field - Thông tin ngày giờ chiếu được chọn
  const [selectedShowId, setSelectedShowId] = useState(""); // ID của lịch chiếu được chọn (dùng điều hướng)
  const searchResult = useSelector((state) => state.booking.lookingMovies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // lấy danh sách các phim phục vụ người dùng tìm kiếm
  useEffect(() => {
    setCinemasNameList([]);
    setDays([]);
    setListShow([]);
    setCinemaName("Chọn rạp");
    setSelectedDay("Chọn ngày chiếu");
    setSelectedShowInfo("Chọn suất chiếu");
    setSelectedShowId("");
    if (!movieName) {
      dispatch(thunkActions.actionFetchLookingMovies());
    } else {
      dispatch(thunkActions.actionFetchLookingMovies(movieName));
    }
  }, [dispatch, movieName]);
  // Cập nhật danh sách rạp chiếu theo lựa chọn phim của người dùng
  useEffect(() => {
    if (!movieId) {
      return;
    } else {
      let promise = async () => {
        try {
          let res = await movieServices.fetchShowTimeByMovie(movieId);
          setHasSelectedMovie(res.data.content.heThongRapChieu);
          let totalCinemas = res.data.content.heThongRapChieu.reduce(
            (init, cumRap) => {
              //   console.log("init khởi đầu ",init);
              let danhSachRap = cumRap.cumRapChieu.reduce((initial, tenRap) => {
                initial.push({
                  tenCumRap: tenRap.tenCumRap,
                  diaChi: tenRap.diaChi,
                  maCumRap: tenRap.maCumRap,
                });
                return initial;
              }, []);
              //   console.log("danh sách rạp ", danhSachRap);
              //   console.log("concat ",init.concat(danhSachRap));
              return init.concat(danhSachRap);
            },
            []
          );
          // console.log(totalCinemas);
          setCinemasNameList(totalCinemas);
        } catch (error) {
          console.log(error);
        }
      };
      promise();
    }
  }, [movieId]);
  // Cập nhật danh sách ngày chiếu theo lựa chọn rạp của người dùng
  useEffect(() => {
    if (!cinemaId) {
      return;
    } else {
      let filteredDay = [];
      for (let index in hasSelectedMovie) {
        let cinema = hasSelectedMovie[index].cumRapChieu.find(
          (item) => item.maCumRap === cinemaId
        );
        if (cinema) {
          setListShowsByDaySelected(cinema.lichChieuPhim);
          for (let i in cinema.lichChieuPhim) {
            let date = moment(cinema.lichChieuPhim[i].ngayChieuGioChieu).format(
              "DDMMYYYY"
            );
            if (
              !filteredDay.find(
                (value) =>
                  moment(value.ngayChieuGioChieu).format("DDMMYYYY") === date
              )
            ) {
              filteredDay.push(cinema.lichChieuPhim[i]);
            }
          }
        }
      }
      setDays(filteredDay);
    }
  }, [cinemaId, hasSelectedMovie]);
  // Cập nhật danh sách suất chiếu theo lựa chọn ngày của người dùng
  useEffect(() => {
    if (selectedDay) {
      let output = listShowsByDaySelected.filter((item) => {
        return (
          moment(item.ngayChieuGioChieu).format("DD - MM - YYYY") ===
          selectedDay
        );
      });
      setListShow(output);
    } else {
      return;
    }
  }, [listShowsByDaySelected, selectedDay]);
  const handleSelectMovie = (tenPhim, maPhim) => {
    setMovieId(maPhim);
    setMovieName(tenPhim);
  };
  const handleSelectCinema = (tenRap, idRap) => {
    setCinemaName(tenRap);
    setCinemaId(idRap);
  };
  const handleSelectShowDay = (DDMMYYYY) => {
    setSelectedDay(DDMMYYYY);
  };
  const handleSelectShowId = (showId) => {
    setSelectedShowId(showId);
  };
  const listOfNames = () => {
    if (searchResult.length > 0) {
      return searchResult.map((item, index) => {
        return {
          key: index,
          label: (
            <p
              className="hover:text-red-500 duration-300 text-sm font-semibold"
              key={index}
              onClick={() => handleSelectMovie(item.tenPhim, item.maPhim)}
            >
              {item.tenPhim}
            </p>
          ),
        };
      });
    } else {
      return [
        {
          key: 0,
          label: (
            <p className="hover:text-red-500 duration-300 font-semibold">
              Không có kết quả
            </p>
          ),
        },
      ];
    }
  };
  const listOfCinemas = () => {
    if (cinemasNameList.length > 0) {
      return cinemasNameList.map((item, index) => {
        return {
          key: index,
          label: (
            <div
              className="font-semibold"
              onClick={() => {
                handleSelectCinema(item.tenCumRap, item.maCumRap);
              }}
            >
              <h3 className="text-slate-900 hover:text-red-500 duration-300">
                {item.tenCumRap}
              </h3>
            </div>
          ),
        };
      });
    } else {
      return [
        {
          key: 0,
          label: <p className="font-semibold">Vui lòng chọn phim</p>,
        },
      ];
    }
  };
  const listOfDays = () => {
    if (days.length > 0) {
      return days.map((item, index) => {
        return {
          key: index,
          label: (
            <p
              className="hover:text-red-500 duration-300 font-semibold text-center"
              onClick={() =>
                handleSelectShowDay(
                  moment(item.ngayChieuGioChieu).format("DD - MM - YYYY")
                )
              }
            >
              {moment(item.ngayChieuGioChieu).format("DD / MM / YYYY")}
            </p>
          ),
        };
      });
    } else {
      return [
        {
          key: 0,
          label: <p className="font-semibold">Chọn phim và rạp</p>,
        },
      ];
    }
  };
  const listOfShows = () => {
    if (listShows.length > 0) {
      return listShows.map((item, index) => {
        return {
          key: index,
          label: (
            <p
              className="hover:text-red-500 duration-300 font-semibold text-center"
              onClick={() => {
                setSelectedShowInfo(
                  `${moment(item.ngayChieuGioChieu).format("hh:mm a")} - ${
                    item.tenRap
                  }`
                );
                handleSelectShowId(item.maLichChieu);
              }}
            >
              {moment(item.ngayChieuGioChieu).format("hh:mm a")} - {item.tenRap}
            </p>
          ),
        };
      });
    } else {
      return [
        {
          key: 0,
          label: <p className="font-semibold">Chưa chọn ngày</p>,
        },
      ];
    }
  };
  return (
    <>
      <div className="quick-search container mx-auto pb-4">
        <h3 className="search__title text-orange-600 ml-4 tracking-wider italic">Mua vé nhanh</h3>
        <form
          action=""
          className="search__form flex flex-wrap justify-around items-center"
        >
          <div className="basis-full lg:basis-1/5 pb-2 lg:px-4 movie-name">
            <Dropdown
              overlayStyle={{
                backgroundColor: "#fff",
                maxHeight: "200px",
                maxWidth: "250px",
                overflowY: "scroll",
              }}
              menu={{
                items: listOfNames(),
              }}
            >
              <input
                className="w-full text-center lg:text-left search-item text-sm outline-none pl-2 py-1 font-semibold italic rounded-lg lg:rounded-sm"
                placeholder="Tên phim"
                type="text"
                value={movieName}
                onChange={(e) => {
                  setMovieName(e.target.value.trim());
                }}
              />
            </Dropdown>
          </div>
          <div className="basis-full lg:basis-1/5 pb-2 lg:px-4 list-cinemas">
            <Dropdown
              overlayStyle={{
                backgroundColor: "#fff",
                maxHeight: "200px",
                maxWidth: "300px",
                overflowY: "scroll",
              }}
              menu={{
                items: listOfCinemas(),
              }}
            >
              <p className="w-full text-center lg:text-left search-item text-sm cursor-pointer px-2 py-1 font-semibold italic rounded-lg lg:rounded-sm overflow-hidden">
                {cinemaName}
              </p>
            </Dropdown>
          </div>
          <div className="basis-full lg:basis-1/5 pb-2 lg:px-4 specific-cinema">
            <Dropdown
              overlayStyle={{
                backgroundColor: "#fff",
                maxHeight: "200px",
                maxWidth: "200px",
                overflowY: "scroll",
              }}
              menu={{
                items: listOfDays(),
              }}
            >
              <p className="w-full search-item text-sm cursor-pointer px-2 py-1 text-center font-semibold italic rounded-lg lg:rounded-sm overflow-hidden">
                {selectedDay}
              </p>
            </Dropdown>
          </div>
          <div className="basis-full lg:basis-1/5 pb-2 lg:px-4 show-day">
            <Dropdown
              overlayStyle={{
                backgroundColor: "#fff",
                maxHeight: "200px",
                maxWidth: "200px",
                overflowY: "scroll",
              }}
              menu={{
                items: listOfShows(),
              }}
            >
              <p className="w-full search-item text-sm cursor-pointer px-2 py-1 text-center font-semibold italic rounded-lg lg:rounded-sm overflow-hidden">
                {selectedShowInfo}
              </p>
            </Dropdown>
          </div>
          <div className="basis-full mt-2 lg:mt-0 lg:basis-1/5 pb-2 lg:px-4 buy-ticket">
            <button
              className={selectedShowId? "bg-red-600 hover:bg-red-700 duration-300 text-white py-2 lg:py-1 w-full rounded-lg lg:rounded-sm font-semibold tracking-wider shadow-sm" : "bg-stone-500 shadow-sm py-2 lg:py-1 w-full text-white rounded-lg lg:rounded-sm font-semibold tracking-wider"}
              type="button"
              onClick={() => {
                if (selectedShowId) {
                  navigate("/Booking/TicketRoom/" + selectedShowId);
                } else {
                  alert("Có cái đéo gì mà mua");
                }
              }}
            >
              Mua vé
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default QuickSearch;
// const items = [
//     {
//       key: '1',
//       label: (
//         <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
//           1st menu item
//         </a>
//       ),
//     },
//     {
//       key: '2',
//       label: (
//         <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
//           2nd menu item
//         </a>
//       ),
//     },
//     {
//       key: '3',
//       label: (
//         <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
//           3rd menu item
//         </a>
//       ),
//     },
//   ];
//   <Space wrap>
//     <Dropdown
//       menu={{
//         items,
//       }}
//       placement="bottomLeft"
//     >
//       <Button>bottomLeft</Button>
//     </Dropdown>
//   </Space>
// let array1 = [
//     {a:1, b:22},
//     {a:1, b:23},
//     {a:1, b:24},
//     {a:1, b:22},
//     {a:1, b:21},
//     {a:3, b:3},
//     {a:0, b:0},
//     {a:4, b:4},
// ]
// let array2 = [
//     {a:1, b:21},
//     {a:3, b:3},
//     {a:0, b:0},
//     {a:4, b:4},
// ]
// let array2 = [
//     {aa:1, bb:2},
//     {aa:3, bb:3},
//     {aa:0, bb:0},
//     {aa:4, bb:4},
// ]
// let sum = array1.reduce((init, item)=> {
//     return init.push({
//         a : item.a
//     })
// }, [])
// c= [{a:1},
// {a:3},
// {a:0},
// {a:4},]
