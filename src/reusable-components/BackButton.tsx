const BackButton = (props: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className="back-button-wrapper">
      <button className="back-button" onClick={props.onClick}>
        <div className="back-button-arrow"></div>
        <p className="back-button-text">Back</p>
      </button>
    </div>
  );
};

export default BackButton;
