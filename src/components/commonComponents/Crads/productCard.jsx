import { Link } from "react-router-dom";
import './productCard.css';
import beSafe from '../../../images/P1010.jpg';

const ProductCard = (props) => {
  const title = props.title;
  return (
    <div className="pcard">
      <div className="pCardImg" >
        <img className="Img" src={props.src} alt="im" />
      </div>
      <div className="desc">
        {title}
      </div>    
    </div>
      
  );
};
export default ProductCard;
