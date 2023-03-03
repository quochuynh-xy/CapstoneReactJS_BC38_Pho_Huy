import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./app/routes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { autoLogin } from "./features/Authentication/thunk";
import RoutesManagers from "./HOCs/RoutesManager";
// const mapRoutes = routes.map(({ path, component: Component }) => (
//   <Route path={path} element={<Component />} key={path} />
// ));
const mapRoutes = routes.map((page, index) => {
  return (
    <Route
      key={index}
      path={page.path}
      element={
        <RoutesManagers
          isPublic={page.isPublic}
          isAuth={page.isAuth}
          Component={page.component}
          redirectPatch={page.redirectPatch}
        />
      }
    />
  );
});
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const userToken = localStorage.getItem("cyberfilmToken");
    dispatch(autoLogin(userToken)); // Đăng nhập tự động;
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>{mapRoutes}</Routes>
    </BrowserRouter>
  );
}
export default App;
