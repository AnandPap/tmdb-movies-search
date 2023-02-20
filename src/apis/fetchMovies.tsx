import axios from "axios";
import { detailsType } from "../pages/DetailsPage";

export type videoObject = {
  site: string;
  type: string;
};

export const fetchMovies = async (searchTerm: string, type: string) => {
  return await axios
    .get(
      `https://api.themoviedb.org/3/search/${
        type === "movies" ? "movie" : "tv"
      }?api_key=${import.meta.env.VITE_API_KEY}&query=${searchTerm}`
    )
    .then((res) => {
      return res.data.results;
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    });
};

export const fetchMovie = async (id: number, type: string) => {
  // function getMovieImageURL(res) {}
  return await axios
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

      const returnObject: detailsType = {
        title: title,
        description: description,
        rating: rating,
        trailer: trailerURL,
        image: imageURL,
      };

      return returnObject;
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    });
};
