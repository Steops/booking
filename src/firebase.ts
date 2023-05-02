import { IHotelCard } from "./components/HotelCard/HotelCard";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

const REACT_APP_FIREBASE_API_KEY = "AIzaSyDwj7vQXlSrj_if9oAP9GC00JygoAsrtnM";
const REACT_APP_FIREBASE_AUTH_DOMAIN = "hotels-booking-pet.firebaseapp.com";
const REACT_APP_FIREBASE_PROJECT_ID = "hotels-booking-pet";
const REACT_APP_FIREBASE_STORAGE_BUCKET = "hotels-booking-pet.appspot.com";
const REACT_APP_FIREBASE_SENDER_ID = "15738383321";
const REACT_APP_FIREBASE_APP_ID = "1:15738383321:web:827799868b4f08cbe807c8";

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const GetUserFromFirestore = async (docName: string) => {
  const docRef = doc(db, `users`, `${docName}`);
  const targetDoc = await getDoc(docRef);
  return targetDoc.data();
};

export const SetNewUserToFirestore = async (userId: string) => {
  const docRef = doc(db, `users`, `${userId}`);
  await setDoc(docRef, {
    firstName: "Aurum",
    favoritesHotels: [],
    secondName: "Cink",
  });
};

export const SetFavoriteHotelToFirestore = async (
  userId: string | null,
  favoriteHotel: IHotelCard
) => {
  const docRef = doc(db, `users`, `${userId}`);
  await updateDoc(docRef, {
    favoritesHotels: arrayUnion(favoriteHotel),
  });
};

export const RemoveFavoriteHotelToFirestore = async (
  userId: string | null,
  favoriteHotel: IHotelCard
) => {
  const docRef = doc(db, `users`, `${userId}`);
  await updateDoc(docRef, {
    favoritesHotels: arrayRemove(favoriteHotel),
  });
};
