import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setSearchTerm, setLoading } from "../redux/movies";
import { Outlet, useNavigate } from "react-router-dom";
import searchIcon from "../assets/search.png";
import LottieDarkModeSwitch from "./reusable/components/LottieDarkModeSwitch";

export const SearchForm = () => {
  const searchTerm = useAppSelector((state) => state.movies.searchTerm);
  const darkMode = useAppSelector((state) => state.movies.darkMode);
  const [inputText, setInputText] = useState(searchTerm);
  const [timerID, setTimerID] = useState(-1);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (inputText.length > 2 && searchTerm !== inputText) {
      clearTimeout(timerID);
      const tempTimerID = setTimeout(() => {
        dispatch(setSearchTerm(inputText));
        dispatch(setLoading(true));
      }, 1000);
      setTimerID(tempTimerID);
      return () => clearTimeout(tempTimerID);
    }
    {
      location.pathname === "/"
        ? navigate("/tvshows", { replace: true })
        : null;
    }
  }, [inputText]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText.length > 2 && searchTerm !== inputText) {
      dispatch(setSearchTerm(inputText));
      clearTimeout(timerID);
    }
  };

  return (
    <>
      <form
        // autoComplete="off"
        className={`search-form ${darkMode ? "dark" : "light"}`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="search-form-buttons">
          <div className="change-page-buttons">
            <button
              className={`${
                location.pathname === "/movies" ? "selected-button" : null
              }`}
              type="button"
              onClick={() => {
                if (location.pathname !== "/movies") {
                  navigate("/movies");
                  dispatch(setLoading(true));
                }
              }}
            >
              Movies
            </button>
            <button
              className={`${
                location.pathname === "/tvshows" ? "selected-button" : null
              } ${darkMode ? "dark" : "light"}`}
              type="button"
              onClick={() => {
                if (location.pathname !== "/tvshows") {
                  navigate("/tvshows");
                  dispatch(setLoading(true));
                }
              }}
            >
              TV Shows
            </button>
          </div>
          <LottieDarkModeSwitch />
        </div>
        <label hidden htmlFor="search">
          Input field for searching movies
        </label>
        <div className="search-bar-wrapper">
          <input
            id="search"
            type="text"
            className="search-bar"
            value={inputText}
            placeholder="Search movies"
            onChange={(e) => {
              setInputText(e.target.value);
            }}
          />
          <img src={searchIcon} alt="" className="search-icon" />
        </div>
      </form>
      <Outlet />
    </>
  );
};
