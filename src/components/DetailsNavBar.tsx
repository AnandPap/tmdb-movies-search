import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { setLoading } from "../redux/movies";
import BackButton from "../components-reusable/BackButton";
import tmdbIcon from "../assets/tmdbIcon.svg";

const DetailsNavBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="details-nav-bar">
      <img className="tmdb-icon" src={tmdbIcon} alt="TMDB Icon" />
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
