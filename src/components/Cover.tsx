import { useNavigate } from "react-router-dom";
import { setSelectedMovieID } from "../redux/movies";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import CoverTitle from "./CoverTitle";
import CoverImage from "./CoverImage";

export const Cover = (props: {
  title: string;
  imagePath: string;
  id: number;
  type: string;
}) => {
  const loading = useAppSelector((state) => state.movies.loading);
  const darkMode = useAppSelector((state) => state.movies.darkMode);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div
      className={`main-page-cover ${darkMode ? "dark" : "light"}`}
      onClick={() => {
        navigate(`/${props.type}/details/${props.id}`);
        dispatch(setSelectedMovieID(props.id));
      }}
    >
      <CoverImage
        loading={loading}
        darkMode={darkMode}
        imagePath={`https://image.tmdb.org/t/p/original${props.imagePath}`}
      />
      <CoverTitle className="title-wrapper" title={props.title} />
    </div>
  );
};
