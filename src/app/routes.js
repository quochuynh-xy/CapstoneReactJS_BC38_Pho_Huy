import React from "react";
import Home from "../features/Booking/Home";
import Seats from "../features/Booking/Seats";
import Detail from "../features/Booking/Detail";
import SignIn from "../features/Authentication/SignIn";
import SignUp from "../features/Authentication/SignUp";
import NotFound404 from "../components/NotFound404";
import Admin from "../features/Admin/Admin";
import User from "../features/Admin/User";
import DetailFilm from "../features/Admin/DetailFilm";
import AddNews from "../features/Admin/AddNews";
import { Navigate } from "react-router-dom";
import ShowTime from "../features/Admin/ShowTime";
import EditFilm from "../features/Admin/EditFilm";

export const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/Booking/:id",
    component: Seats,
  },
  {
    path: "/movie/:id",
    component: Detail,
  },
  {
    path: "/Authentication/SignIn",
    component: SignIn,
  },
  {
    path: "/Authentication/SignUp",
    component: SignUp,
  },
  { path: "*", component: NotFound404 },

];

export const routesAdmin = [
  {
    path: "/admin", component: Admin, children: [
      { path: '/admin', component: User },
      { path: 'edit-film/:id', component: EditFilm },
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
