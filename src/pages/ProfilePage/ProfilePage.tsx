import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { HotelCard } from "../../components/HotelCard/HotelCard";
import { GetUserFromFirestore } from "../../firebase";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { setCurrentUser } from "../../store/slices/userSlice";

const ProfilePage = () => {
  const userData = useAppSelector((state) => state.userReducer.currentUser);
  const userId = useAppSelector((state) => state.userReducer.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    GetUserFromFirestore(`${userId}`).then(
      (result) => dispatch(setCurrentUser(result)),
      (error) => console.log(error, "error")
    );
  }, [userId, dispatch]);
  const authUser = getAuth().currentUser;
  return (
    <div className="profile-page">
      <div className="profile-page__wrapper wrapper">
        <h1>Profile Page</h1>
        <span>Email: {authUser?.email}</span>
        Favorites hotels:
        <div className="profile-page__hotel-list">
          {userData.favoritesHotels &&
            userData.favoritesHotels?.map((item, index) => (
              <HotelCard
                imgSrc={item.imgSrc}
                address={item.address}
                hotelName={item.hotelName}
                score={item.score}
                currency={item.currency}
                price={item.price}
                key={index}
                authUser={authUser}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export { ProfilePage };
