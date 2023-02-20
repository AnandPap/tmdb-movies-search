import { useEffect, useState } from "react";
import { fetchMovies } from "../apis/fetchMovies";
import { Cover } from "../components/Cover";
import ValidationMessage from "../reusable-components/ValidationMessage";
import { setLoading } from "../redux/movies";
import { useAppSelector, useAppDispatch } from "../redux/hooks";

export type array = {
  id: number;
};

export const ResultsPage = () => {
  const [results, setResults] = useState<array[]>([]);
  const searchTerm = useAppSelector((state) => state.movies.searchTerm);
  const loading = useAppSelector((state) => state.movies.loading);
  const currentPage = useAppSelector((state) => state.movies.currentPage);
  const dispatch = useAppDispatch();
  const showItems = 10;

  const fetchMoviesData = async () => {
    let res = await fetchMovies(searchTerm, currentPage);
    setResults(res);
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 500);
  };

  useEffect(() => {
    if (searchTerm.length > 2) fetchMoviesData();
  }, [searchTerm, currentPage]);

  return (
    <div className="content-container">
      {searchTerm ? (
        results && results.length > 0 ? (
          results
            .slice(0, showItems)
            .map((result, i) => (
              <Cover key={i} id={result.id} type={currentPage} />
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
