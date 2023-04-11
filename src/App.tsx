import "./assets/scss/index.scss";
import { AppRouter } from "./components/AppRouter";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

const App = () => {
  return (
    <div className="layout">
      <Header />
      <AppRouter />
      <Footer />
    </div>
  );
};

export default App;
