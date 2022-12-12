import { useEffect, useState } from "react";
import { fetchMovie } from "../apis/fetchMovies";

export type setMovieDetailesType = React.Dispatch<
  React.SetStateAction<{
    image: string;
    trailer: string;
    description: string;
    realeseDate: string;
    averageRating: string;
  }>
>;

export const Movie = (props: {
  movieID: number;
  setMovieDetailes: setMovieDetailesType;
}) => {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    fetchMovie(props.movieID, setMovie, props.setMovieDetailes);
  }, [props.movieID]);

  return <div>{props.movieID}</div>;
};
