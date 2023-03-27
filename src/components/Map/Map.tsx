import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import placeholder from "../../assets/images/placeholder.png";
import { useAppSelector } from "../../hooks/redux-hooks";
import { Dispatch, SetStateAction, useEffect } from "react";
import { IHotel, IPosition } from "../../types/types";
import selectPlaceholder from "../../assets/images/placeholder-select.png";

interface IResetCenterView {
  position: IPosition | undefined;
}
const ResetCenterView = ({ position }: IResetCenterView) => {
  const city = useAppSelector((state) => state.hotelReducer.cities[0]);
  const map = useMap();
  const cityLatitude: number = city.latitude;
  const cityLongitude: number = city.longitude;
  const selectPosition = {
    latitude: position?.lat ? position.lat : cityLatitude,
    longitude: position?.lon ? position.lon : cityLongitude,
  };

  useEffect(() => {
    if (selectPosition.latitude && selectPosition.longitude) {
      map.setView(
        L.latLng(selectPosition.latitude, selectPosition.longitude),
        map.getZoom(),
        { animate: true }
      );
    }
  }, [selectPosition.latitude, selectPosition.longitude, map]);

  return null;
};
interface IMap {
  hotelDataResult: IHotel[] | null;
  position: IPosition | undefined;
  setPosition: Dispatch<SetStateAction<IPosition | undefined>>;
}
const Map = ({ hotelDataResult, position, setPosition }: IMap) => {
  const icon = L.icon({
    iconUrl: placeholder,
    iconSize: [50, 50],
  });
  const selectIcon = L.icon({
    iconUrl: selectPlaceholder,
    iconSize: [50, 50],
  });

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      className={"map-container"}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hotelDataResult &&
        hotelDataResult.map((item, index) => (
          <Marker
            position={[item.latitude, item.longitude]}
            icon={
              item.latitude === position?.lat && item.longitude === position.lon
                ? selectIcon
                : icon
            }
            eventHandlers={{
              click: () => {
                setPosition({ lat: item.latitude, lon: item.longitude });
              },
            }}
            key={index}
          >
            <Popup>
              <span className="map-marker__popup">
                Hotel name: {item.hotel_name}
              </span>
            </Popup>
          </Marker>
        ))}
      <ResetCenterView position={position} />
    </MapContainer>
  );
};

export { Map };
