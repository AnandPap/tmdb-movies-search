type BackButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <button className={`nav-button back-button`} onClick={onClick}>
      <div className="back-button-arrow"></div>
      <p className="back-button-text">Back</p>
    </button>
  );
};

export default BackButton;
