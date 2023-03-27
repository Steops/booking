import { WatchIcon } from "../../uikit/WatchIcon";
import "react-calendar/dist/Calendar.css";
import { Finder } from "../Finder/Finder";
import { useNavigate } from "react-router-dom";

const SearchBlock = () => {
  const navigate = useNavigate();
  return (
    <div className="search-block">
      <div className="search-block__wrapper wrapper">
        <div className="search-block__content">
          <h1 className="search-block__content-title">
            Find your perfect place to stay
          </h1>
          <span className="search-block__content-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </span>
          <div className="search-block__content-link">
            <button className="search-block__content-link-btn">
              <WatchIcon />
            </button>
            <span className="search-block__content-link-description">
              Watch video
            </span>
          </div>
        </div>
        <Finder
          className={"search-block__finder"}
          navigates={() => {
            navigate("/searchresult");
          }}
        />
      </div>
    </div>
  );
};

export { SearchBlock };
