const ValidationMessage = (props: { text: string }) => {
  return <h1 className="validation-messages">{props.text}</h1>;
};

export default ValidationMessage;
