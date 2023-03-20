import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hooks";
import { setTheme } from "../redux/movies";

type ValidationMessageProps = {
  className?: string;
  text: string;
};

const ValidationMessage = ({ className, text }: ValidationMessageProps) => {
  const theme = useAppSelector((state) => state.movies.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    let theme = localStorage.getItem("theme");
    if (theme)
      if (theme === "dark" || theme === "light") dispatch(setTheme(theme));
  }, []);

  return (
    <div className={`validation-message-wrapper ${className} ${theme}`}>
      <h2>{text}</h2>
    </div>
  );
};

export default ValidationMessage;
