import React from "react";
import Home from "../features/Booking/Home";
import Seats from "../features/Booking/Seats";
import Detail from "../features/Booking/Detail";
import SignIn from "../features/Authentication/SignIn";
import SignUp from "../features/Authentication/SignUp";
import Profile from "../features/Profile/Profile";
import NotFound404 from "../components/NotFound404";
import Admin from "../features/Admin/Admin";
import User from "../features/Admin/User";
import DetailFilm from "../features/Admin/DetailFilm";
import AddNews from "../features/Admin/AddNews";
import { Navigate } from "react-router-dom";
import ShowTime from "../features/Admin/ShowTime";

export const routes = [
  {
    path: "/",
    component: Home,
    isPublic: true,
    isAuth: false,
    redirectPatch: "/",
  },
  {
    path: "/:id",
    component: Home,
    isPublic: true,
    isAuth: false,
    redirectPatch: "/",
  },
  {
    path: "/Booking/TicketRoom/:maLichChieu",
    component: Seats,
    isPublic: false,
    isAuth: false,
    redirectPatch: "/Authentication/SignIn",
  },
  {
    path: "/Booking/Detail/:maPhim",
    component: Detail,
    isPublic: true,
    isAuth: false,
    redirectPatch: "/Authentication/SignIn",
  },
  {
    path: "/Authentication/SignIn",
    component: SignIn,
    isPublic: true,
    isAuth: true,
    redirectPatch: "",
  },
  {
    path: "/Authentication/SignUp",
    component: SignUp,
    isPublic: true,
    isAuth: true,
    redirectPatch: "/",
  },
  {
    path: "/Profile",
    component: Profile,
    isPublic: false,
    isAuth: false,
    redirectPatch: "/Authentication/SignIn",
  },
  {
    path: "*",
    component: NotFound404,
    isPublic: true,
    isAuth: false,
    redirectPatch: "/",  },
];

export const routesAdmin = [
  {
    path: "/admin", component: Admin, children: [
      { path: '/admin', component: User },

      { path: '/admin/user', component: User },
      { path: "/admin/detail-films", component: DetailFilm },

      { path: "/admin/add-new", component: AddNews },
      { path: "/admin/show-time", component: ShowTime },
      { path: "*",  element: <Navigate to="user" /> }

    ]
  },

]
/**
 * Mảng routes này sẽ được map ra từng componet: <Route patch="/Booking/Seats" element={<Seats/>} />
 * tại App.js
 * Không có liệt kê App.js
 *  */
