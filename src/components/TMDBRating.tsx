import StarIcon from "../components-reusable/StarIcon";
import { ratingType } from "../pages/DetailsPage";

type TMDBRatingProps = {
  theme: "dark" | "light";
  rating: ratingType | null;
};

const TMDBRating = ({ theme, rating }: TMDBRatingProps) => {
  return (
    <div className="tmdb-rating-wrapper">
      <h4 className={`tmdb-rating ${theme}`}>TMDB RATING</h4>
      <div className={`rating-wrapper ${theme}`}>
        <StarIcon
          className="star-icon"
          viewBox="0 0 25 25"
          fill="rgb(245, 197, 24)"
        />
        {rating ? (
          <div className="average-and-total-rating-wrapper">
            <div className="average-rating-wrapper">
              <p className="average-rating">{rating.voteAverage}</p>
              <p className={`vote-highest-mark ${theme}`}>/10</p>
            </div>
            <p className={`vote-count ${theme}`}>{rating.voteCount}</p>
          </div>
        ) : (
          <p>Not rated</p>
        )}
      </div>
    </div>
  );
};

export default TMDBRating;
