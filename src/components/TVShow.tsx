import { useEffect, useState } from "react";
import { fetchTVShow } from "../apis/fetchTVShows";
import noImage from "../assets/no-image.png";

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
  useEffect(() => {
    fetchTVShow(props.tvshowID, setTVShowDetails);
  }, [props.tvshowID]);

  return (
    <>
      {location.pathname !== "/tvshows" ? (
        <div className="details-page-tvshow">
          {tvshowDetails.trailer ? (
            <iframe
              src={tvshowDetails.trailer}
              title="Video Player"
              allowFullScreen
            ></iframe>
          ) : (
            <img
              className="cover-image"
              src={tvshowDetails.image}
              alt="TVShow Cover"
            />
          )}
          <h3>{tvshowDetails.title}</h3>
          <h6>TVShow Overview: </h6>
          <p>{tvshowDetails.description}</p>
        </div>
      ) : (
        <div className="main-page-tvshow">
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
      )}
    </>
  );
};
