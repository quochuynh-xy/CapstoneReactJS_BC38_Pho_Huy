import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {  routes, routesAdmin } from "./app/routes";
import Header from "./components/Header";

const mapRoutes = routes.map(({ path, component: Component }) => (
  <Route path={path} element={<Component />} key={path} />
));

const mapRoutesAdmin = routesAdmin.map(({path, component: Component, children})=> {
  return <Route path={path} element={<Component />} key={path}>
    {children?.map(item=>{
      return <Route path={item.path} key={item.path} element={<item.component />}/>
    })}
  </Route>
})

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>{mapRoutes}
        {mapRoutesAdmin}
      </Routes>

    </BrowserRouter>
  );
}

export default App;
