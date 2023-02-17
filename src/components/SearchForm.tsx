import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setSearchTerm, setLoading } from "../redux/movies";
import { Outlet, useNavigate } from "react-router-dom";
import searchIcon from "../assets/search.png";
import DarkThemeSwitch from "./reusable/DarkModeButton";

export const SearchForm = () => {
  const searchTerm = useAppSelector((state) => state.movies.searchTerm);
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
        className="search-form"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="buttons-container">
          <div className="change-page-buttons">
            <button
              className={`change-page-button ${
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
              className={`change-page-button ${
                location.pathname === "/tvshows" ? "selected-button" : null
              }`}
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
          <DarkThemeSwitch />
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
