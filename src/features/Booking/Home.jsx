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
import Footer from "../../components/Footer";
import QuickSearch from "./components/QuickSearch";
import QuickNews from "./components/QuickNews";
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
    <section className="booking mx-auto">
      <PageLayout>
        <Header />
        <BookingCarousel />
        <QuickSearch/>
        <MoviesList />
        <MoviesTab />
        <QuickNews />
        <Footer />
        <ModalClip />
      </PageLayout>
    </section>
  );
}
export default Home;
