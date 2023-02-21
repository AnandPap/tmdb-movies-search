import { BrowserRouter, Routes, Route } from "react-router-dom";
import ValidationMessage from "../components-reusable/ValidationMessage";
import { ResultsPage } from "../pages/ResultsPage";
import { HomePage } from "../pages/HomePage";
import { useAppSelector } from "../redux/hooks";
import { DetailsPage } from "../pages/DetailsPage";

const MainRouter = () => {
  const selectedMovieID = useAppSelector(
    (state) => state.movies.selectedMovieID
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="/movies" element={<ResultsPage />} />
          <Route path="/tvshows" element={<ResultsPage />} />
        </Route>
        <Route
          path="/movies/details/:id"
          element={<DetailsPage id={selectedMovieID} />}
        />
        <Route
          path="/tvshows/details/:id"
          element={<DetailsPage id={selectedMovieID} />}
        />
        <Route path="*" element={<ValidationMessage text="Page not found" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
