import noImage from "../assets/no-image.png";

type CoverImageProps = {
  className?: string;
  posterURL: string;
};

const CoverImage = ({ className, posterURL }: CoverImageProps) => {
  return posterURL ? (
    <img className={className} src={posterURL} alt="Cover Image" />
  ) : (
    <img className={className} src={noImage} alt="No Image" />
  );
};

export default CoverImage;
