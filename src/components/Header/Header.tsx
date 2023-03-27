import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { useAuth } from "../../hooks/useAuth";
import { removeUser } from "../../store/slices/userSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();

  const dataLink = [
    { name: "Main", link: "/" },
    { name: "Facilities", link: "/login" },
    { name: "About Us", link: "/login" },
    { name: "Maps", link: "/mapsearch" },
    { name: "Contact", link: "/login" },
  ];
  return (
    <header className="header">
      <div className="header__wrapper wrapper">
        <div className="header__links">
          {dataLink.map((link, index) => (
            <Link to={link.link} key={index} className="header__links-path">
              {link.name}
            </Link>
          ))}
        </div>
        <div className="header__btns">
          {isAuth ? (
            <button
              className="header__btns-link btn"
              onClick={() => dispatch(removeUser())}
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link to="/login" className="header__btns-link btn">
                Sign In
              </Link>
              <Link to="/register" className="header__btns-link btn">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export { Header };
