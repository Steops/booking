import { getAuth } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";
import { useAppSelector } from "../../hooks/redux-hooks";
import { IHotel, IPosition } from "../../types/types";
import { ButtonLike } from "../ButtonLike/ButtonLike";

interface ISearchbox {
  hotelDataResult: IHotel[] | null;
  setPosition: Dispatch<SetStateAction<IPosition | undefined>>;
  position: IPosition | undefined;
}
interface ISearchboxCard {
  position: IPosition | undefined;
  setPosition: Dispatch<SetStateAction<IPosition | undefined>>;
  imgSrc: string;
  address: string;
  hotelName: string;
  score: number;
  currency: string;
  price: number;
  latitude: number;
  longitude: number;
}

const SearchboxCard = ({
  position,
  setPosition,
  imgSrc,
  address,
  hotelName,
  score,
  currency,
  price,
  latitude,
  longitude,
}: ISearchboxCard) => {
  const HotelCardData = {
    imgSrc: imgSrc,
    address: address,
    hotelName: hotelName,
    score: score,
    currency: currency,
    price: price,
  };

  const authUser = getAuth().currentUser;

  return (
    <div
      className={`search-box__card ${
        position?.lat === latitude && position.lon === longitude
          ? "--active"
          : ""
      }`}
      onClick={() => {
        setPosition({ lat: latitude, lon: longitude });
      }}
    >
      <img src={imgSrc} alt={hotelName} className="search-box__img" />
      <h1 className="search-box__title">{hotelName}</h1>
      <div className="search-box__grade">
        <span className="search-box__star">★</span>
        <span className="search-box__score">
          {score ? score.toFixed(1) : "**"}
        </span>
        {authUser && <ButtonLike hotelCard={HotelCardData} />}
      </div>
    </div>
  );
};
const Searchbox = ({ hotelDataResult, position, setPosition }: ISearchbox) => {
  const hotelsFlag = useAppSelector(
    (state) => state.hotelReducer.flag.hotelsFlag
  );
  return (
    <div className="search-box">
      {hotelDataResult &&
        hotelDataResult.map((item, index) => (
          <SearchboxCard
            position={position}
            setPosition={setPosition}
            imgSrc={item.main_photo_url}
            address={item.address}
            hotelName={item.hotel_name}
            score={item.review_score}
            currency={item.price_breakdown.currency}
            price={item.composite_price_breakdown.gross_amount_per_night.value}
            latitude={item.latitude}
            longitude={item.longitude}
            key={index}
          />
        ))}
      {hotelsFlag === "" && (
        <h2 className="search-box__error">
          Enter data to search for hotels &#128070;
        </h2>
      )}
      {hotelsFlag === "pending" && (
        <h2 className="search-box__error">Loading hotels...</h2>
      )}
    </div>
  );
};

export { Searchbox };
