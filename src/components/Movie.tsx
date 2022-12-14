import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { fetchMovie } from "../apis/fetchMovies";
import noImage from "../assets/no-image.png";
import { BackButton } from "./reusable/BackButton";
import { setSelectedMovieID } from "../redux/movies";
import { NoResults } from "./NoResults";

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

export const Movie = (props: { movieID: number }) => {
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
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      let fetchID: number = +id;
      fetchMovie(fetchID, setMovieDetails);
    } else fetchMovie(props.movieID, setMovieDetails);
  }, [props.movieID]);

  return (
    <>
      {location.pathname === "/movies" ? (
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
      ) : movieDetails.title !== "" && movieDetails.description !== "" ? (
        <div className="details-page-movie">
          <BackButton text="back" onClick={() => navigate(-1)} />
          {movieDetails.trailer ? (
            <iframe
              src={movieDetails.trailer}
              title="Video Player"
              allowFullScreen
            ></iframe>
          ) : (
            <img
              className="cover-image"
              src={movieDetails.image}
              alt="Movie Cover"
            />
          )}
          <h2>{movieDetails.title}</h2>
          <h4>Movie Overview: </h4>
          <p>{movieDetails.description}</p>
        </div>
      ) : (
        <NoResults text="No result" />
      )}
    </>
  );
};
