import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setSearchTerm } from "../redux/movies";
import { Outlet, useNavigate } from "react-router-dom";
import searchIcon from "../assets/search.png";

export const SearchForm = () => {
  const [inputText, setInputText] = useState("");
  const [timerID, setTimerID] = useState(-1);
  const searchTerm = useAppSelector((state) => state.movies.searchTerm);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (inputText.length > 2 && searchTerm !== inputText) {
      clearTimeout(timerID);
      const tempTimerID = setTimeout(() => {
        dispatch(setSearchTerm(inputText));
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
      {location.pathname === "/movies" || location.pathname === "/tvshows" ? (
        <>
          <div className="form-wrapper">
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
              <div className="buttons-container">
                <button
                  className={`change-page-button ${
                    location.pathname === "/movies" ? "selected-button" : null
                  }`}
                  type="button"
                  onClick={() => {
                    if (location.pathname !== "/movies") navigate("/movies");
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
                    if (location.pathname !== "/tvshows") navigate("/tvshows");
                  }}
                >
                  TV Shows
                </button>
              </div>
              <label hidden htmlFor="search">
                Input field for searching movies
              </label>
              <div className="search-bar-wrapper">
                <input
                  name="search"
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
          </div>
        </>
      ) : null}
      <Outlet />
    </>
  );
};
