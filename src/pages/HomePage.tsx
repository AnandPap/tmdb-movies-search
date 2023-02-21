import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { SearchForm } from "../components/SearchForm";
import { setCurrentPage, setLoading } from "../redux/movies";

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const darkMode = useAppSelector((state) => state.movies.darkMode);
  const currentPage = useAppSelector((state) => state.movies.currentPage);

  const setPage = (pageName: string) => {
    if (currentPage !== `${pageName}`) {
      navigate(`/${pageName}`, { replace: true });
      dispatch(setLoading(true));
      dispatch(setCurrentPage(`${pageName}`));
    }
  };

  useEffect(() => {
    if (currentPage === "") {
      navigate("/tvshows", { replace: true });
      dispatch(setCurrentPage("tvshows"));
    } else setPage(location.pathname.slice(1, location.pathname.length));
  }, [location.pathname]);

  return (
    <div className={`main-page ${darkMode ? "dark" : "light"}`}>
      <SearchForm />
      <Outlet />
    </div>
  );
};
