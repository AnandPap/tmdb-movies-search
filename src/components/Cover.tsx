import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { fetchMovie } from "../apis/fetchMovies";
import { setSelectedMovieID } from "../redux/movies";
import noImage from "../assets/no-image.png";
import SpinnerGIF from "./reusable/components/SpinnerGIF";

export type setDetailsType = React.Dispatch<
  React.SetStateAction<{
    title: string;
    description: string;
    realeseDate: string;
    rating: string;
    image: string;
    trailer: string;
  }>
>;

export const Cover = (props: { id: number; type: string }) => {
  const [details, setDetails] = useState({
    title: "",
    description: "",
    realeseDate: "",
    rating: "",
    image: "",
    trailer: "",
  });
  const loading = useAppSelector((state) => state.movies.loading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovie(props.id, props.type, setDetails);
  }, [props.id]);

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
      ) : details.image ? (
        <img className="cover-image" src={details.image} alt="Cover Image" />
      ) : (
        <img className="cover-image" src={noImage} alt="No Image" />
      )}
      <h2>{details.title}</h2>
    </div>
  );
};
