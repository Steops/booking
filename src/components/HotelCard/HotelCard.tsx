import { User } from "firebase/auth";
import { ButtonLike } from "../ButtonLike/ButtonLike";

export interface IHotelCard {
  imgSrc: string;
  address: string;
  hotelName: string;
  score: number;
  currency: string;
  price: number;
  authUser?: User | null;
}
const HotelCard = ({
  imgSrc,
  address,
  hotelName,
  score,
  currency,
  price,
  authUser,
}: IHotelCard) => {
  const HotelCardData = {
    imgSrc: imgSrc,
    address: address,
    hotelName: hotelName,
    score: score,
    currency: currency,
    price: price,
  };

  const formatConfig = {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    currencyDisplay: "symbol",
  };

  const britishNumberFormatter = Intl.NumberFormat("en-GB", formatConfig);
  const currencyItem = britishNumberFormatter.format(price);
  const StarRating = () => {
    return (
      <div className="hotel-card__star-rating">
        <div className="hotel-card__star-rating-star">★</div>
        <div className="hotel-card__star-rating-score">
          {score ? score : "||"}
        </div>
      </div>
    );
  };
  return (
    <div className="hotel-card">
      <img src={imgSrc} alt={hotelName} className="hotel-card__img" />
      <div className="hotel-card__description">
        <span className="hotel-card__address">{address}</span>
        <h1 className="hotel-card__title">{hotelName}</h1>
        <div className="hotel-card__conditions">
          <span className="hotel-card__price">{currencyItem} Per night</span>
          <StarRating />
          {authUser && <ButtonLike hotelCard={HotelCardData} />}
        </div>
      </div>
    </div>
  );
};

export { HotelCard };
