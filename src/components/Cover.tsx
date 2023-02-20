import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovie } from "../apis/fetchMovies";
import { setSelectedMovieID } from "../redux/movies";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import noImage from "../assets/no-image.png";
import SpinnerGIF from "../reusable-components/SpinnerGIF";
import { detailsType } from "../pages/DetailsPage";

export const Cover = (props: { id: number; type: string }) => {
  const [details, setDetails] = useState<detailsType>({
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

  const fetchMovieData = async (id: number, currentPage: string) => {
    let res = await fetchMovie(id, currentPage);
    setDetails(res);
  };

  useEffect(() => {
    fetchMovieData(props.id, props.type);
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
      ) : details?.image ? (
        <img className="cover-image" src={details.image} alt="Cover Image" />
      ) : (
        <img className="cover-image" src={noImage} alt="No Image" />
      )}
      <h2>{details?.title}</h2>
    </div>
  );
};
