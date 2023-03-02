type ValidationMessageProps = {
  className: string;
  text: string;
};

const ValidationMessage = ({ className, text }: ValidationMessageProps) => {
  let darkMode = localStorage.getItem("darkMode");
  darkMode ? (darkMode = JSON.parse(darkMode)) : null;

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
