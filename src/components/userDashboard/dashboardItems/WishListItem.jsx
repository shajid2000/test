import React, { useEffect } from "react";

import "./wishlistitem.css";
import { useSelector, useDispatch } from "react-redux";
// images
import Besafe from "./../../../images/BeSafe.png";
import { useState } from "react";
import { getUser, removeWishList, updateWishlistWithoutSignin } from "../../../redux/actions/userAction";

const WishListItem = () => {
  const data = useSelector((state) => state.user.userDetail);
  const  wishlist = useSelector((state) => state.user.wishlist);
  const dispatch = useDispatch();
  const [posterId, setPosterID] = useState("");
  useEffect(() => {
if(localStorage.getItem("myuser")){
  dispatch(getUser());
}
  }, []);

  // console.log(wishlist,"wish");
  const removeWishlist = (poster_obj_id) => {
    // //console.log(poster_obj_id)
    if(!localStorage.getItem("myuser")){
      let data = wishlist.filter((i)=>{
        return i._id!= poster_obj_id
      })
      dispatch(updateWishlistWithoutSignin(data))
    }
    else{
      dispatch(removeWishList(false, poster_obj_id));
    }
   
  };
  return data ? (
    <>
      {data.wishList &&
        (data.wishList.length === 0
          ? "You need to add wishlist"
          : data.wishList.map((item) => {
            return (
              <div key={item._id} className="wishListItem">
                <img src={item.imgUrl} alt="fire" />
                <i
                  onClick={() => {
                    removeWishlist(item._id);
                  }}
                  className="fa fa-times mycross"
                  style={{ marginLeft: "20px" }}
                ></i>
                <div className="wishListContent">
                  <span className="wiName">{item.name}</span>
                  <span className="wiPriceDetails">
                    <span className="wiCurrentPrice">
                      ₹ {item.originalPrice}
                    </span>
                    <span className="wiRealPrice">₹ 999</span>
                    <span className="wiDiscount">65% off</span>
                  </span>
                  {/* <span className="wiMaterial">Material: <span>Self-adhesive 3mm sunboard</span></span> */}
                  {/* <span className="wiDimension">Dimension: <span>17" x 24"</span></span> */}
                  <span className="removeAddress"></span>
                </div>
              </div>
            );
          }))}
    </>
  ) :  (
    <>
      {wishlist &&
        (wishlist.length === 0
          ? "You need to add wishlist"
          : wishlist.map((item) => {
            return (
              <div key={item._id} className="wishListItem">
                <img src={item.imgUrl[0]} alt="fire" />
                <i
                  onClick={() => {
                    removeWishlist(item._id);
                  }}
                  className="fa fa-times mycross"
                  style={{ marginLeft: "20px" }}
                ></i>
                <div className="wishListContent">
                  <span className="wiName">{item.name}</span>
                  <span className="wiPriceDetails">
                    <span className="wiCurrentPrice">
                      ₹ {item.originalPrice}
                    </span>
                    <span className="wiRealPrice">₹ 999</span>
                    <span className="wiDiscount">65% off</span>
                  </span>
                  {/* <span className="wiMaterial">Material: <span>Self-adhesive 3mm sunboard</span></span> */}
                  {/* <span className="wiDimension">Dimension: <span>17" x 24"</span></span> */}
                  <span className="removeAddress"></span>
                </div>
              </div>
            );
          }))}
    </>
  )
};

export default WishListItem;
