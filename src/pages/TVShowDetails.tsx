import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTVShow } from "../apis/fetchTVShows";
import noImage from "../assets/no-image.png";
import { BackButton } from "../components/reusable/BackButton";
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

export const TVShowDetails = (props: { tvshowID: number }) => {
  const [tvshowDetails, setTVShowDetails] = useState({
    title: "",
    description: "",
    realeseDate: "",
    rating: "",
    image: "",
    trailer: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) fetchTVShow(+id, setTVShowDetails);
    else fetchTVShow(props.tvshowID, setTVShowDetails);
  }, [props.tvshowID]);

  return (
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
      <div className="title-and-rating-wrapper">
        <div className="title-wrapper">
          <h1 className="title">{tvshowDetails.title}</h1>
        </div>
        <div className="rating-wrapper">
          <p>Rating: </p>
          {+parseFloat(tvshowDetails.rating).toFixed(1) === 0 ? (
            <p>Not rated</p>
          ) : (
            <>
              <img className="star-icon" src={star} alt="" />
              <p className="rating">
                {parseFloat(tvshowDetails.rating).toFixed(1)}
              </p>
              <p>/10</p>
            </>
          )}
        </div>
      </div>
      <h3>TVShow Overview: </h3>
      <p className="description">{tvshowDetails.description}</p>
    </div>
  );
};
