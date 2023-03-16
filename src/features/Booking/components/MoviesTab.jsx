import { Tabs, Collapse } from "antd";
import { useState, useEffect } from "react";
import { movieServices } from "../Services/movieServices";
import moment from "moment/moment";
import { getStandFor } from "../utilities/utilities";
import { useNavigate } from "react-router-dom";
const { Panel } = Collapse;
function MoviesTab() {
  const [dataMovies, setDataMovies] = useState([]);
  const navigate = useNavigate();
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
          <img src={Item.logo} alt="logo" className="h-12 w-12 tabs__logo" />
        </div>
      ),
      children: (
        <Tabs
          className="tabs__body"
          tabPosition="left"
          moreIcon={null}
          items={Item.lstCumRap.map((theater, index) => {
            return {
              key: index,
              label: (
                <div className="theater--info flex w-40 sm:w-80 text-ellipsis overflow-hidden">
                  <img
                    src={theater.hinhAnh}
                    className="hidden lg:block w-14 h-14 rounded-md"
                    alt="IMG_theater"
                  />
                  <div className="text-start ml-4">
                    <span className="info__name font-medium">
                    {getStandFor(theater.tenCumRap)}
                    </span>
                    <br />
                    <p className="info__address hidden sm:block whitespace-pre-line text-sm indent-1 text-neutral-400">{theater.diaChi}</p>
                  </div>
                </div>
              ),
              children: theater.danhSachPhim.map((film) => {
                return (
                  <Collapse
                    className="border-b mb-1 border-solid border-neutral-200"
                    key={film.maPhim}
                    bordered={false}
                    expandIconPosition="end"
                    defaultActiveKey={[1]}
                  >
                    <Panel
                      key={1}
                      header={
                        <div className="flex">
                          <img
                            src={film.hinhAnh}
                            className="hidden sm:block w-12 h-14 rounded-b-sm"
                            alt="IMG_cover"
                          />
                          <div className="ml-2 ">
                            <h1 className="font-semibold text-sm sm:text-base lg:text-xl text-black">
                              {film.tenPhim} - {film.maPhim}
                            </h1>
                            {film.hot ? <span className="bg-red-500 px-1 text-xs sm:text-base lg:px-4 text-white rounded-sm w-4">Phim hot</span> : <span className="bg-orange-400 px-1 text-xs sm:text-base lg:px-4 text-white rounded-sm w-4">Xem nhiều</span>}
                          </div>
                        </div>
                      }
                    >
                      <div className="lg:ml-3">
                        <div className="flex flex-wrap justify-start">
                          {film.lstLichChieuTheoPhim.map((time, index) => {
                            return (
                              <button
                              key={index}
                              className="font-bold text-xs ml-2 px-1 py-1 sm:py-2 sm:px-3 sm:text-sm lg:ml-4 rounded-md mb-3 leading-5 bg-green-100 hover:bg-white text-stone-600 border-solid border border-lime-500 hover:shadow-md hover:border-orange-500 hover:text-orange-500 duration-300"
                              onClick={() => navigate(`/Booking/TicketRoom/${time.maLichChieu}`)}
                              >
                              {moment(time.ngayChieuGioChieu).format(
                                "hh:mm a"
                              )} - 
                              {moment(time.ngayChieuGioChieu).format(
                                " DD/MM/YY"
                              )}
                            </button>                              
                            );
                          })}
                        </div>
                      </div>
                    </Panel>
                  </Collapse>
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
        tabPosition="top"
        className="booking__tabs container mx-auto mt-4 hover:shadow-sm"
        items={mapItems}
        id="movieTabs"
      />
    </>
  );
}
export default MoviesTab;
