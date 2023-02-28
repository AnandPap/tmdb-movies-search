import noImage from "../assets/no-image.png";

type CoverImageProps = {
  className?: string;
  darkMode: boolean;
  imagePath: string;
};

const CoverImage = ({ className, darkMode, imagePath }: CoverImageProps) => {
  return imagePath ? (
    <img
      className={`${className} ${darkMode ? "dark" : "light"}`}
      src={imagePath}
      alt="Cover Image"
    />
  ) : (
    <img className={className} src={noImage} alt="No Image" />
  );
};

export default CoverImage;
