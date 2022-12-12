import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setSearchTerm } from "../redux/movies";
import { useNavigate } from "react-router-dom";

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
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <button
            type="button"
            onClick={() => {
              if (location.pathname !== "/movies") navigate("/movies");
            }}
          >
            Movies
          </button>
          <button
            type="button"
            onClick={() => {
              if (location.pathname !== "/tv-shows") navigate("/tv-shows");
            }}
          >
            TV Shows
          </button>
        </div>
        <label htmlFor="search">Input field for searching movies</label>
        <input
          name="search"
          type="text"
          value={inputText}
          placeholder="Start typing to begin search"
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        />
      </form>
    </div>
  );
};
