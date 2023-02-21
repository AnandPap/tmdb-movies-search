import noImage from "../assets/no-image.png";
import SpinnerGIF from "../components-reusable/SpinnerGIF";

type CoverImage = {
  className?: string;
  loading: boolean;
  darkMode: boolean;
  imagePath: string;
};

const CoverImage = ({
  className,
  loading,
  darkMode,
  imagePath,
}: CoverImage) => {
  return loading ? (
    <SpinnerGIF />
  ) : imagePath ? (
    <img
      className={`cover-image ${className} ${darkMode ? "dark" : "light"}`}
      src={imagePath}
      alt="Cover Image"
    />
  ) : (
    <img className="cover-image" src={noImage} alt="No Image" />
  );
};

export default CoverImage;
