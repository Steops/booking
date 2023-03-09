import { Link } from "react-router-dom";
import { SignUp } from "../components/SignUp/SignUp";

const RegisterPage = () => {
  return (
    <div>
      <p>RegisterPage</p>
      <SignUp />
      <p>
        Есть аккаунт? Пиздуй логиниться <Link to="/login">тык</Link>
      </p>
    </div>
  );
};

export { RegisterPage };
