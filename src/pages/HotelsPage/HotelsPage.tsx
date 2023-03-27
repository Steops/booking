import { Finder } from "../../components/Finder/Finder";
import { HotelList } from "../../components/HotelList/HotelList";
import { useAppSelector } from "../../hooks/redux-hooks";

const HotelsPage = () => {
  const hotelsFlag = useAppSelector(
    (state) => state.hotelReducer.flag.hotelsFlag
  );
  return (
    <div className="layout">
      <Finder className={"hotels-page__finder"} />
      {hotelsFlag === "pending" && (
        <h1 className="hotels-page__title">Loading hotels...</h1>
      )}
      {hotelsFlag === "rejected" && (
        <h1 className="hotels-page__title">
          Error. Please check the data and try again
        </h1>
      )}
      <HotelList />
    </div>
  );
};

export { HotelsPage };
