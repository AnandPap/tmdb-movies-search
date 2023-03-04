import { resultsType } from "../redux/movies";

type dataType = {
  original_title: string;
  title: string;
  runtime: number;
  original_name: string;
  name: string;
  overview: string;
  vote_average: string;
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

const getTitle = (data: dataType) => {
  return (
    data.original_title ||
    data.title ||
    data.original_name ||
    data.name ||
    "No Title"
  );
};

const getRuntime = (data: dataType) => {
  if (data.runtime) {
    let h = data.runtime / 60;
    let m = data.runtime % 60;
    if (h > 0) return `${h}h ${m}m`;
    else return `${m}`;
  } else return "";
};

const getDescription = (data: dataType) => {
  return data.overview || "No Description";
};

const getRating = (data: dataType) => {
  return data.vote_average || "0";
};

const getGenres = (data: dataType) => {
  if (data.genres.length > 0) {
    const genresArray: string[] = [];
    for (let i = 0; i < data.genres.length; i++) {
      genresArray.push(data.genres[i].name);
    }
    return genresArray;
  } else return null;
};

const getImages = (data: dataType) => {
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

const getPosterURL = (data: dataType | resultsType) => {
  let posterPath = data.poster_path || data.backdrop_path || "";
  return posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : "";
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

export {
  getTitle,
  getRuntime,
  getDescription,
  getRating,
  getGenres,
  getImages,
  getPosterURL,
  getTrailerURL,
};
