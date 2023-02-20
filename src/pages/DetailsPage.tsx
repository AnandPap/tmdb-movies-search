import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovie } from "../apis/fetchMovies";
import noImage from "../assets/no-image.png";
import BackButton from "../components/reusable/components/BackButton";
import star from "../assets/star.png";
import { useAppSelector } from "../redux/hooks";

export const DetailsPage = (props: { id: number }) => {
  const [details, setDetails] = useState({
    title: "",
    description: "",
    realeseDate: "",
    rating: "",
    image: "",
    trailer: "",
  });
  const currentPage = useAppSelector((state) => state.movies.currentPage);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) fetchMovie(+id, currentPage, setDetails);
    else fetchMovie(props.id, currentPage, setDetails);
  }, [props.id]);

  return (
    <div className="details-page">
      <BackButton onClick={() => navigate(-1)} />
      {details.trailer ? (
        <iframe
          className="details-image-trailer"
          src={details.trailer}
          title="Video Player"
          allowFullScreen
        ></iframe>
      ) : details.image ? (
        <img className="cover-image" src={details.image} alt="Cover Image" />
      ) : (
        <img className="cover-image" src={noImage} alt="No Image" />
      )}
      <div className="title-and-rating-wrapper">
        <div className="title-wrapper">
          <h1>{details.title}</h1>
        </div>
        <div className="rating-wrapper">
          <p>Rating: </p>
          {+parseFloat(details.rating).toFixed(1) === 0 ? (
            <p>Not rated</p>
          ) : (
            <>
              <img className="star-icon" src={star} alt="" />
              <p className="rating">{parseFloat(details.rating).toFixed(1)}</p>
              <p>/10</p>
            </>
          )}
        </div>
      </div>
      <h3>{`${currentPage === "movies" ? "Movie" : "TVShow"}`} Overview: </h3>
      <p className="description">{details.description}</p>
    </div>
  );
};
