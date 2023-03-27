interface IHotelCard {
  imgSrc: string;
  address: string;
  hotelName: string;
  score: number;
  currency: string;
  price: number;
}
const HotelCard = ({
  imgSrc,
  address,
  hotelName,
  score,
  currency,
  price,
}: IHotelCard) => {
  const StarRating = () => {
    return (
      <div className="hotel-card__description-conditions-star-rating">
        <div className="hotel-card__description-conditions-star-rating-star">
          ★
        </div>
        <div className="hotel-card__description-conditions-star-rating-score">
          {score ? score : "No result :("}
        </div>
      </div>
    );
  };
  return (
    <div className="hotel-card">
      <img src={imgSrc} alt={hotelName} className="hotel-card__img" />
      <div className="hotel-card__description">
        <span className="hotel-card__description-address">{address}</span>
        <h1 className="hotel-card__description-title">{hotelName}</h1>
        <div className="hotel-card__description-conditions">
          <span className="hotel-card__description-conditions-price">
            {currency} {Math.round(price)} Per night
          </span>
          <StarRating />
        </div>
      </div>
    </div>
  );
};

export { HotelCard };
