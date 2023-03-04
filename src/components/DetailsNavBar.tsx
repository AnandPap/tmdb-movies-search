import { useNavigate } from "react-router-dom";
import BackButton from "../components-reusable/BackButton";
import tmdbIcon from "../assets/tmdbIcon.svg";
import AppIcon from "../components-reusable/AppIcon";
import LottieDarkModeSwitch from "../components-reusable/LottieDarkModeSwitch";

const DetailsNavBar = () => {
  const navigate = useNavigate();

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
        }}
      />
      <LottieDarkModeSwitch />
    </div>
  );
};

export default DetailsNavBar;
