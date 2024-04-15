import "./SubmitButton.css";

const SubmitButton = (props) => {
  return (
    <button className="submit-button" type="submit">
      <div className="outer-smallsb">
        <p className="paras">{props.text}</p>
      </div>
    </button>
  );
};

export default SubmitButton;
