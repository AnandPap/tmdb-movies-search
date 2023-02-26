type BackButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <div className="back-button-wrapper">
      <button className={`nav-button back-button`} onClick={onClick}>
        <div className="back-button-arrow"></div>
        <p className="back-button-text">Back</p>
      </button>
    </div>
  );
};

export default BackButton;
