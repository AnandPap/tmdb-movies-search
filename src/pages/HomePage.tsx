import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { SearchForm } from "../components/SearchForm";
import HomeNavBar from "../components/HomeNavBar";
import { useEffect } from "react";

export const HomePage = () => {
  const darkMode = useAppSelector((state) => state.movies.darkMode);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams({ search: "" });
  const searchParam = searchParams.get("search");

  document.title = location.pathname + location.search;

  useEffect(() => {
    const pageName = location.pathname;
    if (pageName === "/") navigate("/movies", { replace: true });
  }, [location.pathname]);

  return (
    <div className={`home-page ${darkMode ? "dark" : "light"}`}>
      {location.state}
      <HomeNavBar searchParam={searchParam} />
      <SearchForm searchParam={searchParam} setSearchParams={setSearchParams} />
      <Outlet />
    </div>
  );
};
