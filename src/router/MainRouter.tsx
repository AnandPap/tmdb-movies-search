import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Movies } from "../pages/Movies";
import { NotFound } from "../pages/NotFound";
import { TVShows } from "../pages/TVShows";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TVShows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv-shows" element={<TVShows />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
