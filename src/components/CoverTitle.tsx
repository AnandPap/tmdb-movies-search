type CoverTitleProps = {
  className: string;
  title: string;
};

const CoverTitle = ({ className, title }: CoverTitleProps) => {
  return (
    <div className={className}>
      <h2>{title ? title : "No title"}</h2>
    </div>
  );
};

export default CoverTitle;
