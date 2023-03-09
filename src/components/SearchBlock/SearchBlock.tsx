import { useState } from "react";
import { Calendar } from "react-calendar";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { CalendarIcon } from "../../uikit/CalendarIcon";
import { LocationIcon } from "../../uikit/LocationIcon";
import { LoupeIcon } from "../../uikit/LoupeIcon";
import { PersonIcon } from "../../uikit/PersonIcon";
import { WatchIcon } from "../../uikit/WatchIcon";
import { getHotels } from "../../utils/getHotels";
import "react-calendar/dist/Calendar.css";
import { hotelsSlice } from "../../store/slices/hotelsSlice";
import { getCityId } from "../../utils/getCityId";

interface IRequestHotel {
  destId: string;
  checkinDate: Date | string;
  checkoutDate: Date | string;
  room: number;
  guests: number;
}

const LocationInput = ({ setCityName }: any) => {
  return (
    <>
      <input
        type="text"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setCityName(event.target.value);
        }}
      />
    </>
  );
};

interface ICheck {
  setRequestHotel: any;
  requestHotel: IRequestHotel;
}
const Check = ({ setRequestHotel, requestHotel }: ICheck) => {
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  return (
    <div className="check">
      <button onClick={() => setCalendarOpen(!calendarOpen)}>Set date</button>
      <span>{`${requestHotel.checkinDate} — ${requestHotel.checkoutDate}`}</span>
      {calendarOpen && (
        <>
          <Calendar
            className="search-block__finder-calendar-1"
            onChange={(value: Date) => {
              const date = value.toLocaleDateString("en-ca");
              setRequestHotel({ ...requestHotel, checkinDate: date });
            }}
          />
          <Calendar
            className="search-block__finder-calendar-2"
            onChange={(value: Date) => {
              const date = value.toLocaleDateString("en-ca");
              setRequestHotel({ ...requestHotel, checkoutDate: date });
            }}
          />
        </>
      )}
    </div>
  );
};

interface IRoomInput {
  setRequestHotel: any;
  requestHotel: IRequestHotel;
}
const RoomInput = ({ setRequestHotel, requestHotel }: IRoomInput) => {
  return (
    <div className="input__container">
      <input
        type="number"
        className="input"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setRequestHotel({ ...requestHotel, room: event.target.value });
        }}
      />
      <span>Room</span>
      <input
        type="number"
        className="input"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setRequestHotel({ ...requestHotel, guests: event.target.value });
        }}
      />
      <span>Guests</span>
    </div>
  );
};

const Finder = () => {
  const [cityName, setCityName] = useState<string>("");
  const [requestHotel, setRequestHotel] = useState<IRequestHotel>({
    destId: "",
    checkinDate: "",
    checkoutDate: "",
    room: 1,
    guests: 1,
  });

  const dataFinder = [
    {
      icon: <LocationIcon />,
      title: "Location",
      description: <LocationInput setCityName={setCityName} />,
    },
    {
      icon: <CalendarIcon />,
      title: "Set date",
      description: (
        <Check setRequestHotel={setRequestHotel} requestHotel={requestHotel} />
      ),
    },
    {
      icon: <PersonIcon />,
      title: "Rooms for",
      description: (
        <RoomInput
          setRequestHotel={setRequestHotel}
          requestHotel={requestHotel}
        />
      ),
    },
  ];

  async function getRequestHotel() {
    const data = await getCityId(cityName);
    const dest_id = data[0].dest_id;
    const hotel = { ...requestHotel, destId: dest_id };
    return hotel;
  }

  async function postHotels(hotel: IRequestHotel) {
    const hotels = await getHotels(hotel);
    console.log(hotels, "отели внатуре");
    return hotels;
  }
  const dispatch = useAppDispatch();
  const { getHotelsData } = hotelsSlice.actions;

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
          getRequestHotel().then((hotel) => {
            postHotels(hotel).then((hotels) => {
              dispatch(getHotelsData(hotels.result));
            });
          });
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

const SearchBlock = () => {
  return (
    <div className="search-block">
      <div className="search-block__wrapper wrapper">
        <div className="search-block__content">
          <h1 className="search-block__content-title">
            Find your perfect place to stay
          </h1>
          <span className="search-block__content-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </span>
          <div className="search-block__content-link">
            <button className="search-block__content-link-btn">
              <WatchIcon />
            </button>
            <span className="search-block__content-link-description">
              Watch video
            </span>
          </div>
        </div>
        <Finder />
      </div>
    </div>
  );
};

export { SearchBlock };
