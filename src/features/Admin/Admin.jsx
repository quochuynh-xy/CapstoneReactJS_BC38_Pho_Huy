import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetail, fetchUserDetail } from "./thunk";
import { Outlet, useSearchParams } from "react-router-dom";
import NavTab from "./components/NavTab";
const Admin = () => {
  const dispatch = useDispatch();

  const [searchParam, setUseSearchParam] = useSearchParams();
  

  useEffect(() => {
    dispatch(fetchMovieDetail);
    dispatch(fetchUserDetail(searchParam.get("page")));
  }, [dispatch]);
  // giữ trạng current page khi admin tìm kím user
  useEffect(() => {
    dispatch(fetchUserDetail(searchParam.get("page")));
  }, [searchParam.get("page")]);
  return (
    <div
      className=" container mx-auto"
      style={{ display: "grid", gridTemplateColumns: "0.5fr 3.5fr" }}
    >
      <div>
        <NavTab />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg  h-auto mt-2">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
