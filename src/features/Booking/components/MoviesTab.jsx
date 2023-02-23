import { Tabs } from "antd";
import { useState, useEffect } from "react";
import { movieServices } from "../../../services/movieServices";
import moment from "moment/moment";
function MoviesTab() {
  const [dataMovies, setDataMovies] = useState([]);
  useEffect(() => {
    const promise = movieServices.getShowScheduleByTheater();
    promise
      .then((res) => {
        setDataMovies(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);
  const mapItems = dataMovies.map((Item) => {
    return {
      key: Item.maHeThongRap,
      label: (
        <div>
          <img src={Item.logo} alt="logo" className="h-12 w-12" />
        </div>
      ),
      children: (
        <Tabs
          className="bg-slate-400"
          tabPosition="left"
          items={Item.lstCumRap.map((theater) => {
            return {
              key: theater.maCumRap,
              label: (
                <div className="flex w-80">
                  <img
                    src={theater.hinhAnh}
                    className="w-20 h-20"
                    alt="IMG_theater"
                  />
                  <div className="text-start ml-4">
                    <span className="text-red-500 font-medium">
                      {theater.tenCumRap}
                    </span>
                    <br />
                    <p>{theater.diaChi}</p>
                  </div>
                </div>
              ),
              children: theater.danhSachPhim.map((film) => {
                return (
                  <div className="flex mb-3" key={film.maPhim}>
                    <img
                      src={film.hinhAnh}
                      className="w-16 h-16"
                      alt="IMG_cover"
                    />
                    <div className="ml-3">
                      <h3 className="font-semibold">{film.tenPhim}</h3>
                      <div>
                        {film.lstLichChieuTheoPhim.map((time, index) => {
                          return (
                            <button
                              key={index}
                              className="mr-2 mb-2 bg-slate-200 px-3 rounded-md"
                            >
                              <span className="text-green-600 text-xl font-semibold">
                                {moment(time.ngayChieuGioChieu).format("hh:MM")}
                              </span>
                              <br />
                              <span className="text-red-400">
                                {moment(time.ngayChieuGioChieu).format(
                                  "DD.MM.YY"
                                )}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }),
            };
          })}
        />
      ),
    };
  });
  return (
    <>
      <Tabs
        style={{
          maxHeight: 800,
          overflowY: "scroll",
          scrollBehavior: "smooth",
        }}
        tabPosition="left"
        className="container mx-auto mt-4 hover:shadow-sm"
        items={mapItems}
      />
    </>
  );
}
export default MoviesTab;
