import { useEffect, useState } from "react";
import { fetchTVShows } from "../apis/fetchTVShows";
import { fetchMovies } from "../apis/fetchMovies";
import { Cover } from "../components/Cover";
import ValidationMessage from "../components/reusable/components/ValidationMessage";
import { useAppSelector, useAppDispatch } from "../redux/hooks";

export type array = {
  id: number;
};

const showItems = 10;

export const SearchResults = () => {
  const [results, setResults] = useState<array[] | null | undefined>([]);
  const searchTerm = useAppSelector((state) => state.movies.searchTerm);
  const loading = useAppSelector((state) => state.movies.loading);
  const currentPage = useAppSelector((state) => state.movies.currentPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchTerm.length > 2) {
      if (currentPage === "tvshows")
        fetchTVShows(searchTerm, setResults, dispatch);
      else fetchMovies(searchTerm, setResults, dispatch);
    }
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
