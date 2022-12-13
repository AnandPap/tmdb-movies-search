import axios from "axios";
import { setMovieDetailesType } from "../components/Movie";
import { array } from "../pages/Movies";

export type videoObject = {
  site: string;
  type: string;
};

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
  setMovieDetails: setMovieDetailesType
) => {
  // function getMovieImageURL(res) {}

  await axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US&append_to_response=videos,images&include_image_language=en,null`
    )
    .then((res) => {
      let movieTitle = res.data.original_title || res.data.title || "";

      let movieDescription = res.data.overview || "";

      let movieRating = res.data.vote_average || "";

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

      setMovieDetails((s) => ({
        ...s,
        title: movieTitle,
        description: movieDescription,
        rating: movieRating,
        trailer: trailerURL,
        image: imageURL,
      }));
    })
    .catch((err) => {
      console.log(err);
    });
};
