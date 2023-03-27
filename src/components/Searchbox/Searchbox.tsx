import { Dispatch, SetStateAction } from "react";
import { IHotel, IPosition } from "../../types/types";

interface ISearchbox {
  hotelDataResult: IHotel[] | null;
  setPosition: Dispatch<SetStateAction<IPosition | undefined>>;
  position: IPosition | undefined;
}

const Searchbox = ({ hotelDataResult, position, setPosition }: ISearchbox) => {
  return (
    <div className="search-box">
      {hotelDataResult &&
        hotelDataResult.map((item, index) => (
          <div
            className={`search-box__card ${
              position?.lat === item.latitude && position.lon === item.longitude
                ? "--active"
                : ""
            }`}
            key={index}
            onClick={() => {
              setPosition({ lat: item.latitude, lon: item.longitude });
            }}
          >
            <img
              src={item.main_photo_url}
              alt={item.hotel_name}
              className="search-box__card-img"
            />
            <h1 className="search-box__card-title">{item.hotel_name}</h1>
            <div className="search-box__card-grade">
              <span className="search-box__card-star">★</span>
              <span className="search-box__card-score">
                {item.review_score ? item.review_score.toFixed(1) : "**"}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export { Searchbox };
