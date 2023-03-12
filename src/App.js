import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {  routes, routesAdmin } from "./app/routes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { autoLogin } from "./features/Authentication/thunk";
import RoutesManagers from "./HOCs/RoutesManager";
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
const mapRoutesAdmin = routesAdmin.map(({path, component: Component, children})=> {
  return <Route path={path} element={<Component />} key={path}>
  {children?.map(Item=>{
    return <Route path={Item.path} key={Item.path} element={<Item.component />}/>
  })}
   </Route>
})
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const userToken = localStorage.getItem("cyberfilmToken");
    dispatch(autoLogin(userToken)); // Đăng nhập tự động;
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        {mapRoutes}
        {mapRoutesAdmin}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
