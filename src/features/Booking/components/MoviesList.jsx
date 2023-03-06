import { useSelector } from "react-redux";
import MovieItem from "./MovieItem";
import { Pagination } from "antd";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../thunk";
import {
  useSearchParams,
} from "react-router-dom";
function MoviesList() {
  const MovieList = useSelector((state) => state.booking.pageMovies);
  const [paramsUrl, setParamsUrl] = useSearchParams();
  const dispatch = useDispatch();
  return (
    <div className="booking__card container mx-auto mt-6">
      <div className="flex text-slate-200 pb-4 pt-8 uppercase">
        <p className="mr-3">Tất cả</p>
        <p className="mr-3">Đang chiếu</p>
        <p className="mr-3">Sắp chiếu</p>
      </div>
      <div className="cards__list flex flex-row flex-wrap">
        {MovieList.items?.map((item, index) => (
          <MovieItem item={item} key={index} />
        ))}
      </div>
      <div className="text-center">
        <Pagination
          className="booking__paginate"
          defaultCurrent={1}
          current={MovieList.currentPage}
          pageSize={8}
          total={MovieList.totalCount}
          onChange={(page) => {
            dispatch(fetchMovies(page));
            setParamsUrl({...paramsUrl, page: page });
          }}
        />
      </div>
    </div>

  );
}
export default MoviesList;
