import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { SearchForm } from "../components/SearchForm";

export const MainPage = () => {
  const navigate = useNavigate();
  const darkMode = useAppSelector((state) => state.movies.darkMode);

  useEffect(() => {
    {
      location.pathname === "/"
        ? navigate("/tvshows", { replace: true })
        : null;
    }
  }, []);

  return (
    <div className={`main-page ${darkMode ? "dark" : "light"}`}>
      <SearchForm />
      <Outlet />
    </div>
  );
};
