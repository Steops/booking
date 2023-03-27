import { useState } from "react";
import { Calendar } from "react-calendar";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { fetchCities } from "../../utils/fetchCities";
import { hotelSlice } from "../../store/slices/hotelSlice";
import { ICheck } from "../../types/types";
import { CalendarIcon } from "../../uikit/CalendarIcon";
import { LocationIcon } from "../../uikit/LocationIcon";
import { LoupeIcon } from "../../uikit/LoupeIcon";
import { PersonIcon } from "../../uikit/PersonIcon";
import { fetchHotels } from "../../utils/fetchHotels";

interface ILocationInput {
  cityName: string;
}
const LocationInput = ({ cityName }: ILocationInput) => {
  const { setCity } = hotelSlice.actions;
  const dispatch = useAppDispatch();
  return (
    <>
      <input
        type="text"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          dispatch(setCity(event.target.value));
        }}
        className="location-input"
        value={cityName}
      />
    </>
  );
};

const Check = ({ checkinDate, checkoutDate }: ICheck) => {
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { setCheckInDate, setCheckOutDate } = hotelSlice.actions;
  const NewCheckInDate = new Date(checkinDate);
  const NewCheckOutDate = new Date(checkoutDate);
  const checkInDay = NewCheckInDate.toLocaleDateString("en", {
    day: "numeric",
    month: "short",
  });
  const checkOutDay = NewCheckOutDate.toLocaleDateString("en", {
    day: "numeric",
    month: "short",
  });
  return (
    <div className="finder__item-check">
      <span
        onClick={() => setCalendarOpen(!calendarOpen)}
        className="finder__item-check-description"
      >
        {checkinDate ? `for ${checkInDay} to ${checkOutDay}` : "Set your date!"}
      </span>
      {calendarOpen && (
        <div className="finder__modal finder__item-check-modal">
          <div
            className="finder__modal-overlay finder__item-check-modal-overlay"
            onClick={() => setCalendarOpen(false)}
          ></div>
          <div className="finder__modal-content finder__item-check-modal-content">
            <Calendar
              className="finder__calendar finder__item-check-calendar"
              onChange={(value: any) => {
                const checkInDate = value[0].toLocaleDateString("en-ca");
                const checkOutDate = value[1].toLocaleDateString("en-ca");
                dispatch(setCheckInDate(checkInDate));
                dispatch(setCheckOutDate(checkOutDate));
              }}
              selectRange={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const RoomInput = () => {
  const [roomInputOpen, setRoomInputOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { setRoom, setGuests } = hotelSlice.actions;
  const room = useAppSelector((state) => state.hotelReducer.requestHotel.room);
  const guests = useAppSelector(
    (state) => state.hotelReducer.requestHotel.guests
  );
  return (
    <div className="finder__item-text-description-room-input">
      <span onClick={() => setRoomInputOpen(!roomInputOpen)}>
        {room} room, {guests} guests
      </span>
      {roomInputOpen && (
        <div className="finder__modal finder__item-roominput-modal">
          <div
            className="finder__modal-overlay finder__item-roominput-modal-overlay"
            onClick={() => {
              setRoomInputOpen(false);
            }}
          ></div>
          <div className="finder__modal-content finder__item-roominput-modal-content">
            <span className="finder__item-roominput-title">Room</span>
            <input
              type="number"
              className="finder__item-roominput-input"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setRoom(event.target.value));
              }}
            />
            <span className="finder__item-roominput-title">Guests</span>
            <input
              type="number"
              className="finder__item-roominput-input"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setGuests(event.target.value));
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
interface IFinder {
  className?: string;
  navigates?: any;
}

const Finder = ({ className, navigates }: IFinder) => {
  const dispatch = useAppDispatch();
  const requestHotel = useAppSelector(
    (state) => state.hotelReducer.requestHotel
  );
  const { deleteHotels } = hotelSlice.actions;

  const dataFinder = [
    {
      icon: <LocationIcon />,
      title: "Location",
      description: <LocationInput cityName={requestHotel.city} />,
    },
    {
      icon: <CalendarIcon />,
      title: "Set date",
      description: (
        <Check
          checkinDate={requestHotel.checkinDate}
          checkoutDate={requestHotel.checkoutDate}
        />
      ),
    },
    {
      icon: <PersonIcon />,
      title: "Rooms for",
      description: <RoomInput />,
    },
  ];
  return (
    <div className={`${className} finder `}>
      {dataFinder.map((item, index) => (
        <div className="finder__item" key={index}>
          {item.icon}
          <div className="finder__item-text">
            <span className="finder__item-text-title">{item.title}</span>
            <span className="finder__item-text-description">
              {item.description}
            </span>
          </div>
        </div>
      ))}
      <button
        className="finder__search"
        onClick={() => {
          dispatch(fetchCities(requestHotel.city))
            .then((res: any) => {
              dispatch(deleteHotels());
              dispatch(
                fetchHotels({ ...requestHotel, destId: res.payload[0].dest_id })
              );
            })
            .then(navigates());
        }}
      >
        <LoupeIcon />
        <span className="finder__search-description">Search...</span>
      </button>
    </div>
  );
};

export { Finder };

// react hook form посмотреть
// formik посмотреть
