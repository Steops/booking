import { HotelsPage } from "../pages/HotelsPage/HotelsPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { MainPage } from "../pages/MainPage/MainPage";
import { MapsPage } from "../pages/MapsPage/MapsPage";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import { RegisterPage } from "../pages/RegisterPage";

const REGISTER_PATH = "/register";
const LOGIN_PATH = "/login";
const SEARCH_RESULT_PATH = "/searchresult";
const MAP_SEARCH_PATH = "/mapsearch";
const PROFILE = "/profile";
const MAIN_PAGE = "/";

export const publicRoutes = [
  { path: MAIN_PAGE, element: <MainPage /> },
  { path: REGISTER_PATH, element: <RegisterPage /> },
  { path: LOGIN_PATH, element: <LoginPage /> },
  { path: SEARCH_RESULT_PATH, element: <HotelsPage /> },
  { path: MAP_SEARCH_PATH, element: <MapsPage /> },
];

export const privateRoutes = [{ path: PROFILE, element: <ProfilePage /> }];
