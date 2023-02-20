import { useNavigate } from "react-router-dom";
import { setSelectedMovieID } from "../redux/movies";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import noImage from "../assets/no-image.png";
import SpinnerGIF from "../reusable-components/SpinnerGIF";

export const Cover = (props: {
  title: string;
  imagePath: string;
  id: number;
  type: string;
}) => {
  const loading = useAppSelector((state) => state.movies.loading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div
      className="main-page-cover"
      onClick={() => {
        navigate(`/${props.type}/details/${props.id}`);
        dispatch(setSelectedMovieID(props.id));
      }}
    >
      {loading ? (
        <SpinnerGIF />
      ) : props.imagePath ? (
        <img
          className="cover-image"
          src={`https://image.tmdb.org/t/p/original${props.imagePath}`}
          alt="Cover Image"
        />
      ) : (
        <img className="cover-image" src={noImage} alt="No Image" />
      )}
      <h2>{props.title ? props.title : "No title"}</h2>
    </div>
  );
};
