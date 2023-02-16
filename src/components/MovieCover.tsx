import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { fetchMovie } from "../apis/fetchMovies";
import noImage from "../assets/no-image.png";
import { setSelectedMovieID } from "../redux/movies";

export type setMovieDetailesType = React.Dispatch<
  React.SetStateAction<{
    title: string;
    description: string;
    realeseDate: string;
    rating: string;
    image: string;
    trailer: string;
  }>
>;

export const MovieCover = (props: { movieID: number }) => {
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    description: "",
    realeseDate: "",
    rating: "",
    image: "",
    trailer: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovie(props.movieID, setMovieDetails);
  }, [props.movieID]);

  return (
    <div
      className="main-page-movie"
      onClick={() => {
        navigate(`/movies/movie-details/${props.movieID}`);
        dispatch(setSelectedMovieID(props.movieID));
      }}
    >
      {movieDetails.image ? (
        <img
          className="cover-image"
          src={movieDetails.image}
          alt="Movie Cover"
        ></img>
      ) : (
        <img className="cover-image" src={noImage} alt="No Image" />
      )}
      <h2 className="movie-title">{movieDetails.title}</h2>
    </div>
  );
};
