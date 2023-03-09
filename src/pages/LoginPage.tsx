import { Link } from "react-router-dom";
import { Login } from "../components/Login/Login";

const LoginPage = () => {
  return (
    <div>
      <p>LoginPage</p>
      <Login />
      <p>
        Нет аккаунта? Не вопрос! <Link to="/register">тык</Link>
      </p>
    </div>
  );
};

export { LoginPage };
