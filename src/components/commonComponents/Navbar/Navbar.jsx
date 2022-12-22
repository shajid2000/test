import React, { useState, memo, useEffect } from "react";
import "./Navbar.css";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Logo, signupIcon, ShopCart } from "../../../images";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { LogOutPopup } from "../popUp/PopUp";
import {
  userpng,
  up,
  down,
  orders,
  contact,
  coupons,
  wishlist,
} from "../../../images/account";
import SideBar from "./SideBar";
import { getUser, userSignout } from "../../../redux/actions/userAction";

const Navbar = (props) => {
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [popup, setPopup] = useState(false);
  const user_details = useSelector((state) => state.user.userDetail);
  const cartLength = useSelector((state) => {
    if (state.cart.cart.length === 1 && state.cart.cart[0] === null) return 0;
    return state.cart.cart.length;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.key("myuser")) {
      dispatch(getUser());
    }
  }, []);

  const menuItems = (
    <>
      <li>
        <SideBar />
      </li>
      <li>
        <Link to="/category/posters">Posters</Link>
      </li>
      <li>
        <Link to="/category/signages">Signages</Link>
      </li>
      <li>
        <Link to="/category/floor-graphics">Floor Graphics</Link>
      </li>
      <li>
        <Link to="/category/asset-markings">Asset Markings</Link>
      </li>
      <li>
        <Link to="/category/Pictograms">Pictograms</Link>
      </li>
      <li>
        <Link to="/resources">Campaigns</Link>
      </li>
      <li className="diy-link">
        <Link to="/diy">Create Your Own</Link>
      </li>
      <li>
        <Link to="/resources">Resources</Link>
      </li>
      <li>
        <Link to="/bulkorder">Bulk Order</Link>
      </li>

      <li>
        <Link to="/about">About Us</Link>
      </li>
      <li>
        <Link to="/contact">Contact Us</Link>
      </li>
    </>
  );

  return (
    <div className="nav-ehs">
      <div className="navbar-ehs">
        <div className="widthControl">
          <div className="uppermenu">
            <div className="flexible_logo">
              <div onClick={() => setOpen(!open)} className="hamburger">
                {open ? (
                  <FontAwesomeIcon
                    icon={faBars}
                    style={{ visibility: "hidden" }}
                  />
                ) : (
                  <FontAwesomeIcon icon={faBars} />
                )}
              </div>

              {/* ----navbar log code starts here---- */}

              <div className="ehsLogoWrapper">
                <Link to="/">
                  <img className="EHS-logo" src={Logo} alt="Logo" />
                </Link>
              </div>
            </div>

            <SearchBar />

            <div className="flexible_iscons">
              <div>
                {user_details ? (
                  <div className="acc-container">
                    <div
                      className="acc-head"
                      onClick={() => {
                        setToggle(!toggle);
                      }}
                    >
                      <img className="usericon" src={userpng} alt="" />
                      <p>{user_details.name.substr(0, 5)}...</p>
                      <img
                        className="arrowicon"
                        src={toggle ? down : up}
                        alt=""
                      />
                    </div>
                    {toggle && (
                      <div
                        className="acc-listcontainer"
                        onMouseLeave={() => setToggle(false)}
                        onClick={() => setToggle(false)}
                      >
                        <div className="list-padding">
                          <div className="list-head">
                            <p>Hi {user_details.name.substr(0, 12)}..!</p>
                          </div>
                          <div className="listbox">
                            <div className="list1">
                              <ul className="listul1 commonul">
                                <li>
                                  <img
                                    className="dropdown-icons"
                                    src={orders}
                                    alt="img"
                                  />
                                  <Link to="/userdashboard/2">Orders</Link>
                                </li>
                                <li>
                                  <img
                                    className="dropdown-icons"
                                    src={wishlist}
                                    alt="img"
                                  />
                                  <Link to="userdashboard/3">Wish List</Link>
                                </li>
                                <li>
                                  <img
                                    className="dropdown-icons"
                                    src={contact}
                                    alt="img"
                                  />
                                  <Link to="userdashboard/4">Contact Us</Link>
                                </li>
                                <li>
                                  <img
                                    className="dropdown-icons"
                                    src={coupons}
                                    alt="img"
                                  />
                                  <Link to="userdashboard/5">Coupons</Link>
                                </li>
                              </ul>
                            </div>
                            <div className="list2">
                              <ul className="listul2 commonul">
                                <Link to="/userdashboard/1">My Account</Link>
                                <Link to="/userdashboard/6">Saved Address</Link>
                                <Link to="/userdashboard/7">Edit Profile</Link>
                                <Link
                                  onClick={() => {
                                    dispatch(userSignout());
                                    navigate("/");
                                    setPopup(true);
                                  }}
                                >
                                  Sign Out
                                </Link>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/signup">
                    <img className="signupLarge" src={signupIcon} alt="" />
                  </Link>
                )}
              </div>
              <div className="cartIconContainer">
                <Link to="/cartpage">
                  <img className="cartIcon" src={ShopCart} alt="" />
                  <span className="cartLength">{cartLength}</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-menues">
            <div>
              <ul className="large_menu">{menuItems}</ul>
            </div>
          </div>
        </div>
      </div>

      <div className={`${open ? "sidebar1" : "sidebar2"}`}>
        <div className="flexible" onMouseLeave={() => setOpen(false)}>
          <div className="sidebar-all-menus">
            <ul className="sidebar_menu" onClick={() => setOpen(false)}>
              <li className="signInArrow">
                <span className="signInUser">
                  <span>
                    <PermIdentityIcon />
                  </span>
                  {user_details ? (
                    <Link to="userdashboard/1">{user_details.name}</Link>
                  ) : (
                    <Link to="/signup">Sign Up</Link>
                  )}
                </span>
                <span onClick={() => setOpen(false)}>
                  <ArrowBackIcon />
                </span>
              </li>
              {menuItems}
              <div className="line"></div>
              <li>
                <Link to="/userdashboard/2">My Orders</Link>
              </li>
              <li>
                <Link to="/cartpage">My Carts</Link>
              </li>
              <li>
                <Link to="/userdashboard/3">My Wishlist</Link>
              </li>
              <li>
                <Link to="/userdashboard/7">Account</Link>
              </li>
              <div className="line"></div>
              <li>
                <Link to="/contact">Help Centre</Link>
              </li>
            </ul>
          </div>
          <div className="leftshadow"></div>
        </div>
      </div>
      <LogOutPopup popup={popup} setMyPopup={setPopup} />
    </div>
  );
};

export default memo(Navbar);
