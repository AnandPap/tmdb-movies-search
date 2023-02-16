import axios from "axios";
import { setTVShowDetailesType } from "../components/TVShowCover";
import { array } from "../pages/TVShows";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { MoviesState } from "../redux/movies";
import { setLoading } from "../redux/movies";

export type videoObject = {
  site: string;
  type: string;
};

export const fetchTVShows = async (
  searchTerm: string,
  setTVShows: React.Dispatch<React.SetStateAction<array[] | null | undefined>>,
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
      `https://api.themoviedb.org/3/search/tv?api_key=${
        import.meta.env.VITE_API_KEY
      }&query=${searchTerm}`
    )
    .then((res) => {
      setTVShows(res.data.results);
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 500);
    })
    .catch((err) => {
      setTVShows(undefined);
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 500);
      console.log(err);
    });
};

export const fetchTVShow = async (
  tvshowID: number,
  setTVShowDetails: setTVShowDetailesType
) => {
  // function getTVShowImageURL(res) {}
  await axios
    .get(
      `https://api.themoviedb.org/3/tv/${tvshowID}?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US&append_to_response=videos,images&include_image_language=en,null`
    )
    .then((res) => {
      let tvshowTitle = res.data.name || "No Title";

      let tvshowDescription = res.data.overview || "No Description";

      let tvshowRating = res.data.vote_average || "0";

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

      setTVShowDetails((s) => ({
        ...s,
        title: tvshowTitle,
        description: tvshowDescription,
        rating: tvshowRating,
        trailer: trailerURL,
        image: imageURL,
      }));
    })
    .catch((err) => {
      console.log(err);
    });
};
