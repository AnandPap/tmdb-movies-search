import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Movies } from "../pages/Movies";
import { NotFound } from "../pages/NotFound";
import { TVShows } from "../pages/TVShows";
import { SearchForm } from "../components/SearchForm";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchForm />}>
          <Route path="movies" element={<Movies />} />
          <Route path="tvshows" element={<TVShows />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
