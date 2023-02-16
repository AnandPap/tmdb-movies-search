import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { fetchTVShow } from "../apis/fetchTVShows";
import noImage from "../assets/no-image.png";
import { setSelectedMovieID } from "../redux/movies";

export type setTVShowDetailesType = React.Dispatch<
  React.SetStateAction<{
    title: string;
    description: string;
    realeseDate: string;
    rating: string;
    image: string;
    trailer: string;
  }>
>;

export const TVShowCover = (props: { tvshowID: number }) => {
  const [tvshowDetails, setTVShowDetails] = useState({
    title: "",
    description: "",
    realeseDate: "",
    rating: "",
    image: "",
    trailer: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTVShow(props.tvshowID, setTVShowDetails);
  }, [props.tvshowID]);

  return (
    <div
      className="main-page-tvshow"
      onClick={() => {
        navigate(`/tvshows/tvshow-details/${props.tvshowID}`);
        dispatch(setSelectedMovieID(props.tvshowID));
      }}
    >
      {tvshowDetails.image ? (
        <img
          className="cover-image"
          src={tvshowDetails.image}
          alt="TVShow Cover"
        ></img>
      ) : (
        <img className="cover-image" src={noImage} alt="No Image" />
      )}
      <h2 className="tvshow-title">{tvshowDetails.title}</h2>
    </div>
  );
};
