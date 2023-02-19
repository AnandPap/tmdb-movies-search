import { useAppSelector } from "../../../redux/hooks";

const ValidationMessage = (props: { text: string }) => {
  const darkMode = useAppSelector((state) => state.movies.darkMode);

  return (
    <h1 className={`validation-messages ${darkMode ? "dark" : "light"}`}>
      {props.text}
    </h1>
  );
};

export default ValidationMessage;
