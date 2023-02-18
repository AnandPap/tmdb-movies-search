import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovie } from "../apis/fetchMovies";
import noImage from "../assets/no-image.png";
import BackButton from "../components/reusable/components/BackButton";
import star from "../assets/star.png";

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

export const MovieDetails = (props: { movieID: number }) => {
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    description: "",
    realeseDate: "",
    rating: "",
    image: "",
    trailer: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) fetchMovie(+id, setMovieDetails);
    else fetchMovie(props.movieID, setMovieDetails);
  }, [props.movieID]);

  return (
    <div className="details-page">
      <BackButton onClick={() => navigate(-1)} />
      {movieDetails.trailer ? (
        <iframe
          className="details-image-trailer"
          src={movieDetails.trailer}
          title="Video Player"
          allowFullScreen
        ></iframe>
      ) : movieDetails.image ? (
        <img
          className="cover-image"
          src={movieDetails.image}
          alt="Movie Cover"
        />
      ) : (
        <img className="cover-image" src={noImage} alt="No Image" />
      )}
      <div className="title-and-rating-wrapper">
        <div className="title-wrapper">
          <h1>{movieDetails.title}</h1>
        </div>
        <div className="rating-wrapper">
          <p>Rating: </p>
          {+parseFloat(movieDetails.rating).toFixed(1) === 0 ? (
            <p>Not rated</p>
          ) : (
            <>
              <img className="star-icon" src={star} alt="" />
              <p className="rating">
                {parseFloat(movieDetails.rating).toFixed(1)}
              </p>
              <p>/10</p>
            </>
          )}
        </div>
      </div>
      <h3>Movie Overview: </h3>
      <p className="description">{movieDetails.description}</p>
    </div>
  );
};
