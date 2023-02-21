import { useAppSelector } from "../redux/hooks";

type BackButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const BackButton = ({ onClick }: BackButtonProps) => {
  const darkMode = useAppSelector((state) => state.movies.darkMode);
  return (
    <div className="back-button-wrapper">
      <button
        className={`back-button ${darkMode ? "dark" : "light"}`}
        onClick={onClick}
      >
        <div className="back-button-arrow"></div>
        <p className="back-button-text">Back</p>
      </button>
    </div>
  );
};

export default BackButton;
