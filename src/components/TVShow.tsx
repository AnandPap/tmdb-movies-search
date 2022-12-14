import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { fetchTVShow } from "../apis/fetchTVShows";
import noImage from "../assets/no-image.png";
import { BackButton } from "./reusable/BackButton";
import { setSelectedMovieID } from "../redux/movies";
import { NoResults } from "./NoResults";
import star from "../assets/star.png";

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

export const TVShow = (props: { tvshowID: number }) => {
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
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      let fetchID: number = +id;
      fetchTVShow(fetchID, setTVShowDetails);
    } else fetchTVShow(props.tvshowID, setTVShowDetails);
  }, [props.tvshowID]);

  return (
    <>
      {location.pathname === "/tvshows" ? (
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
      ) : tvshowDetails.title !== "" && tvshowDetails.description !== "" ? (
        <div className="details-page-tvshow">
          <BackButton text="back" onClick={() => navigate(-1)} />
          {tvshowDetails.trailer ? (
            <iframe
              className="details-image-trailer"
              src={tvshowDetails.trailer}
              title="Video Player"
              allowFullScreen
            ></iframe>
          ) : tvshowDetails.image ? (
            <img
              className="details-image-trailer"
              src={tvshowDetails.image}
              alt="TVShow Cover"
            />
          ) : (
            <img className="cover-image" src={noImage} alt="No Image" />
          )}
          <h1>{tvshowDetails.title}</h1>
          <h3>TVShow Overview: </h3>
          <p className="description">{tvshowDetails.description}</p>
          <div className="rating-wrapper">
            <p>Rating: </p>
            <img className="star-icon" src={star} alt="" />
            <p>{parseFloat(tvshowDetails.rating).toFixed(1)}</p>
          </div>
        </div>
      ) : (
        <>
          <BackButton text="back" onClick={() => navigate(-1)} />
          <NoResults text="No details" />
        </>
      )}
    </>
  );
};
