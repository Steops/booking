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

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKER,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
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
