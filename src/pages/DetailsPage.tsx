import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovie } from "../apis/fetchMovies";
import noImage from "../assets/no-image.png";
import BackButton from "../reusable-components/BackButton";
import star from "../assets/star.png";
import { useAppSelector } from "../redux/hooks";
import ValidationMessage from "../reusable-components/ValidationMessage";
import CoverImage from "../components/CoverImage";

export type detailsType =
  | {
      title: string;
      description: string;
      realeseDate?: string;
      rating: string;
      image: string;
      trailer: string;
    }
  | undefined;

export const DetailsPage = (props: { id: number }) => {
  const [details, setDetails] = useState<detailsType>({
    title: "",
    description: "",
    realeseDate: "",
    rating: "",
    image: "",
    trailer: "",
  });
  const currentPage = useAppSelector((state) => state.movies.currentPage);
  const darkMode = useAppSelector((state) => state.movies.darkMode);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchMovieData = async (id: number, currentPage: string) => {
    const res = await fetchMovie(id, currentPage);
    setDetails(res);
  };

  useEffect(() => {
    fetchMovieData(id ? +id : props.id, currentPage);
  }, [props.id]);

  return (
    <div className={`details-page ${darkMode ? "dark" : "light"}`}>
      <BackButton onClick={() => navigate(-1)} />
      {details ? (
        <>
          {details.trailer ? (
            <iframe
              className="details-image-trailer"
              src={details.trailer}
              title="Video Player"
              allowFullScreen
            ></iframe>
          ) : details.image ? (
            <CoverImage
              loading={false}
              darkMode={darkMode}
              imagePath={details.image}
            />
          ) : (
            <img className="cover-image" src={noImage} alt="No Image" />
          )}
          <div className="title-and-rating-wrapper">
            <div className="title-wrapper">
              <h1>{details.title}</h1>
            </div>
            <div className={`rating-wrapper ${darkMode ? "dark" : "light"}`}>
              <p>Rating: </p>
              {+parseFloat(details.rating).toFixed(1) === 0 ? (
                <p>Not rated</p>
              ) : (
                <>
                  <img className="star-icon" src={star} alt="" />
                  <p className="rating">
                    {parseFloat(details.rating).toFixed(1)}
                  </p>
                  <p>/10</p>
                </>
              )}
            </div>
          </div>
          {details.description !== "No Description" ? (
            <h3>
              {`${currentPage === "movies" ? "Movie" : "TVShow"}`} Overview:{" "}
            </h3>
          ) : null}
          <p className="description">{details.description}</p>
        </>
      ) : (
        <ValidationMessage text="No details to show." />
      )}
    </div>
  );
};
