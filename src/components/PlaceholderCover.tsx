import SpinnerGIF from "../components-reusable/SpinnerGIF";

const PlaceholderCover = () => {
  return (
    <div className="placeholder-cover">
      <SpinnerGIF className="spinner-wrapper" />
      <div className="placeholder-cover-title"></div>
    </div>
  );
};

export default PlaceholderCover;
