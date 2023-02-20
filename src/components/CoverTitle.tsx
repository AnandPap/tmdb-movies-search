const CoverTitle = (props: { className: string; title: string }) => {
  return (
    <div className={props.className}>
      <h2>{props.title ? props.title : "No title"}</h2>
    </div>
  );
};

export default CoverTitle;
