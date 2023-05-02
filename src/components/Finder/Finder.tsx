import { Dispatch, SetStateAction, useState } from "react";
import { Calendar } from "react-calendar";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { fetchCities } from "../../utils/fetchCities";
import { hotelSlice } from "../../store/slices/hotelSlice";
import { ILocationInput } from "../../types/types";
import { fetchHotels } from "../../utils/fetchHotels";
import {
  CalendarIcon,
  LocationIcon,
  LoupeIcon,
  PersonIcon,
} from "../../uikit/Icon";
import { Portal } from "../Portal/Portal";

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

interface ICheck {
  setCheckOpen: Dispatch<SetStateAction<boolean>>;
}
const Check = ({ setCheckOpen }: ICheck) => {
  const dispatch = useAppDispatch();
  const { setCheckInDate, setCheckOutDate } = hotelSlice.actions;
  const setCheckDate = (value: Date[]) => {
    const checkInDate = value[0].toLocaleDateString("en-ca");
    const checkOutDate = value[1].toLocaleDateString("en-ca");
    dispatch(setCheckInDate(checkInDate));
    dispatch(setCheckOutDate(checkOutDate));
  };
  return (
    <div className="portal-modal">
      <div className="portal-modal__content">
        <Calendar
          className="portal-modal__calendar"
          onChange={(value: Date[]) => {
            setCheckDate(value);
          }}
          selectRange={true}
          minDate={new Date()}
        />
        <button className="btn" onClick={() => setCheckOpen(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

interface IRoomInput {
  setRoomInputOpen: Dispatch<SetStateAction<boolean>>;
}
const RoomInput = ({ setRoomInputOpen }: IRoomInput) => {
  const [roomCount, setRoomCount] = useState(1);
  const [guestsCount, setGuestsCount] = useState(1);
  const dispatch = useAppDispatch();
  const { setRoom, setGuests } = hotelSlice.actions;
  const setOptions = (roomCount: number, guestsCount: number) => {
    dispatch(setRoom(roomCount));
    dispatch(setGuests(guestsCount));
    setRoomInputOpen(false);
  };
  return (
    <div className="portal-modal">
      <div className="portal-modal__content">
        <div className="portal-modal__counter">
          <h3 className="portal-modal__title">Room</h3>
          <span className="portal-modal__count">{roomCount}</span>
          <button
            onClick={() => {
              setRoomCount(roomCount + 1);
            }}
            className="portal-modal__btn"
            disabled={roomCount === 3}
          >
            +
          </button>
          <button
            onClick={() => {
              setRoomCount(roomCount - 1);
            }}
            className="portal-modal__btn"
            disabled={roomCount === 1}
          >
            –
          </button>
        </div>

        <div className="portal-modal__counter">
          <h3 className="portal-modal__title">Guests</h3>
          <span className="portal-modal__count">{guestsCount}</span>
          <button
            onClick={() => {
              setGuestsCount(guestsCount + 1);
            }}
            className="portal-modal__btn"
            disabled={guestsCount === 6}
          >
            +
          </button>
          <button
            onClick={() => {
              setGuestsCount(guestsCount - 1);
            }}
            className="portal-modal__btn"
            disabled={guestsCount === 1}
          >
            –
          </button>
        </div>

        <button
          onClick={() => {
            setOptions(roomCount, guestsCount);
          }}
          className="btn"
        >
          Submit
        </button>
      </div>
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
  const room = useAppSelector((state) => state.hotelReducer.requestHotel.room);
  const guests = useAppSelector(
    (state) => state.hotelReducer.requestHotel.guests
  );
  const NewCheckInDate = new Date(requestHotel.checkinDate);
  const NewCheckOutDate = new Date(requestHotel.checkoutDate);

  const checkInDay = NewCheckInDate.toLocaleDateString("en", {
    day: "numeric",
    month: "short",
  });
  const checkOutDay = NewCheckOutDate.toLocaleDateString("en", {
    day: "numeric",
    month: "short",
  });
  const [isRoomInputOpen, setRoomInputOpen] = useState(false);
  const [isCheckOpen, setCheckOpen] = useState(false);

  const dataFinder = [
    {
      icon: <LocationIcon />,
      title: "Location",
      description: <LocationInput cityName={requestHotel.city} />,
      setPortalChildren: () => {
        ("");
      },
    },
    {
      icon: <CalendarIcon />,
      title: "Your date",
      description: `${
        requestHotel.checkinDate
          ? `for ${checkInDay} to ${checkOutDay}`
          : "Set your date!"
      }`,
      setPortalChildren: () => {
        setCheckOpen(true);
      },
    },
    {
      icon: <PersonIcon />,
      title: "Options",
      description: `${room} room, ${guests} guests`,
      setPortalChildren: () => {
        setRoomInputOpen(true);
      },
    },
  ];
  return (
    <div className={`${className} finder `}>
      {dataFinder.map((item, index) => (
        <div className="finder__item" key={index}>
          {item.icon}
          <div
            className="finder__item-text"
            onClick={() => {
              item.setPortalChildren();
            }}
          >
            <span className="finder__item-title">{item.title}</span>
            <span className="finder__item-description">{item.description}</span>
          </div>
        </div>
      ))}
      <button
        className="finder__search"
        onClick={() => {
          dispatch(fetchCities(requestHotel.city))
            .then((res) => {
              dispatch(deleteHotels());
              dispatch(
                fetchHotels({ ...requestHotel, destId: res.payload[0].dest_id })
              );
            })
            .then(navigates());
        }}
      >
        <LoupeIcon />
        Search...
      </button>

      {isCheckOpen && (
        <Portal setPortalOpen={setCheckOpen}>
          <Check setCheckOpen={setCheckOpen} />
        </Portal>
      )}
      {isRoomInputOpen && (
        <Portal setPortalOpen={setRoomInputOpen}>
          <RoomInput setRoomInputOpen={setRoomInputOpen} />
        </Portal>
      )}
    </div>
  );
};

export { Finder };
