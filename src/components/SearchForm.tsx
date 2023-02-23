import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setSearchTerm, setLoading } from "../redux/movies";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import searchIcon from "../assets/search.png";
import LottieDarkModeSwitch from "../components-reusable/LottieDarkModeSwitch";

export const SearchForm = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.movies.searchTerm);
  const darkMode = useAppSelector((state) => state.movies.darkMode);

  const [inputText, setInputText] = useState(searchTerm);
  const [timerID, setTimerID] = useState(-1);

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams({ search: "" });
  const searchParam = searchParams.get("search");
  document.title = location.pathname + location.search;

  useEffect(() => {
    if (inputText.length > 2 && searchTerm !== inputText) {
      clearTimeout(timerID);
      const tempTimerID = setTimeout(() => {
        dispatch(setLoading(true));
        setSearchParams({ search: inputText });
        dispatch(setSearchTerm(inputText));
      }, 1000);
      setTimerID(tempTimerID);
      return () => clearTimeout(tempTimerID); // Da li mi treba?
    }
  }, [inputText]);

  useEffect(() => {
    const pageName = location.pathname;
    if (pageName === "/") {
      navigate("tvshows", { replace: true });
    } else {
      dispatch(setLoading(searchParam ? true : false));
      dispatch(setSearchTerm(searchParam ? searchParam : ""));
      setInputText(searchParam ? searchParam : "");
    }
  }, [searchParam, location.pathname]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText.length > 2 && searchTerm !== inputText) {
      dispatch(setLoading(true));
      setSearchParams({ search: inputText });
      dispatch(setSearchTerm(inputText));
      clearTimeout(timerID);
    }
  };

  const setPage = (pageName: string) => {
    if (pageName !== location.pathname) {
      navigate(`${pageName}${searchParam ? `?search=${searchTerm}` : ""}`);
      dispatch(setLoading(true));
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
              location.pathname === "/movies" ? "selected-button" : null
            } ${darkMode ? "dark" : "light"}`}
            type="button"
            onClick={() => setPage("/movies")}
          >
            Movies
          </button>
          <button
            className={`${
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
