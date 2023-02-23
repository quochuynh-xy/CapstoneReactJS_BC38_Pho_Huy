import BookingCarousel from "./components/Carousel";
import { useDispatch } from "react-redux";
import { fetchBanner, fetchMovies } from "./thunk"; // logic thunk action
import { useEffect } from "react";
import MoviesList from "./components/MoviesList";
import { useSearchParams } from "react-router-dom";
import MoviesTab from "./components/MoviesTab";
import "./booking.scss";
import ModalClip from "./components/ModalClip";
function Home() {
  const dispatch = useDispatch();
  // const fetchBanner = async () => {
  //   try {
  //     const promise = await axios({
  //       url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachBanner",
  //       method: "GET",
  //       headers: {
  //         TokenCyberSoft: token
  //       }
  //     })
  //     dispatch({ // Trong action mình muốn dispatch cái này.
  //       type: types.SET_BANNER,
  //       payload: promise.data.content
  //     })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // Nhưng bản chất của 1 action phải là plain object, do đó không thể gửi lên được
  // Cần phải dùng middleware, middle ware cho phép dispatch 1 "thunk function"
  // thunk function sẽ xử lý và gửi dữ liệu lên reducer
  // const fetchMovies = async () => {
  //   try {
  //     const promise = await axios({
  //       url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang",
  //       method: "GET",
  //       params: {
  //         maNhom: "GP01",
  //         soTrang: "1",
  //         // tenPhim:"",
  //         soPhanTuTrenTrang: 8,
  //       },
  //       headers: {
  //         TokenCyberSoft: token,
  //       },
  //     });
  //     console.log(promise.data);
  //     dispatch({
  //       type: types.GET_MOVIES_PAGES,
  //       payload: promise.data.content
  //     })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const [paramsUrl, setParamsUrl] = useSearchParams();
  useEffect(() => {
    dispatch(fetchBanner);
  }, [dispatch,setParamsUrl]);
  useEffect(() => {
    dispatch(fetchMovies(paramsUrl.get("page")))
  }, [dispatch, paramsUrl]);
  return (
    <section className="booking">
      <BookingCarousel/>
      <MoviesList />
      <MoviesTab/>
      <ModalClip/>
    </section>
  );
}
export default Home;
