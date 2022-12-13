import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setSearchTerm } from "../redux/movies";
import { Outlet, useNavigate } from "react-router-dom";

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
        console.log(inputText);
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
      console.log(5);
      clearTimeout(timerID);
    }
  };

  return (
    <>
      <div className="form-wrapper">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="buttons-container">
            <button
              className="change-page-button"
              type="button"
              onClick={() => {
                if (location.pathname !== "/movies") navigate("/movies");
              }}
            >
              Movies
            </button>
            <button
              className="change-page-button"
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
          <input
            name="search"
            type="text"
            className="search-bar"
            value={inputText}
            placeholder="Start typing to begin search"
            onChange={(e) => {
              setInputText(e.target.value);
            }}
          />
        </form>
      </div>
      <Outlet />
    </>
  );
};