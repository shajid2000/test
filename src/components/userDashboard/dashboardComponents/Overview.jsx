import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import profileIcon from './../../../images/man.svg';
import profileIcon from "./../../../images/account/profile-icon-png.png";

import discountIcon from "./../../../images/discount.png";

import "./overview.css";

const Overview = (props) => {
  const navigate = useNavigate();
  const edit = () => {
    navigate("/userdashboard/7")
  };
  const userData = useSelector((state) => state.user.userDetail);

  return userData ? (
    <>
      <div className="overview">
        {userData && (
          <div className="overviewUp">
            <div className="dbProfile">
              <div className="dbProfileImg">
                <img src={profileIcon} alt="profile icon" />
              </div>

              <div className="dbProfileDetails">
                <div className="dbProfileName">
                  <span>{userData.name}</span>
                  <button onClick={edit} className="editProfile-btn">
                    Edit Profile
                  </button>
                </div>
                <div className="dbProfileEmail">{userData.emailid}</div>
                <div className="dbProfileNumber">{userData.phonenumber}</div>
              </div>
            </div>
          </div>
        )}

        <div className="overviewDown">
          <Link to="/userdashboard/2">
            <i class="fas fa-box"></i>
            <span>Orders</span>
          </Link>
          <Link to="/userdashboard/3">
            <i class="far fa-heart"></i>
            <span>Wishlist</span>
          </Link>
          <Link to="/userdashboard/4">
            <i class="far fa-address-card"></i>
            <span>Contact Us</span>
          </Link>
          <Link to="/userdashboard/5">
            <img src={discountIcon} alt="discount icon" />
            <span>Coupons</span>
          </Link>
          <Link to="/userdashboard/6">
            <i class="far fa-address-book"></i>
            <span>Saved Address</span>
          </Link>
          <Link to="/userdashboard/7">
            <i class="far fa-edit"></i>
            <span>Edit Profile</span>
          </Link>
        </div>
      </div>
    </>
  ) : null;
};

export default Overview;
