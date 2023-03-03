import Home from "../features/Booking/Home";
import Seats from "../features/Booking/Seats";
import Detail from "../features/Booking/Detail";
import SignIn from "../features/Authentication/SignIn";
import SignUp from "../features/Authentication/SignUp";
import NotFound404 from "../components/NotFound404";
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
    path: "*",
    component: NotFound404,
    isPublic: true,
    isAuth: false,
    redirectPatch: "/",  },
];
/**
 * Mảng routes này sẽ được map ra từng componet: <Route patch="/Booking/Seats" element={<Seats/>} />
 * tại App.js
 * Không có liệt kê App.js
 *  */
