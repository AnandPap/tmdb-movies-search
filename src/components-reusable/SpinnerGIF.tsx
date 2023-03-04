import spinner from "./assets/spinner.gif";

type SpinnerGIFProps = {
  className: string;
};

const SpinnerGIF = ({ className }: SpinnerGIFProps) => {
  return (
    <div className={className}>
      <img src={spinner} alt="Picture is loading" />
    </div>
  );
};

export default SpinnerGIF;
