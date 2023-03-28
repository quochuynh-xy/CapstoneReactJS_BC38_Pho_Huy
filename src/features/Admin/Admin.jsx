import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMovieDetail, fetchUserDetail } from "./thunk";
import { Outlet, useSearchParams } from "react-router-dom";
import NavTab from "./components/NavTab";
import adminAva from "../../app/assets/img/admin/avata.jpg";
const Admin = () => {
  const dispatch = useDispatch();
  const [searchParam] = useSearchParams();
  useEffect(() => {
    dispatch(fetchMovieDetail(''));
    dispatch(fetchUserDetail(searchParam.get("page")));
  }, [dispatch]);
  // giữ trạng current page khi admin tìm kím user
  useEffect(() => {
    dispatch(fetchUserDetail(searchParam.get("page")));
  }, [searchParam.get("page"), dispatch]);
  return (
    <div>
      <div></div>
      <div className="container mx-auto mt-2 ">
        <div className="flex items-center relative top-0 right-0">
          <img
            src={adminAva}
            alt="adminAva"
            width={50}
            height={50}
            className="rounded-full"
          />
          <p className="font-medium ml-2 text-sm">Admin</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "0.5fr 3.5fr" }}>
          <div>
            <NavTab />
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg  h-auto mt-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
