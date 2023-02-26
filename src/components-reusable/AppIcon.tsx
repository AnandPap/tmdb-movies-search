type AppIconProps = {
  className: string;
  src: string;
  alt: string;
  onClick: React.MouseEventHandler<HTMLImageElement>;
};

const AppIcon = ({ className, src, alt, onClick }: AppIconProps) => {
  return <img className={className} src={src} alt={alt} onClick={onClick} />;
};

export default AppIcon;
