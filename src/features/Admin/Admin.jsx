import React, { useEffect } from "react";
import { useDispatch, } from "react-redux";
import { fetchMovieDetail, fetchUserDetail } from "./thunk";
import { Outlet, useSearchParams } from "react-router-dom";
import NavTab from "./components/NavTab";
const Admin = () => {
  const dispatch = useDispatch();

  const [searchParam] = useSearchParams()[0];
  

  useEffect(() => {
    dispatch(fetchMovieDetail);
    dispatch(fetchUserDetail(searchParam.get("page")));
  }, [dispatch, searchParam]);
  // giữ trạng current page khi admin tìm kím user
  useEffect(() => {
    dispatch(fetchUserDetail(searchParam.get("page")));
  }, [searchParam, dispatch]);
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
