import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { privateRoutes } from "../utils/routes";
import { publicRoutes } from "../utils/routes";

const AppRouter = () => {
  const { isAuth } = useAuth();
  return (
    <Routes>
      {publicRoutes.map(({ path, element }) => (
        <Route path={path} element={element} key={Math.random()} />
      ))}
      {isAuth
        ? privateRoutes.map(({ path, element }) => (
            <Route path={path} element={element} />
          ))
        : ""}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export { AppRouter };
