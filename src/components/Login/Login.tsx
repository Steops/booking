import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { setUser } from "../../store/slices/userSlice";
import { Form } from "../Form/Form";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        navigate("/");
      })
      .catch(() => alert("We couldn't find the user. Try again"));
  };

  return (
    <div className="login">
      <Form title="LOGIN" handleClick={handleLogin} btnText="Sign In" />
    </div>
  );
};

export { Login };
