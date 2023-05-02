import { useEffect, useState } from "react";
import {
  RemoveFavoriteHotelToFirestore,
  SetFavoriteHotelToFirestore,
} from "../../firebase";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { setFavoriteHotel } from "../../store/slices/userSlice";
import { IHotelCard } from "../HotelCard/HotelCard";

interface IButtonLike {
  hotelCard: IHotelCard;
}
const ButtonLike = ({ hotelCard }: IButtonLike) => {
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);
  const favoritesHotels = useAppSelector(
    (state) => state.userReducer.currentUser.favoritesHotels
  );
  const userId = useAppSelector((state) => state.userReducer.id);
  useEffect(() => {
    if (favoritesHotels) {
      const indexHotel = favoritesHotels.findIndex(
        (e) => e.address === hotelCard.address
      );
      if (indexHotel !== -1) {
        setAdded(true);
      } else {
        setAdded(false);
      }
    }
  }, [hotelCard.address, favoritesHotels]);
  return (
    <button
      onClick={() => {
        dispatch(setFavoriteHotel(hotelCard));
        !added
          ? SetFavoriteHotelToFirestore(userId, hotelCard)
          : RemoveFavoriteHotelToFirestore(userId, hotelCard);
      }}
      className={`button-like ${added ? "--active" : ""}`}
    >
      ♥
    </button>
  );
};

export { ButtonLike };
