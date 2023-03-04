import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchMovie } from "../apis/fetchMovies";
import noImage from "../assets/no-image.png";
import star from "../assets/star.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ValidationMessage from "../components-reusable/ValidationMessage";
import CoverImage from "../components/CoverImage";
import { setLoading } from "../redux/movies";
import DetailsNavBar from "../components/DetailsNavBar";
import {
  getDescription,
  getImageURL,
  getRating,
  getTitle,
  getTrailerURL,
} from "../apis/helperFunctions";

type detailsType =
  | {
      title: string;
      description: string;
      realeseDate?: string;
      rating: string;
      imageURL: string;
      trailerURL: string;
    }
  | undefined
  | null;

export const DetailsPage = (props: { id: number }) => {
  const [details, setDetails] = useState<detailsType>(null);
  const darkMode = useAppSelector((state) => state.movies.darkMode);
  const loading = useAppSelector((state) => state.movies.loading);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { id } = useParams();

  const fetchMovieData = async (id: number, pageType: string) => {
    dispatch(setLoading(true));
    const data = await fetchMovie(id, pageType);
    // console.log(data);
    setDetails((s) => {
      if (data)
        return {
          title: getTitle(data),
          description: getDescription(data),
          rating: getRating(data),
          imageURL: getImageURL(data),
          trailerURL: getTrailerURL(data),
        };
      else return undefined;
    });
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 500);
  };

  useEffect(() => {
    const firstPartOfThePath = "/" + location.pathname.split("/")[1];
    fetchMovieData(id ? +id : props.id, firstPartOfThePath);
  }, [props.id]);

  return (
    <div className={`details-page ${darkMode ? "dark" : "light"}`}>
      <DetailsNavBar />
      {loading ? null : details ? (
        <>
          <div className="title-wrapper">
            <h1>{details.title}</h1>
          </div>
          <div className="details-image-and-trailer-wrapper">
            {details.imageURL ? (
              <CoverImage
                className="details-page-cover-image"
                darkMode={darkMode}
                imagePath={details.imageURL}
              />
            ) : (
              <img className="cover-image" src={noImage} alt="No Image" />
            )}
            {details.trailerURL ? (
              <iframe
                className="details-page-trailer"
                src={details.trailerURL}
                title="Video Player"
                allowFullScreen
              ></iframe>
            ) : null}
          </div>
          <div className="title-and-rating-wrapper">
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
              {`${location.pathname === "/movies" ? "Movie" : "TVShow"}`}{" "}
              Overview:
            </h3>
          ) : null}
          <p className="description">{details.description}</p>
        </>
      ) : (
        <ValidationMessage className="" text="No details to show." />
      )}
    </div>
  );
};
