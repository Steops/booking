import { WatchIcon } from "../../uikit/WatchIcon";
import "react-calendar/dist/Calendar.css";
import { Finder } from "../Finder/Finder";

const SearchBlock = () => {
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
        <Finder />
      </div>
    </div>
  );
};

export { SearchBlock };
