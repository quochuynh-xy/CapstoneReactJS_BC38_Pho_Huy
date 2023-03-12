import { Dropdown } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as thunkActions from "../thunk";
import { movieServices } from "../Services/movieServices";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
const QuickSearch = () => {
  const [hasSelectedMovie, setHasSelectedMovie] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [movieId, setMovieId] = useState(null);
  const [cinemasNameList, setCinemasNameList] = useState([]);
  const [cinemaName, setCinemaName] = useState("");
  const [cinemaId, setCinemaId] = useState("");
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [listShowsByDaySelected, setListShowsByDaySelected] = useState([]);
  const [listShows, setListShow] = useState([]);
  const [selectedShowInfo, setSelectedShowInfo]= useState("");
  const [selectedShowId, setSelectedShowId] = useState("");
  const searchResult = useSelector((state) => state.booking.lookingMovies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // lấy danh sách các phim phục vụ người dùng tìm kiếm
  useEffect(() => {
    dispatch(thunkActions.actionFetchLookingMovies());
  }, [dispatch]);
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
    setSelectedShowId(showId)
  }
  const listOfNames = searchResult.map((item, index) => {
    return {
      key: index,
      label: (
        <p
          className="hover:text-red-500 duration-300 font-semibold"
          key={index}
          onClick={() => handleSelectMovie(item.tenPhim, item.maPhim)}
        >
          {item.tenPhim}
        </p>
      ),
    };
  });
  const listOfCinemas = cinemasNameList.map((item, index) => {
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
          <p className="text-sm text-slate-600">{item.diaChi}</p>
        </div>
      ),
    };
  });
  const listOfDays = days.map((item, index) => {
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
  const listOfShows = listShows.map((item, index) => {
    return {
      key: index,
      label: (
        <p className="hover:text-red-500 duration-300 font-semibold text-center"
            onClick={()=> {
                setSelectedShowInfo(`${moment(item.ngayChieuGioChieu).format("hh:mm a")} - ${item.tenRap}`)
                handleSelectShowId(item.maLichChieu)}}
        >
          {moment(item.ngayChieuGioChieu).format("hh:mm a")} - {item.tenRap}
        </p>
      ),
    };
  });
  return (
    <>
      <div className="container mx-auto bg-slate-500 py-4">
        <form
          action=""
          className="quick-search flex justify-around items-center"
        >
          <div className="basis-1/5 px-4 movie-name">
            <Dropdown
              overlayStyle={{
                backgroundColor: "#fff",
                maxHeight: "200px",
                maxWidth: "250px",
                overflowY: "scroll",
              }}
              menu={{
                items: listOfNames,
              }}
            >
              <input
                className="w-full outline-none pl-2 py-1 font-semibold italic rounded-sm"
                placeholder="Tên phim"
                type="text"
                value={movieName}
                onChange={(e) => {
                  setMovieName(e.target.value);
                }}
              />
            </Dropdown>
          </div>
          <div className="basis-1/5 px-4 list-cinemas">
            <Dropdown
              overlayStyle={{
                backgroundColor: "#fff",
                maxHeight: "200px",
                maxWidth: "300px",
                overflowY: "scroll",
              }}
              menu={{
                items: listOfCinemas,
              }}
            >
              <input
                className="w-full outline-none pl-2 py-1 font-semibold italic rounded-sm"
                placeholder="Tên cụm rạp"
                type="text"
                value={cinemaName}
                onChange={(e) => {
                  setCinemaName(e.target.value);
                }}
              />
            </Dropdown>
          </div>
          <div className="basis-1/5 px-4 specific-cinema">
            <Dropdown
              overlayStyle={{
                backgroundColor: "#fff",
                maxHeight: "200px",
                maxWidth: "200px",
                overflowY: "scroll",
              }}
              menu={{
                items: listOfDays,
              }}
            >
              <input
                className="w-full outline-none px-2 py-1 font-semibold italic text-center rounded-sm"
                type="text"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              />
            </Dropdown>
          </div>
          <div className="basis-1/5 px-4 show-day">
            <Dropdown
              menu={{
                items: listOfShows,
              }}
            >
              <input
                className="w-full outline-none px-2 py-1 font-semibold italic text-center rounded-sm"
                type="text"
                value={selectedShowInfo}
                onChange={(e)=> {setSelectedShowInfo(e.target.value)}}
              />
            </Dropdown>
          </div>
          <div className="basis-1/5 buy-ticket">
            <button className="bg-green-300 py-2 px-8 w-full"
                onClick={()=> navigate("/Booking/TicketRoom/"+ selectedShowId)}
            >Mua vé</button>
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
