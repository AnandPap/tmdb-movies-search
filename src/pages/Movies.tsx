import {
  useEffect,
  useState,
  // useRef
} from "react";
import { useAppSelector } from "../redux/hooks";
import { fetchMovies } from "../apis/fetchMovies";
import { Movie } from "../components/Movie";
import { NoResults } from "../components/NoResults";

export type array = {
  id: number;
};

const showItems = 10;

export const Movies = () => {
  const searchTerm = useAppSelector((state) => state.movies.searchTerm);
  const [movies, setMovies] = useState<array[] | null | undefined>([]);

  // const isMounted = useRef(false);

  useEffect(() => {
    // console.log(5);
    if (searchTerm.length > 2) fetchMovies(searchTerm, setMovies);
  }, [searchTerm]);

  return (
    <div>
      <div className="movies-container">
        {movies && movies.length > 0 ? (
          location.pathname === "/movies" ? (
            movies
              .slice(0, showItems)
              .map((movie, i) => <Movie key={i} movieID={movie.id} />)
          ) : (
            <Movie movieID={movies[0].id} />
          )
        ) : (
          <NoResults />
        )}
        {/* {movies && movies.length > 0 ? (
          <Movie movieID={movies[0].id} />
        ) : (
          <NoResults />
        )} */}
      </div>
    </div>
  );
};
