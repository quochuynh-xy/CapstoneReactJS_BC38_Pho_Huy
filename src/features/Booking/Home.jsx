import BookingCarousel from "./components/Carousel";
import { useDispatch } from "react-redux";
import { fetchBanner, fetchMovies } from "./thunk"; // logic thunk action
import { useEffect } from "react";
import MoviesList from "./components/MoviesList";
import { useSearchParams } from "react-router-dom";
import MoviesTab from "./components/MoviesTab";
import "./booking.scss";
import ModalClip from "./components/ModalClip";
import PageLayout from "../../HOCs/PageLayout";
import Header from "../../components/Header";
function Home() {
  const dispatch = useDispatch();
  const [paramsUrl, setParamsUrl] = useSearchParams();
  useEffect(() => {
    dispatch(fetchBanner);
  }, [dispatch, setParamsUrl]);
  useEffect(() => {
    dispatch(fetchMovies(paramsUrl.get("page")));
  }, [dispatch, paramsUrl]);
  return (
    <section className="booking">
      <PageLayout>
        <Header/>
        <BookingCarousel />
        <MoviesList />
        <MoviesTab />
        <ModalClip />
      </PageLayout>
    </section>
  );
}
export default Home;
