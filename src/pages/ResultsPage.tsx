import { useEffect, useState } from "react";
import { fetchMovies } from "../apis/fetchMovies";
import { Cover } from "../components/Cover";
import ValidationMessage from "../components-reusable/ValidationMessage";
import { setLoading } from "../redux/movies";
import { useAppSelector, useAppDispatch } from "../redux/hooks";

export type array = {
  id: number;
  original_name: string;
  original_title: string;
  name: string;
  title: string;
  poster_path: string;
  backdrop_path: string;
};

export const ResultsPage = () => {
  const [results, setResults] = useState<array[]>([]);
  const searchTerm = useAppSelector((state) => state.movies.searchTerm);
  const loading = useAppSelector((state) => state.movies.loading);
  const currentPage = useAppSelector((state) => state.movies.currentPage);
  const dispatch = useAppDispatch();
  const showItems = 10;

  const fetchMoviesData = async () => {
    const res = await fetchMovies(searchTerm, currentPage);
    setResults(res);
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 250);
  };

  useEffect(() => {
    if (searchTerm.length > 2) fetchMoviesData();
  }, [searchTerm, currentPage]);

  return (
    <div className="content-container">
      {searchTerm ? (
        results && results.length > 0 ? (
          results
            .filter((result) => {
              if (results.length < 5) return true;
              else return result.poster_path || result.backdrop_path;
            })
            .slice(0, showItems)
            .map((result, i) => (
              <Cover
                key={i}
                id={result.id}
                type={currentPage}
                title={
                  result.original_name ||
                  result.original_title ||
                  result.name ||
                  result.title
                }
                imagePath={result.poster_path || result.backdrop_path}
              />
            ))
        ) : loading ? null : (
          <ValidationMessage text="No results" />
        )
      ) : (
        <ValidationMessage text="Type more than 2 characters to begin search." />
      )}
    </div>
  );
};
