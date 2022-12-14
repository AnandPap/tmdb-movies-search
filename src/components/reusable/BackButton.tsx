export const BackButton = (props: {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className="back-button-wrapper">
      <button className="back-button" onClick={props.onClick}>
        <div className="back-button-arrow"></div>
        <p className="back-button-text">{props.text}</p>
      </button>
    </div>
  );
};
