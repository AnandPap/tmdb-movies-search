import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { SearchForm } from "../components/SearchForm";
import { setCurrentPage } from "../redux/movies";

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.movies.darkMode);
  const currentPage = useAppSelector((state) => state.movies.currentPage);

  useEffect(() => {
    if (currentPage !== "movies") {
      dispatch(setCurrentPage("tvshows"));
      navigate("/tvshows", { replace: true });
    }
  }, []);

  return (
    <div className={`main-page ${darkMode ? "dark" : "light"}`}>
      <SearchForm />
      <Outlet />
    </div>
  );
};
