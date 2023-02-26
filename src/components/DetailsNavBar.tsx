import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { setLoading } from "../redux/movies";
import BackButton from "../components-reusable/BackButton";
import tmdbIcon from "../assets/tmdbIcon.svg";
import AppIcon from "../components-reusable/AppIcon";

const DetailsNavBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="details-nav-bar">
      <AppIcon
        className="tmdb-icon"
        src={tmdbIcon}
        alt="TMDB Icon"
        onClick={() => location.pathname !== "/movies" && navigate("/movies")}
      />
      <BackButton
        onClick={() => {
          navigate(-1);
          dispatch(setLoading(true));
        }}
      />
    </div>
  );
};

export default DetailsNavBar;
