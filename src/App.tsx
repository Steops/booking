import { Route, Routes } from "react-router-dom";
import "./assets/scss/index.scss";
import { Header } from "./components/Header/Header";
import { HotelsPage } from "./pages/HotelsPage";
import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";
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
      </Routes>
    </div>
  );
};

export default App;
