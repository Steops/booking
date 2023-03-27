import { Route, Routes } from "react-router-dom";
import "./assets/scss/index.scss";
import { Header } from "./components/Header/Header";
import { HotelsPage } from "./pages/HotelsPage/HotelsPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MainPage } from "./pages/MainPage";
import { MapsPage } from "./pages/MapsPage/MapsPage";
import { RegisterPage } from "./pages/RegisterPage";

const App = () => {
  return (
    <div className="layout">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/searchresult" element={<HotelsPage />} />
        <Route path="/mapsearch" element={<MapsPage />} />
      </Routes>
    </div>
  );
};

export default App;
