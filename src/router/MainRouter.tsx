import { BrowserRouter, Routes, Route } from "react-router-dom";
import ValidationMessage from "../components/reusable/components/ValidationMessage";
import { SearchResults } from "../pages/SearchResults";
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
          <Route path="/movies" element={<SearchResults />} />
          <Route path="/tvshows" element={<SearchResults />} />
        </Route>
        <Route
          path="/movies/details/:id"
          element={<MovieDetails movieID={selectedMovieID} />}
        />
        <Route
          path="/tvshows/details/:id"
          element={<TVShowDetails tvshowID={selectedMovieID} />}
        />
        <Route path="*" element={<ValidationMessage text="Page not found" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
