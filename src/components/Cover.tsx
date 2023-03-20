import { useNavigate } from "react-router-dom";
import { setSelectedMovieID } from "../redux/movies";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import CoverTitle from "./CoverTitle";
import CoverImage from "./CoverImage";

type CoverProps = {
  id: number;
  pageType: string;
  title: string;
  posterURL: string;
};

const Cover = ({ id, pageType, title, posterURL }: CoverProps) => {
  const theme = useAppSelector((state) => state.movies.theme);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div
      className={`home-page-cover ${theme}`}
      onClick={() => {
        navigate(`${pageType}/details/${id}`);
        dispatch(setSelectedMovieID(id));
      }}
    >
      <CoverImage className={`cover-image ${theme}`} src={posterURL} />
      <CoverTitle className="cover-image-title-wrapper" title={title} />
    </div>
  );
};

export default Cover;
