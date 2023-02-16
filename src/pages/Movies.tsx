import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { fetchMovies } from "../apis/fetchMovies";
import { MovieCover } from "../components/MovieCover";
import { ValidationMessage } from "../components/reusable/ValidationMessage";

export type array = {
  id: number;
};

const showItems = 10;

export const Movies = () => {
  const [movies, setMovies] = useState<array[] | null | undefined>([]);
  const searchTerm = useAppSelector((state) => state.movies.searchTerm);

  useEffect(() => {
    if (searchTerm.length > 2) fetchMovies(searchTerm, setMovies);
  }, [searchTerm, location.pathname]);

  return (
    <div className="movies-container">
      {searchTerm ? (
        movies && movies.length > 0 ? (
          movies
            .slice(0, showItems)
            .map((movie, i) => <MovieCover key={i} movieID={movie.id} />)
        ) : (
          <ValidationMessage text="No results" />
        )
      ) : (
        <ValidationMessage text="Type more than 2 characters to begin search." />
      )}
    </div>
  );
};
