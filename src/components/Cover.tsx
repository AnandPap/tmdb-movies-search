import { useNavigate } from "react-router-dom";
import { setLoading, setSelectedMovieID } from "../redux/movies";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import CoverTitle from "./CoverTitle";
import CoverImage from "./CoverImage";

type CoverProps = {
  title: string;
  imagePath: string;
  id: number;
  type: string;
};

export const Cover = ({ id, type, title, imagePath }: CoverProps) => {
  const loading = useAppSelector((state) => state.movies.loading);
  const darkMode = useAppSelector((state) => state.movies.darkMode);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div
      className={`main-page-cover ${darkMode ? "dark" : "light"}`}
      onClick={() => {
        navigate(`/${type}/details/${id}`);
        dispatch(setSelectedMovieID(id));
        dispatch(setLoading(true));
      }}
    >
      <CoverImage
        loading={loading}
        darkMode={darkMode}
        imagePath={`https://image.tmdb.org/t/p/original${imagePath}`}
      />
      <CoverTitle className="title-wrapper" title={title} />
    </div>
  );
};
