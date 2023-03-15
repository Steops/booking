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

const LocationInput = () => {
  const { setCity } = hotelSlice.actions;
  const dispatch = useAppDispatch();
  return (
    <>
      <input
        type="text"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          dispatch(setCity(event.target.value));
        }}
      />
    </>
  );
};

const Check = ({ checkinDate, checkoutDate }: ICheck) => {
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { setCheckInDate, setCheckOutDate } = hotelSlice.actions;
  return (
    <div className="check">
      <button onClick={() => setCalendarOpen(!calendarOpen)}>Set date</button>
      <span>{`${checkinDate} --- ${checkoutDate}`}</span>
      {calendarOpen && (
        <>
          <Calendar
            className="search-block__finder-calendar-1"
            onChange={(value: Date) => {
              const date = value.toLocaleDateString("en-ca");
              dispatch(setCheckInDate(date));
            }}
          />
          <Calendar
            className="search-block__finder-calendar-2"
            onChange={(value: Date) => {
              const date = value.toLocaleDateString("en-ca");
              dispatch(setCheckOutDate(date));
            }}
          />
        </>
      )}
    </div>
  );
};

const RoomInput = () => {
  const dispatch = useAppDispatch();
  const { setRoom, setGuests } = hotelSlice.actions;
  return (
    <div className="input__container">
      <input
        type="number"
        className="input"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          dispatch(setRoom(event.target.value));
        }}
      />
      <span>Room</span>
      <input
        type="number"
        className="input"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          dispatch(setGuests(event.target.value));
        }}
      />
      <span>Guests</span>
    </div>
  );
};

const Finder = () => {
  const dispatch = useAppDispatch();
  const requestHotel = useAppSelector(
    (state) => state.hotelReducer.requestHotel
  );

  const dataFinder = [
    {
      icon: <LocationIcon />,
      title: "Location",
      description: <LocationInput />,
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
    <div className="search-block__finder">
      {dataFinder.map((item, index) => (
        <div className="search-block__finder-item" key={index}>
          {item.icon}
          <div className="search-block__finder-item-text">
            <span className="search-block__finder-item-text-title">
              {item.title}
            </span>
            <span className="search-block__finder-item-text-description">
              {item.description}
            </span>
          </div>
        </div>
      ))}
      <button
        className="search-block__finder-search"
        onClick={() => {
          dispatch(fetchCities(requestHotel.city));
          dispatch(fetchHotels(requestHotel));
        }}
      >
        <LoupeIcon />
        <span className="search-block__finder-search-description">
          Search...
        </span>
      </button>
    </div>
  );
};

export { Finder };
