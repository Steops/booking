import { useAppSelector } from "../../hooks/redux-hooks";
import { HotelCard } from "../HotelCard/HotelCard";

const HotelList = () => {
  const hotelsResult = useAppSelector(
    (state) => state.hotelReducer.hotelResult
  );
  console.log(hotelsResult, "hotelsData");
  return (
    <div className="hotel-list">
      <div className="hotel-list__wrapper wrapper">
        <div className="hotel-list__content">
          {hotelsResult?.map((item, index) => (
            <div key={index}>
              <HotelCard
                imgSrc={item.max_1440_photo_url}
                address={item.address}
                hotelName={item.hotel_name}
                score={item.review_score}
                currency={item.price_breakdown.currency}
                price={
                  item.composite_price_breakdown.gross_amount_per_night.value
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { HotelList };
