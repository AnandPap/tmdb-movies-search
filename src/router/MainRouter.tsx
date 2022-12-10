import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Movies } from "../pages/Movies";
import { NotFound } from "../pages/NotFound";
import { TVShows } from "../pages/TVShows";
import { SearchForm } from "../SearchForm";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <SearchForm />
      <Routes>
        <Route path="/">
          <Route index element={<TVShows />} />
          <Route path="movies" element={<Movies />} />
          <Route path="tv-shows" element={<TVShows />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
