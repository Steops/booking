import { Finder } from "../../components/Finder/Finder";
import { HotelList } from "../../components/HotelList/HotelList";
import { useAppSelector } from "../../hooks/redux-hooks";
import { Loader } from "../../uikit/Loader/loader";

const HotelsPage = () => {
  const hotelsFlag = useAppSelector(
    (state) => state.hotelReducer.flag.hotelsFlag
  );
  const hotelsResult = useAppSelector(
    (state) => state.hotelReducer.hotelResult
  );
  return (
    <div className="layout">
      <Finder className={"hotels-page__finder"} />
      {hotelsFlag === "pending" && (
        <h1 className="hotels-page__title">
          <Loader />
        </h1>
      )}
      {hotelsFlag === "rejected" && (
        <h1 className="hotels-page__title">
          Error. Please check the data and try again
        </h1>
      )}
      {hotelsFlag === "" && (
        <h1 className="hotels-page__title">
          Enter data to search for hotels &#128070;
        </h1>
      )}
      {!hotelsResult && hotelsFlag === "fulfilled" && (
        <h1 className="hotels-page__title">
          We couldn't find suitable options. Try changing the date or the number
          of rooms
        </h1>
      )}
      <HotelList hotelsResult={hotelsResult} />
    </div>
  );
};

export { HotelsPage };
