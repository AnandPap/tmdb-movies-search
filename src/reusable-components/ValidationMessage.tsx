import { useAppSelector } from "../redux/hooks";

type ValidationMessageProps = {
  text: string;
};

const ValidationMessage = ({ text }: ValidationMessageProps) => {
  const darkMode = useAppSelector((state) => state.movies.darkMode);

  return (
    <h1 className={`validation-messages ${darkMode ? "dark" : "light"}`}>
      {text}
    </h1>
  );
};

export default ValidationMessage;
