import noImage from "../assets/no-image.png";
import SpinnerGIF from "../reusable-components/SpinnerGIF";

type CoverImage = {
  loading: boolean;
  darkMode: boolean;
  imagePath: string;
};

const CoverImage = ({ loading, darkMode, imagePath }: CoverImage) => {
  return loading ? (
    <SpinnerGIF />
  ) : imagePath ? (
    <img
      className={`cover-image ${darkMode ? "dark" : "light"}`}
      src={imagePath}
      alt="Cover Image"
    />
  ) : (
    <img className="cover-image" src={noImage} alt="No Image" />
  );
};

export default CoverImage;
