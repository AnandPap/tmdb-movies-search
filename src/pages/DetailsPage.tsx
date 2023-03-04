import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchMovie } from "../apis/fetchMovies";
import star from "../assets/star.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ValidationMessage from "../components-reusable/ValidationMessage";
import CoverImage from "../components/CoverImage";
import { setLoading } from "../redux/movies";
import DetailsNavBar from "../components/DetailsNavBar";
import {
  getDescription,
  getGenres,
  getImages,
  getPosterURL,
  getRating,
  getRuntime,
  getTitle,
  getTrailerURL,
} from "../apis/helperFunctions";
import SpinnerGIF from "../components-reusable/SpinnerGIF";

type detailsType = {
  title: string;
  runtime: string;
  description: string;
  realeseDate?: string;
  rating: string;
  genres: string[] | null;
  images: string[] | null;
  posterURL: string;
  trailerURL: string;
} | null;

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
    console.log(data);
    setDetails(() => {
      if (data)
        return {
          title: getTitle(data),
          runtime: getRuntime(data),
          description: getDescription(data),
          rating: getRating(data),
          genres: getGenres(data),
          images: getImages(data),
          posterURL: getPosterURL(data),
          trailerURL: getTrailerURL(data),
        };
      else return null;
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
      {loading ? (
        <SpinnerGIF className="details-page-spinner-wrapper" />
      ) : details ? (
        <div className="details-content-container">
          <div className="title-wrapper">
            <h1>{details.title}</h1>
          </div>
          <div className="cover-image-and-trailer-wrapper">
            <CoverImage
              className="details-page-cover-image"
              src={details.posterURL}
            />
            {details.trailerURL && (
              <iframe
                className="details-page-trailer"
                src={details.trailerURL}
                title="Video Player"
                allowFullScreen
              ></iframe>
            )}
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
          {details.description !== "No Description" && (
            <h3>
              {`${location.pathname === "/movies" ? "Movie" : "TVShow"}`}{" "}
              Overview:
            </h3>
          )}
          <p className="description">{details.description}</p>
        </div>
      ) : (
        <ValidationMessage text="No details to show." />
      )}
    </div>
  );
};
