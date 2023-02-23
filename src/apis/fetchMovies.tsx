import axios from "axios";

export const fetchMovies = async (searchTerm: string, pageType: string) => {
  return await axios
    .get(
      `https://api.themoviedb.org/3/search/${
        pageType === "/movies" ? "movie" : "tv"
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

export const fetchMovie = async (id: number, pageType: string) => {
  // function getMovieImageURL(res) {}
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${
        pageType === "/movies" ? "movie" : "tv"
      }/${id}?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US&append_to_response=videos,images&include_image_language=en,null`
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
