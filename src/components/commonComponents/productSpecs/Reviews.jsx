import React from "react";
import { fakereviews } from "./fakeReviewAPI";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineSharpIcon from "@mui/icons-material/StarOutlineSharp";
import "./reviews.css";
const Reviews = ({rating, totalrating, avgrating}) => {
  const starStyle = {
    width: "50px",
    height: "50px",
  };
  return (
    <>
      <div className="reviews-container">
        <div className="rating-review">
          <h1 className="r-r">Ratings and Reviews</h1>
          <div className="rating-container">
            <div className="rating-left">
              <div className="final-rating">
                {avgrating} <StarOutlineSharpIcon style={starStyle} />
              </div>
              <p>{totalrating} Reviews</p>
            </div>
            <div className="rating-right">
              <Ratings rating="5" colorClass="five" />
              <Ratings rating="4" colorClass="four" />
              <Ratings rating="3" colorClass="three" />
              <Ratings rating="2" colorClass="two" />
              <Ratings rating="1" colorClass="one" />
            </div>
          </div>
        </div>
        <div className="reviews">
          <h3>Review</h3>
          {rating.length <= 0 ?"NO REVIEW" :rating.map((item, index) => {
            return (
              <div className="user-review" key ={index}>
                <div className="name-and-rating">
                  <div className="user-rating">
                    <span>{item.rating}</span>
                    <StarIcon />
                  </div>
                  <h5>{item.name}</h5>
                </div>
                <h4>{item.feedback}</h4>
                <div className="review-desc">{item.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Reviews;

const Ratings = ({ rating, colorClass }) => {
  return (
    <div className="each-rating">
      <div>
        <span>{rating}</span>
        <StarIcon />
      </div>
      <div className="rating-line">
        <div className={colorClass}></div>
      </div>
    </div>
  );
};
