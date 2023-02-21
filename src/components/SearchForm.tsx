import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setSearchTerm, setLoading, setCurrentPage } from "../redux/movies";
import { useNavigate } from "react-router-dom";
import searchIcon from "../assets/search.png";
import LottieDarkModeSwitch from "../components-reusable/LottieDarkModeSwitch";

export const SearchForm = () => {
  const searchTerm = useAppSelector((state) => state.movies.searchTerm);
  const darkMode = useAppSelector((state) => state.movies.darkMode);
  const currentPage = useAppSelector((state) => state.movies.currentPage);
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
  }, [inputText]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText.length > 2 && searchTerm !== inputText) {
      dispatch(setSearchTerm(inputText));
      clearTimeout(timerID);
    }
  };

  const setPage = (pageName: string) => {
    if (currentPage !== `${pageName}`) {
      navigate(`/${pageName}`, { replace: true });
      dispatch(setLoading(true));
      dispatch(setCurrentPage(`${pageName}`));
    }
  };

  return (
    <form
      // autoComplete="off"
      className={`search-form ${darkMode ? "dark" : "light"}`}
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="search-form-buttons">
        <div className="change-page-buttons">
          <button
            className={`${
              currentPage === "movies" ? "selected-button" : null
            } ${darkMode ? "dark" : "light"}`}
            type="button"
            onClick={() => setPage("movies")}
          >
            Movies
          </button>
          <button
            className={`${
              currentPage === "tvshows" ? "selected-button" : null
            } ${darkMode ? "dark" : "light"}`}
            type="button"
            onClick={() => setPage("tvshows")}
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
          className={`search-bar ${darkMode ? null : "input-light"}`}
          value={inputText}
          placeholder="Search movies"
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        />
        <img src={searchIcon} alt="Search icon" className="search-icon" />
      </div>
    </form>
  );
};
