import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Movies } from "../pages/Movies";
import ValidationMessage from "../components/reusable/components/ValidationMessage";
import { TVShows } from "../pages/TVShows";
import { MainPage } from "../pages/MainPage";
import { useAppSelector } from "../redux/hooks";
import { TVShowDetails } from "../pages/TVShowDetails";
import { MovieDetails } from "../pages/MovieDetails";

const MainRouter = () => {
  const selectedMovieID = useAppSelector(
    (state) => state.movies.selectedMovieID
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="/movies" element={<Movies />} />
          <Route path="/tvshows" element={<TVShows />} />
        </Route>
        <Route
          path="/movies/movie-details/:id"
          element={<MovieDetails movieID={selectedMovieID} />}
        />
        <Route
          path="/tvshows/tvshow-details/:id"
          element={<TVShowDetails tvshowID={selectedMovieID} />}
        />
        <Route path="*" element={<ValidationMessage text="Page not found" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
