import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { setSearchTerm } from "./redux/movies";

export const SearchForm = () => {
  const [inputText, setInputText] = useState("");
  const [timerID, setTimerID] = useState(-1);
  const searchTerm = useAppSelector((state) => state.movies.searchTerm);
  const dispatch = useAppDispatch();

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
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
      SearchBar
    </form>
  );
};
