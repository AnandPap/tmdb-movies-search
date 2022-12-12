import { ResultType } from "@remix-run/router/dist/utils";
import axios from "axios";
import { setMovieDetailesType } from "../components/Movie";
import { array } from "../pages/Movies";

export const fetchMovies = async (
  searchTerm: string,
  setMovies: React.Dispatch<React.SetStateAction<array[] | null | undefined>>
) => {
  await axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${
        import.meta.env.VITE_API_KEY
      }&query=${searchTerm}`
    )
    .then((res) => {
      setMovies(res.data.results);
    })
    .catch((err) => {
      setMovies(undefined);
      console.log(err);
    });
};

export const fetchMovie = async (
  movieID: number,
  setMovie: React.Dispatch<React.SetStateAction<{}>>,
  setMovieDetailes: setMovieDetailesType
) => {
  await axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=${
        import.meta.env.VITE_API_KEY
      }&append_to_response=videos,images`
    )
    .then((res) => {
      console.log(res.data.images);
      // setVideo()
      if (res.data.images) if (res.data.images.posters) res.data.images;
      // setImage()
      // let resArray = res.data.results;
      // let indexOfTrailer = resArray.findIndex((result: resultObject) => {
      //   return result.type === "Trailer" && result.site === "YouTube";
      // })
      // let trailerID = res.data.results[indexOfTrailer].key;
      // setMovie(res.data.results.type);
    })
    .catch((err) => {
      console.log(err);
      setMovie({});
    });
};
