import { Dropdown } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as thunkActions from "../thunk";
import { movieServices } from "../Services/movieServices";
const QuickSearch = () => {
  //   const [listMovies, setListMovies] = useState();
  const [movieName, setMovieName] = useState("");
  const [movieId, setMovieId] = useState(null);
  const [cinemasList, setCinemasList] = useState([]);
  const [cinemaName, setCinemaName] = useState("");
  const searchResult = useSelector((state) => state.booking.lookingMovies);
  const dispatch = useDispatch();
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
        let res = await movieServices.fetchShowTimeByMovie(movieId);
        try {
          let totalCinemas = res.data.content.heThongRapChieu.reduce(
            (init, cumRap) => {
              //   console.log("init khởi đầu ",init);
              let danhSachRap = cumRap.cumRapChieu.reduce((initial, tenRap) => {
                initial.push({
                  tenCumRap: tenRap.tenCumRap,
                  diaChi: tenRap.diaChi,
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
          setCinemasList(totalCinemas);
        } catch (error) {
          console.log(error);
        }
      };
      promise();
    }
  }, [movieId]);
  const handleSelectMovie = (tenPhim, maPhim) => {
    setMovieId(maPhim);
    setMovieName(tenPhim);
  };
  const handleSelectCinema = (name) => {
    setCinemaName(name);
  };
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
  const listOfCinemas = cinemasList.map((item, index) => {
    return {
      key: index,
      label: (
        <div
          className="hover:text-red-500 duration-300 font-semibold"
          onClick={() => {
            handleSelectCinema(item.tenCumRap);
          }}
        >
          <h3 className="text-blue-700">{item.tenCumRap}</h3>
          <p className="text-sm text-slate-600">{item.diaChi}</p>
        </div>
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
              menu={{
                items: [
                  {
                    key: "1",
                    label: (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.antgroup.com"
                      >
                        1st menu item
                      </a>
                    ),
                  },
                  {
                    key: "2",
                    label: (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.aliyun.com"
                      >
                        2nd menu item
                      </a>
                    ),
                  },
                  {
                    key: "3",
                    label: (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.luohanacademy.com"
                      >
                        3rd menu item
                      </a>
                    ),
                  },
                ],
              }}
            >
              <input
                className="w-full outline-none pl-2 py-1 font-semibold italic rounded-sm"
                type="text"
              />
            </Dropdown>
          </div>
          <div className="basis-1/5 px-4 show-day">
            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    label: (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.antgroup.com"
                      >
                        1st menu item
                      </a>
                    ),
                  },
                  {
                    key: "2",
                    label: (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.aliyun.com"
                      >
                        2nd menu item
                      </a>
                    ),
                  },
                  {
                    key: "3",
                    label: (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.luohanacademy.com"
                      >
                        3rd menu item
                      </a>
                    ),
                  },
                ],
              }}
            >
              <input
                className="w-full outline-none pl-2 py-1 font-semibold italic rounded-sm"
                type="text"
              />
            </Dropdown>
          </div>
          <div className="basis-1/5 buy-ticket">
            <button className="bg-green-300 py-2 px-8 w-full">Mua vé</button>
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
//     {a:1, b:2},
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
