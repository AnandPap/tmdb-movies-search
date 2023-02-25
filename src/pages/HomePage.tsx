import { Outlet, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { SearchForm } from "../components/SearchForm";
import HomeNavBar from "../components/HomeNavBar";

export const HomePage = () => {
  const darkMode = useAppSelector((state) => state.movies.darkMode);
  const [searchParams, setSearchParams] = useSearchParams({ search: "" });
  const searchParam = searchParams.get("search");

  return (
    <div className={`main-page ${darkMode ? "dark" : "light"}`}>
      <HomeNavBar searchParam={searchParam} />
      <SearchForm setSearchParams={setSearchParams} searchParam={searchParam} />
      <Outlet />
    </div>
  );
};
