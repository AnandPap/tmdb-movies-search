import StarIcon from "../components-reusable/StarIcon";
import { ratingType } from "../pages/DetailsPage";

type TMDBRatingProps = {
  darkMode: boolean;
  rating: ratingType | null;
};

const TMDBRating = ({ darkMode, rating }: TMDBRatingProps) => {
  return (
    <>
      <h4 className={`tmdb-rating ${darkMode ? "dark" : "light"}`}>
        TMDB RATING
      </h4>
      <div className={`rating-wrapper ${darkMode ? "dark" : "light"}`}>
        <StarIcon
          className="star-icon"
          viewBox="0 0 25 25"
          fill="rgb(245, 197, 24)"
        />
        {rating ? (
          <div className="average-and-total-rating-wrapper">
            <div className="average-rating-wrapper">
              <p className="average-rating">{rating.voteAverage}</p>
              <p className={`vote-highest-mark ${darkMode ? "dark" : "light"}`}>
                /10
              </p>
            </div>
            <p className={`vote-count ${darkMode ? "dark" : "light"}`}>
              {rating.voteCount}
            </p>
          </div>
        ) : (
          <p>Not rated</p>
        )}
      </div>
    </>
  );
};

export default TMDBRating;
