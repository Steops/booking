import { useEffect } from "react";
import { HotelList } from "../../components/HotelList/HotelList";
import { SearchBlock } from "../../components/SearchBlock/SearchBlock";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { fetchPopularHotels } from "../../utils/fetchPopularHotels";

const MainPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPopularHotels());
  }, [dispatch]);

  const hotelsResult = useAppSelector(
    (state) => state.hotelReducer.popularHotelsResult
  );
  const popularHotel = hotelsResult?.slice(0, 3);

  return (
    <main className="main-page">
      <div className="main-page__wrapper wrapper">
        <SearchBlock />
        <div className="main-page__popular">
          <h2 className="main-page__popular-title">Our most popular hotel</h2>
          <span className="main-page__popular-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </span>
          <HotelList hotelsResult={popularHotel} />
        </div>
      </div>
    </main>
  );
};

export { MainPage };
