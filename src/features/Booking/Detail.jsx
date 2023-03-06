import PageLayout from "../../HOCs/PageLayout";
import Header from "../../components/Header";
import MovieInfo from "./components/MovieInfo";
import { useParams } from "react-router-dom";
import ModalClips from "./components/ModalClip";
import "./booking.scss"
import MovieDetailsTabs from "./components/MovieDetailsTabs";
import Footer from "../../components/Footer"; 
function Detail() {
  const params = useParams(); // {maPhim: <number>}
  return (
    <div className="movie__detail">
      <PageLayout>
        <Header/>
        <MovieInfo maPhim={params.maPhim}/>
        <MovieDetailsTabs maPhim={params.maPhim}/>
        <Footer/>
        <ModalClips/>
      </PageLayout>
    </div>
  );
}
export default Detail;
