import React from "react";
import "./popup.css";
import CloseIcon from "@mui/icons-material/Close";
import cartPopupImg from "../../../images/popups/addtocartPic.svg";
import wishListPopup from "../../../images/popups/wishlistPopup.svg";
import placeorderPic from "../../../images/popups/placeoreder.svg";
import logoutPic from "../../../images/popups/logoutPopup.svg";
import diyPopup from "../../../images/popups/diyPopup.svg";
import { Link, useNavigate } from "react-router-dom";
const PopUp = ({ popup, children }) => {
  // //console.log(children);
  return (
    <>
      {popup !== true ? null : (
        <div className="popup">
          <div className="popupBox">{children}</div>
        </div>
      )}
    </>
  );
};
const WishlistPopup = ({ popup, setMyPopup }) => {
  const navigate = useNavigate();
  const continueShop = () => {
    navigate(-1);
  };
  const closePopup = () => {
    setMyPopup(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {popup !== true ? null : (
        <div className="popup">
          <div className="cart-popupbox">
            <div className="add-to-cart-popup">
              <img src={wishListPopup} alt="select configuration" />
              <span className="popup-Head">Yay!</span>
              <span className="popup-desc">
                Your product has been successfully added to wishlist.
              </span>
              <div className="btn-cart">
                <button id="cart-btn" onClick={continueShop}>
                  CONTINUE SHOPPING
                </button>
                <Link to="/cartpage">
                  <button>GO TO CART</button>
                </Link>
              </div>
            </div>
            <span className="cross">
              <CloseIcon className="closePopup" onClick={closePopup} />
            </span>
          </div>
        </div>
      )}
    </>
  );
};
const AddToCartPopUp = ({ popup, setMyPopup }) => {
  const navigate = useNavigate();
  const continueShop = () => {
    navigate(-1);
  };
  const closePopup = () => {
    setMyPopup(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {popup !== true ? null : (
        <div className="popup">
          <div className="cart-popupbox">
            <div className="add-to-cart-popup">
              <img src={cartPopupImg} alt="select configuration" />
              <span className="popup-Head">Congrats</span>
              <span className="popup-desc">
                Product added to cart successfully. Would you like to proceed to
                checkout ?
              </span>
              <div className="btn-cart">
                <button id="cart-btn" onClick={continueShop}>
                  CONTINUE SHOPPING
                </button>

                <Link to="/cartpage">
                  <button>GO TO CART</button>
                </Link>
              </div>
            </div>
            <span className="cross">
              <CloseIcon className="closePopup" onClick={closePopup} />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

const CommonPopup = ({
  popup,
  image,
  setMyPopup,
  desc,
  heading,
  secondBtn,
}) => {
  const navigate = useNavigate();
  const continueShop = () => {
    navigate("/");
  };
  const closePopup = () => {
    setMyPopup(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {popup !== true ? null : (
        <div className="popup">
          <div className="cart-popupbox">
            <div className="add-to-cart-popup">
              <img src={image} alt="select configuration" />
              <span className="popup-Head">{heading}</span>
              <span className="popup-desc">{desc}</span>
              <div className="btn-cart">
                <button id="cart-btn" onClick={continueShop}>
                  CONTINUE SHOPPING
                </button>
                {secondBtn && (
                  <Link to="/cartpage">
                    <button>GO TO CART</button>
                  </Link>
                )}
              </div>
            </div>
            <span className="cross">
              <CloseIcon className="closePopup" onClick={closePopup} />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

const OrderPlacedPopUp = ({ popup }) => {
  const navigate = useNavigate();
  const continueShop = () => {
    navigate("/");
  };

  return (
    <>
      {popup !== true ? null : (
        <div className="popup">
          <div className="cart-popupbox">
            <div className="add-to-cart-popup">
              <img src={placeorderPic} alt="select configuration" />
              <span className="popup-Head">Congratulations</span>
              <span className="popup-desc">
                Your order has been placed and will be delivered to you soon.
                You will receive an order confirmation email with details of
                your order.
              </span>
              <div className="btn-cart order-btn">
                <button id="cart-btn" onClick={continueShop}>
                  CONTINUE SHOPPING
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const DiyPopUp = ({ title, msg, setMyPopup }) => {
  const navigate = useNavigate();
  const continueShop = () => {
    navigate("/");
  };
  const closePopup = () => {
    setMyPopup(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="popup">
        <div className="cart-popupbox">
          <div className="add-to-cart-popup">
            <img src={diyPopup} alt="select configuration" />
            <span className="popup-Head">{title}!</span>
            <span className="popup-desc">‘{msg}’</span>
            <div className="btn-cart">
              <button id="cart-btn" onClick={continueShop}>
                CONTINUE SHOPPING
              </button>
              <Link to="/cartpage">
                <button>GO TO CART</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const LogOutPopup = ({ popup, setMyPopup }) => {
  const navigate = useNavigate();
  // navigate("/");
  const continueShop = () => {
    setMyPopup(false);
    navigate("/");
  };
  const closePopup = () => {
    setMyPopup(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {popup !== true ? null : (
        <div className="popup">
          <div className="cart-popupbox">
            <div className="add-to-cart-popup">
              <img src={logoutPic} alt="select configuration" />
              <span className="popup-Head">Ooops!</span>
              <span className="popup-desc">
                It seems you have signout. Please Login to have a better
                experience.
              </span>
              <div className="btn-cart">
                <button id="cart-btn" onClick={continueShop}>
                  CONTINUE SHOPPING
                </button>
                <Link to="/signin" onClick={() => setMyPopup(false)}>
                  <button>SIGN IN</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
const AddressPopup = ({ popup, children }) => {
  return (
    <>
      {popup !== true ? null : (
        <div className="popup">
          <div className="popupBox">{children}</div>
        </div>
      )}
    </>
  );
};
export {
  LogOutPopup,
  OrderPlacedPopUp,
  WishlistPopup,
  AddToCartPopUp,
  DiyPopUp,
  AddressPopup,
  CommonPopup,
};
export default PopUp;
