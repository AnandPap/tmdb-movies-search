import noImage from "../assets/no-image.png";

type CoverImageProps = {
  className?: string;
  src: string;
};

const CoverImage = ({ className, src }: CoverImageProps) => {
  return src ? (
    <img className={className} src={src} alt="Cover Image"></img>
  ) : (
    <img className={className} src={noImage} alt="No Image" />
  );
};

export default CoverImage;
