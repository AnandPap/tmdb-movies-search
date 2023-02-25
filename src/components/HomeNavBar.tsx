import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setLoading } from "../redux/movies";
import LottieDarkModeSwitch from "../components-reusable/LottieDarkModeSwitch";
import tmdbIcon from "../assets/tmdbIcon.svg";

type HomeNavBarProps = {
  searchParam: string | null;
};

const HomeNavBar = ({ searchParam }: HomeNavBarProps) => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.movies.darkMode);
  const navigate = useNavigate();
  const location = useLocation();

  const setPage = (pageName: string) => {
    if (pageName !== location.pathname) {
      if (searchParam) {
        navigate(`${pageName}?search=${searchParam}`);
        dispatch(setLoading(true));
      } else {
        navigate(`${pageName}`);
      }
    }
  };

  return (
    <div className="home-nav-bar">
      <img className="tmdb-icon" src={tmdbIcon} alt="TMDB Icon" />
      <div className="change-page-buttons-wrapper">
        <button
          className={`nav-button ${
            location.pathname === "/movies" ? "selected-button" : null
          } ${darkMode ? "dark" : "light"}`}
          type="button"
          onClick={() => setPage("/movies")}
        >
          Movies
        </button>
        <button
          className={`nav-button ${
            location.pathname === "/tvshows" ? "selected-button" : null
          } ${darkMode ? "dark" : "light"}`}
          type="button"
          onClick={() => setPage("/tvshows")}
        >
          TV Shows
        </button>
      </div>
      <LottieDarkModeSwitch />
    </div>
  );
};

export default HomeNavBar;
