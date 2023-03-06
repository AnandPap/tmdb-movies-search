import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchMovie } from "../apis/fetchMovies";
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
  getReleaseDate,
  getReleaseYear,
  getRuntime,
  getTitle,
  getTitleType,
  getTrailerURL,
} from "../apis/helperFunctions";
import SpinnerGIF from "../components-reusable/SpinnerGIF";
import TMDBRating from "../components/TMDBRating";
import Genres from "../components/Genres";

type detailsType = {
  title: string;
  basicInfo: string[];
  description: string;
  rating: ratingType | null;
  genres: string[] | null;
  images: string[] | null;
  posterURL: string;
  trailerURL: string;
  releaseDate: string | null;
} | null;

export type ratingType = {
  voteAverage: number;
  voteCount: string;
};

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
          basicInfo: [
            getTitleType(location.pathname),
            getReleaseYear(data),
            getRuntime(data),
          ],
          description: getDescription(data),
          rating: getRating(data),
          genres: getGenres(data),
          images: getImages(data),
          posterURL: getPosterURL(data),
          trailerURL: getTrailerURL(data),
          releaseDate: getReleaseDate(data),
        };
      else return null;
    });
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 0);
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
          <div className="top-part-wrapper">
            <div className="title-and-basic-info-wrapper">
              <div className="title-wrapper">
                <h1>{details.title}</h1>
              </div>
              <ul
                className={`basic-info-wrapper ${darkMode ? "dark" : "light"}`}
              >
                {details.basicInfo.map((item, i) => {
                  if (item[i])
                    return (
                      <div key={i} className="info-item-wrapper">
                        <li>{item}</li>
                      </div>
                    );
                })}
              </ul>
            </div>
            <TMDBRating darkMode={darkMode} rating={details.rating} />
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
          <Genres darkMode={darkMode} genres={details.genres} />
          <p className="short-description">{details.description}</p>
        </div>
      ) : (
        <ValidationMessage text="No details to show." />
      )}
    </div>
  );
};
