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

const getTitle = (data: dataType) => {
  return (
    data.original_title ||
    data.title ||
    data.original_name ||
    data.name ||
    "No Title"
  );
};

const getRating = (data: dataType) => {
  return data.vote_average || "0";
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
    imageArray.length > 0 && imageArray[0].file_path
      ? `https://image.tmdb.org/t/p/original${imageArray[0].file_path}`
      : "";
  return imageURL;
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

const getDescription = (data: dataType) => {
  return data.overview || "No Description";
};

export { getTitle, getDescription, getRating, getImageURL, getTrailerURL };
