import { Link } from "react-router-dom";
import "./Card.css";
import img from "./bi_fire.png";
const Card = (props) => {
  const title = props.title;
  return (
    <div className="card">
      <div>
      <img className="CardImg" src={props.src} alt="im" />
      </div>
      <div className="cardOverlay">{title}</div>
    </div>
  );
};
const SmallCard = (props) => {
  const title = props.title;
  return (
    <div className="smallcard">
      <img className="smallCardImg" src={props.src} alt="im" />
      <div className="cardOverlay">{title}</div>
    </div>
  );
};

const LangCard = (props) => {
  const title = props.title;
  return (
    <div className="card2">
      {/* <img className="CardImg" src={img} alt="im" /> */}
      <div className="cardOverlay2">{title}</div>
      <div className=" cardOverlay3">
        {title == "hindi" ? "हिन्दी" : title == "english" ? "English" : "मराठी"}
      </div>
    </div>
  );
};
export { LangCard, SmallCard };
export default Card;
