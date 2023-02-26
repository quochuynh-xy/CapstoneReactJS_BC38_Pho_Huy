import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./app/routes";
const mapRoutes = routes.map(({ path, component: Component }) => (
  <Route path={path} element={<Component />} key={path} />
));
function App() {
  return (
    <BrowserRouter>
      <Routes>{mapRoutes}</Routes>
    </BrowserRouter>
  );
}
export default App;
