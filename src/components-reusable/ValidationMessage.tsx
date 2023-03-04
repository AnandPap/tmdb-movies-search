import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hooks";
import { setDarkMode } from "../redux/movies";

type ValidationMessageProps = {
  className?: string;
  text: string;
};

const ValidationMessage = ({ className, text }: ValidationMessageProps) => {
  const darkMode = useAppSelector((state) => state.movies.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    let darkMode = localStorage.getItem("darkMode");
    if (darkMode) dispatch(setDarkMode(JSON.parse(darkMode)));
  }, []);

  return (
    <div
      className={`validation-message-wrapper ${className} ${
        darkMode ? "dark" : "light"
      }`}
    >
      <h2>{text}</h2>
    </div>
  );
};

export default ValidationMessage;
