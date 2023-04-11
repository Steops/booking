import { getAuth } from "firebase/auth";
import { IHotel } from "../../types/types";
import { Loader } from "../../uikit/Loader/loader";
import { HotelCard } from "../HotelCard/HotelCard";

interface IHotelList {
  hotelsResult: IHotel[] | undefined | null;
}
const HotelList = ({ hotelsResult }: IHotelList) => {
  const authUser = getAuth().currentUser;
  return (
    <div className="hotel-list">
      <div className="hotel-list__wrapper wrapper">
        <div className="hotel-list__content">
          {hotelsResult ? (
            hotelsResult.map((item, index) => (
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
                  authUser={authUser}
                />
              </div>
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export { HotelList };
