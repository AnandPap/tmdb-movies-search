import { useEffect, useState } from "react";
import { fetchMovie } from "../apis/fetchMovies";
import noImage from "../assets/no-image.png";

export type setMovieDetailesType = React.Dispatch<
  React.SetStateAction<{
    title: string;
    description: string;
    realeseDate: string;
    rating: string;
    image: string;
    aspectRatio: string;
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
    aspectRatio: "",
    trailer: "",
  });
  useEffect(() => {
    fetchMovie(props.movieID, setMovieDetails);
  }, [props.movieID]);

  return (
    <>
      {location.pathname !== "/movies" ? (
        <div className="details-page-movie">
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
          <h3>{movieDetails.title}</h3>
          <h6>Movie Overview: </h6>
          <p>{movieDetails.description}</p>
        </div>
      ) : (
        <div className="main-page-movie">
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
      )}
    </>
  );
};
