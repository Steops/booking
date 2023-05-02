import { WatchIcon } from "../../uikit/Icon";
import "react-calendar/dist/Calendar.css";
import { Finder } from "../Finder/Finder";
import { useNavigate } from "react-router-dom";

const SearchBlock = () => {
  const navigate = useNavigate();
  return (
    <div className="search-block">
      <div className="search-block__content">
        <h1 className="search-block__title">Find your perfect place to stay</h1>
        <span className="search-block__description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </span>
        <div className="search-block__link">
          <a
            className="search-block__btn"
            href="https://youtu.be/dQw4w9WgXcQ?t=85"
            target="_blank"
            rel="noreferrer"
          >
            <WatchIcon />
          </a>
          <span className="search-block__link-description">Watch video</span>
        </div>
      </div>
      <Finder
        className={"search-block__finder"}
        navigates={() => {
          navigate("/searchresult");
        }}
      />
    </div>
  );
};

export { SearchBlock };
