import { useNavigate } from "react-router-dom";
import { setLoading, setSelectedMovieID } from "../redux/movies";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import CoverTitle from "./CoverTitle";
import CoverImage from "./CoverImage";

type CoverProps = {
  id: number;
  pageType: string;
  title: string;
  imagePath: string;
};

export const Cover = ({ id, pageType, title, imagePath }: CoverProps) => {
  const loading = useAppSelector((state) => state.movies.loading);
  const darkMode = useAppSelector((state) => state.movies.darkMode);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div
      className={`main-page-cover ${darkMode ? "dark" : "light"}`}
      onClick={() => {
        navigate(`${pageType}/details/${id}`);
        dispatch(setSelectedMovieID(id));
        dispatch(setLoading(true));
      }}
    >
      <CoverImage
        loading={loading}
        darkMode={darkMode}
        imagePath={
          imagePath ? `https://image.tmdb.org/t/p/original${imagePath}` : ""
        }
      />
      <CoverTitle className="title-wrapper" title={title} />
    </div>
  );
};
