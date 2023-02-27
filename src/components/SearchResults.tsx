import { useEffect, useState } from "react";
import { fetchMovies } from "../apis/fetchMovies";
import { Cover } from "./Cover";
import ValidationMessage from "../components-reusable/ValidationMessage";
import { setLoading } from "../redux/movies";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { useLocation } from "react-router-dom";

export type array = {
  id: number;
  original_name: string;
  original_title: string;
  name: string;
  title: string;
  poster_path: string;
  backdrop_path: string;
};

export const SearchResults = () => {
  const [results, setResults] = useState<array[]>([]);
  const searchTerm = useAppSelector((state) => state.movies.searchTerm);
  const loading = useAppSelector((state) => state.movies.loading);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const showItems = 10;

  const fetchMoviesData = async (pageType: string) => {
    const res = await fetchMovies(searchTerm, pageType);
    setResults(res);
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 250);
  };

  useEffect(() => {
    if (searchTerm.length > 2) fetchMoviesData(location.pathname);
  }, [searchTerm, location.pathname]);

  return searchTerm ? (
    results && results.length > 0 ? (
      <div className="content-container">
        {results
          .filter((result) => {
            if (results.length < 5) return true;
            else return result.poster_path || result.backdrop_path;
          })
          .slice(0, showItems)
          .map((result, i) => (
            <Cover
              key={i}
              id={result.id}
              pageType={location.pathname}
              title={
                result.original_name ||
                result.original_title ||
                result.name ||
                result.title
              }
              imagePath={result.poster_path || result.backdrop_path}
            />
          ))}
      </div>
    ) : loading ? null : (
      <ValidationMessage text="No results" />
    )
  ) : (
    <ValidationMessage text="Type more than 2 characters to begin search." />
  );
};
