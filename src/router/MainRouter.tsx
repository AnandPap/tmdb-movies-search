import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Movies } from "../pages/Movies";
import { NotFound } from "../pages/NotFound";
import { TVShows } from "../pages/TVShows";
import { SearchForm } from "../components/SearchForm";
import { useAppSelector } from "../redux/hooks";
import { Movie } from "../components/Movie";
import { TVShow } from "../components/TVShow";

const MainRouter = () => {
  const selectedMovieID = useAppSelector(
    (state) => state.movies.selectedMovieID
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchForm />}>
          <Route path="/movies" element={<Movies />} />
          <Route
            path="/movies/movie-details/:id"
            element={<Movie movieID={selectedMovieID} />}
          />
          <Route path="/tvshows" element={<TVShows />} />
          <Route
            path="/tvshows/tvshow-details/:id"
            element={<TVShow tvshowID={selectedMovieID} />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
