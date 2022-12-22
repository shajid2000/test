import React, { useState } from "react";
import "./review.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addingReview } from "../../../redux/actions/posterActions";
const Review = ({ posterId, reviewToggle, setReviewToggle }) => {
  // console.log(posterId);
  const [review, setReview] = useState({
    rating: Number,
    description: "",
  });
  const dispatch = useDispatch();
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setReview((preVal) => {
      return { ...preVal, [name]: value };
    });
  };

  const addReview = () => {
    console.log(review);
    if (review.rating != "" && review.description != "") {
      dispatch(addingReview(review, posterId));

      window.alert("review added successfully");

      setReview({
        rating: Number,

        description: "",
      });
    } else {
      window.alert("please provide your views properly");
    }
    setReviewToggle(false);
  };
  // star

  const colors = {
    orange: "#f2994a",
    grey: "#a9a9a9",
  };
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);

    setReview({
      rating: value,
    });
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return reviewToggle ? (
    <div className="review-popup">
      <div className="review-cart-popupbox">
        <div className="review-container">
          <p className="review-title">Write a Review</p>
          <div className="parent">
            <div className="rating">
              <p>Add Ratings</p>
              <div className="star-box">
                <div className="line"></div>
                <div style={styles.stars}>
                  {stars.map((_, index) => {
                    return (
                      <FaStar
                        key={index}
                        size={24}
                        onClick={() => handleClick(index + 1)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave={handleMouseLeave}
                        color={
                          (hoverValue || currentValue) > index
                            ? colors.orange
                            : colors.grey
                        }
                        style={{
                          marginRight: 10,
                          cursor: "pointer",
                        }}
                      />
                    );
                  })}
                </div>
                <div className="line"></div>
              </div>
            </div>
            <div className="review">
              <p>Write your review</p>
              <div className="msg-box">
                
                <textarea
                  name="description"
                  id="msg"
                  cols="30"
                  rows="5"
                  placeholder="desc"
                  onChange={changeHandler}
                  value={setReview.description}
                ></textarea>
                <button onClick={addReview} className="review-btn">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Review;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
};
