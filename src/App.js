import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {  routes, routesAdmin } from "./app/routes";
import Header from "./components/Header";

const mapRoutes = routes.map(({ path, component: Component }) => (
  <Route path={path} element={<Component />} key={path} />
));

const mapRoutesAdmin = routesAdmin.map(({path, component: Component, children})=> {
  return <Routes path={path} element={<Component />} key={path} >
    {children?.map(item=>{
      return <Route path={item.path} key={item.path} element={<item.component />}/>
    })}
  </Routes>
})

function App() {
  return (
    <BrowserRouter>
    <Header />
    {mapRoutesAdmin}
      <Routes>{mapRoutes}</Routes>
    </BrowserRouter>
  );
}

export default App;
