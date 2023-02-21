import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovie } from "../apis/fetchMovies";
import noImage from "../assets/no-image.png";
import BackButton from "../components-reusable/BackButton";
import star from "../assets/star.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ValidationMessage from "../components-reusable/ValidationMessage";
import CoverImage from "../components/CoverImage";
import { setLoading } from "../redux/movies";

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

type dataType = {
  original_title: string;
  title: string;
  original_name: string;
  name: string;
  overview: string;
  vote_average: string;
  videos: { results: [{ site: string; type: string; key: string }] };
  images: Array<[]>;
};

export const DetailsPage = (props: { id: number }) => {
  const [details, setDetails] = useState<detailsType>(null);
  const currentPage = useAppSelector((state) => state.movies.currentPage);
  const darkMode = useAppSelector((state) => state.movies.darkMode);
  const loading = useAppSelector((state) => state.movies.loading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const getTitle = (data: dataType) => {
    return (
      data.original_title ||
      data.title ||
      data.original_name ||
      data.name ||
      "No Title"
    );
  };
  const getDescription = (data: dataType) => {
    return data.overview || "No Description";
  };
  const getRating = (data: dataType) => {
    return data.vote_average || "0";
  };
  const getTrailerURL = (data: dataType) => {
    let videosArray = data.videos.results;
    let indexOfTrailer = videosArray.findIndex((video) => {
      return video.type === "Trailer" && video.site === "YouTube";
    });
    let trailerURL =
      indexOfTrailer !== -1 && indexOfTrailer
        ? `https://www.youtube.com/embed/${videosArray[indexOfTrailer].key}`
        : "";
    return trailerURL;
  };
  const getImageURL = (data: dataType) => {
    let imageArray = [{ file_path: "" }];
    for (let x in data.images) {
      if (data.images[x].length > 0) {
        imageArray = data.images[x];
        break;
      }
    }
    let imageURL =
      imageArray.length > 0
        ? `https://image.tmdb.org/t/p/original${imageArray[0].file_path}`
        : "";
    return imageURL;
  };

  const fetchMovieData = async (id: number, currentPage: string) => {
    const data = await fetchMovie(id, currentPage);
    console.log(data);
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
    }, 50);
  };

  useEffect(() => {
    fetchMovieData(id ? +id : props.id, currentPage);
  }, [props.id]);

  return (
    <div className={`details-page ${darkMode ? "dark" : "light"}`}>
      <BackButton
        onClick={() => {
          navigate(-1);
          dispatch(setLoading(true));
        }}
      />
      {loading ? null : details ? (
        <>
          <div className="">
            {details.imageURL ? (
              <CoverImage
                className="details-page-cover-image"
                loading={loading}
                darkMode={darkMode}
                imagePath={details.imageURL}
              />
            ) : (
              <img className="cover-image" src={noImage} alt="No Image" />
            )}
            {details.trailerURL ? (
              <iframe
                className="details-image-trailer"
                src={details.trailerURL}
                title="Video Player"
                allowFullScreen
              ></iframe>
            ) : null}
          </div>
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
              {`${currentPage === "movies" ? "Movie" : "TVShow"}`} Overview:
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
