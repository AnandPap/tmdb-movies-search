import axios from "axios";
import { setDetailsType } from "../components/Cover";
import { array } from "../pages/ResultsPage";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { MoviesState } from "../redux/movies";
import { setLoading } from "../redux/movies";

export type videoObject = {
  site: string;
  type: string;
};

export const fetchMovies = async (
  searchTerm: string,
  type: string,
  setResults: React.Dispatch<React.SetStateAction<array[] | null | undefined>>,
  dispatch: ThunkDispatch<
    {
      movies: MoviesState;
    },
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>
) => {
  await axios
    .get(
      `https://api.themoviedb.org/3/search/${
        type === "movies" ? "movie" : "tv"
      }?api_key=${import.meta.env.VITE_API_KEY}&query=${searchTerm}`
    )
    .then((res) => {
      setResults(res.data.results);
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 500);
    })
    .catch((err) => {
      setResults(undefined);
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 500);
      console.log(err);
    });
};

export const fetchMovie = async (
  id: number,
  type: string,
  setDetails: setDetailsType
) => {
  // function getMovieImageURL(res) {}
  await axios
    .get(
      `https://api.themoviedb.org/3/${
        type === "movies" ? "movie" : "tv"
      }/${id}?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US&append_to_response=videos,images&include_image_language=en,null`
    )
    .then((res) => {
      let title =
        res.data.original_title ||
        res.data.title ||
        res.data.original_name ||
        res.data.name ||
        "No Title";

      let description = res.data.overview || "No Description";

      let rating = res.data.vote_average || "0";

      let videosArray = res.data.videos.results;
      let indexOfTrailer = videosArray.findIndex((video: videoObject) => {
        return video.type === "Trailer" && video.site === "YouTube";
      });
      let trailerURL =
        indexOfTrailer !== -1 && indexOfTrailer
          ? `https://www.youtube.com/embed/${videosArray[indexOfTrailer].key}`
          : "";

      let imageArray;
      for (let x in res.data.images) {
        if (res.data.images[x].length > 0) {
          imageArray = res.data.images[x];
          break;
        }
      }
      let imageURL = imageArray
        ? `https://image.tmdb.org/t/p/original${imageArray[0].file_path}`
        : "";

      setDetails((s) => ({
        ...s,
        title: title,
        description: description,
        rating: rating,
        trailer: trailerURL,
        image: imageURL,
      }));
    })
    .catch((err) => {
      console.log(err);
    });
};
