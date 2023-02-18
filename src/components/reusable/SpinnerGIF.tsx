import spinner from "../../assets/spinner.gif";

const SpinnerGIF = () => {
  return (
    <div className="spinner-wrapper">
      <img src={spinner} alt="Picture is loading" />
    </div>
  );
};

export default SpinnerGIF;
