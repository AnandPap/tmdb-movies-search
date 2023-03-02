import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setSearchTerm, setFetchResults } from "../redux/movies";
import {
  NavigateOptions,
  URLSearchParamsInit,
  useLocation,
  useNavigate,
} from "react-router-dom";
import searchIcon from "../assets/search.png";

type SetURLSearchParams = (
  nextInit?:
    | URLSearchParamsInit
    | ((prev: URLSearchParams) => URLSearchParamsInit),
  navigateOpts?: NavigateOptions
) => void;

type SearchFormProps = {
  setSearchParams: SetURLSearchParams;
  searchParam: string | null;
};

export const SearchForm = ({
  searchParam,
  setSearchParams,
}: SearchFormProps) => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.movies.searchTerm);
  const darkMode = useAppSelector((state) => state.movies.darkMode);
  const [inputText, setInputText] = useState(searchTerm);
  const [timerID, setTimerID] = useState(-1);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (inputText.length > 2 && searchTerm !== inputText) {
      clearTimeout(timerID);
      const tempTimerID = setTimeout(
        () => setSearchParams({ search: inputText }),
        1000
      );
      setTimerID(tempTimerID);
      return () => clearTimeout(tempTimerID); // Da li mi treba?
    }
  }, [inputText]);

  useEffect(() => {
    const pageName = location.pathname;
    if (!searchParam) {
      dispatch(setSearchTerm(""));
      setInputText("");
      dispatch(setFetchResults({ tvshows: [], movies: [] }));
      navigate(`${pageName}`, { replace: true });
    } else if (searchParam.length < 3) {
      dispatch(setSearchTerm(""));
      setInputText(searchParam);
      dispatch(setFetchResults({ tvshows: [], movies: [] }));
    } else if (searchParam !== searchTerm) {
      dispatch(setSearchTerm(searchParam));
      setInputText(searchParam);
      dispatch(setFetchResults({ tvshows: [], movies: [] }));
    }
  }, [searchParam]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText.length > 2 && searchTerm !== inputText) {
      setSearchParams({ search: inputText });
      clearTimeout(timerID);
    }
  };

  return (
    <form
      // autoComplete="off"
      className={`search-form ${darkMode ? "dark" : "light"}`}
      onSubmit={(e) => handleSubmit(e)}
    >
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
