import { resultsType } from "../redux/movies";

type dataType = {
  original_title: string;
  title: string;
  release_date: string;
  first_air_date: string;
  last_air_date: string;
  runtime: number;
  original_name: string;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  genres: genresType[];
  poster_path: string;
  backdrop_path: string;
  videos: { results: [{ site: string; type: string; key: string }] };
  images: Array<[]>;
};

type genresType = {
  id: number;
  name: string;
};

type imageArrayType = {
  file_path: string;
};

export const getTitle = (data: dataType) => {
  return (
    data.original_title ||
    data.title ||
    data.original_name ||
    data.name ||
    "No Title"
  );
};

export const getTitleType = (location: string) => {
  let title = location.split("/")[1];
  if (title === "movies") return "Movie";
  else if (title === "tvshow") return "TV Show";
  else return "";
};

export const getReleaseYear = (data: dataType) => {
  if (data.release_date) {
    return new Date(data.release_date).getFullYear() + "";
  } else if (data.last_air_date && data.last_air_date) {
    const firstAirDate = new Date(data.first_air_date);
    const lastAirDate = new Date(data.last_air_date);
    if (firstAirDate.getFullYear() === new Date().getFullYear()) {
      return firstAirDate.getFullYear() + " -";
    } else {
      return firstAirDate.getFullYear() + " - " + lastAirDate.getFullYear();
    }
  } else return "";
};

export const getReleaseDate = (data: dataType) => {
  if (data.release_date || data.first_air_date) {
    const releaseYear = new Date(data.release_date || data.first_air_date);
    return (
      "" +
      releaseYear.getDate() +
      releaseYear.getMonth() +
      releaseYear.getFullYear()
    );
  } else return "";
};

export const getRuntime = (data: dataType) => {
  if (data.runtime) {
    let h = Math.floor(data.runtime / 60);
    let m = data.runtime % 60;
    if (h > 0 && m > 0) return `${h}h ${m}m`;
    else if (h > 0) return `${h}h`;
    else return `${m}m`;
  } else return "";
};

export const getDescription = (data: dataType) => {
  return data.overview || "No Description";
};

export const getRating = (data: dataType) => {
  if (
    data.vote_average &&
    data.vote_count &&
    data.vote_average !== 0 &&
    typeof data.vote_average === "number"
  ) {
    let voteCount = data.vote_count + "";
    if (data.vote_count > 999) {
      voteCount = Math.round(data.vote_count / 1000) + "K";
    }
    return {
      voteAverage: Math.round(data.vote_average * 10) / 10,
      voteCount: voteCount,
    };
  } else return null;
};

export const getGenres = (data: dataType) => {
  if (data.genres.length > 0) {
    const genresArray: string[] = [];
    for (let i = 0; i < data.genres.length; i++) {
      genresArray.push(data.genres[i].name);
    }
    return genresArray;
  } else return null;
};

export const getImages = (data: dataType) => {
  return null;
  // let imageArray: imageArrayType[] = [];
  // for (let x in data.images) {
  //   if (data.images[x].length > 0) {
  //     imageArray = data.images[x];
  //     break;
  //   }
  // }
  // let imageURL =
  //   imageArray.length > 0 && imageArray[0].file_path
  //     ? `https://image.tmdb.org/t/p/original${imageArray[0].file_path}`
  //     : "";
  // return imageURL;
};

export const getPosterURL = (data: dataType | resultsType) => {
  let posterPath = data.poster_path || data.backdrop_path || "";
  return posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : "";
};

export const getTrailerURL = (data: dataType) => {
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
