import { useState } from "react";
import { Finder } from "../../components/Finder/Finder";
import { Map } from "../../components/Map/Map";
import { Searchbox } from "../../components/Searchbox/Searchbox";
import { useAppSelector } from "../../hooks/redux-hooks";
import { IPosition } from "../../types/types";

const MapsPage = () => {
  const hotelDataResult = useAppSelector(
    (state) => state.hotelReducer.hotelResult
  );
  const [position, setPosition] = useState<IPosition>();
  return (
    <div className="maps-page">
      <div className="maps-page__wrapper wrapper">
        <Finder className={"maps-page__finder"} />
        <div className="maps-page__content">
          <div className="maps-page__searchbox">
            <Searchbox
              hotelDataResult={hotelDataResult}
              position={position}
              setPosition={setPosition}
            />
          </div>
          <div className="maps-page__map">
            <Map
              hotelDataResult={hotelDataResult}
              position={position}
              setPosition={setPosition}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { MapsPage };
