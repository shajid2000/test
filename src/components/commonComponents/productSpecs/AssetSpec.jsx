import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductSpecification } from "../../../fetchData/getSpecificationById";
import { addProduct } from "../../../redux/actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import popupIcon from "./../../../images/popupIcon.png";
import "./specification.css";
// components
import Loading from "./../../commonComponents/LoadingScreen/Loading";
import Carousel from "react-elastic-carousel";
import coupon from "./../../../images/Coupon (2).png";
import lock from "./../../../images/lock.png";
import RazorPay from "./../../../images/Razorpay.png";
import ProductCard from "../Crads/productCard";
import PopUp, { AddToCartPopUp, WishlistPopup } from "../popUp/PopUp";
import dimension from "./../../../images/Dimension1.svg";
import colour from "./../../../images/Rectangle_68.png";
import footerBanner from "./../../../images/Poster.svg";
// icons
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Reviews from "./Reviews";
import {
  updateWishlistWithoutSignin,
  updateUserAddressAndWishlist,
} from "../../../redux/actions/userAction";

const AssetSpec = () => {
  let state = useSelector((state) => state.user);
  const [Mypopup, setMyPopup] = useState(false);
  const [wishList, setWishList] = useState(false);
  const [config, setConfig] = useState([]);
  const [specification, setSpecification] = useState();
  const [similar, setSimilar] = useState([]);
  const [youMayLike, setYouMayLike] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mat, setMat] = useState({
    activeMat: null,
    materials: [],
    activeColour: null,
    colours: ["red", "green", "blue", "yellow"],
    activeDim: null,
    dimensions: [],
    activeDetail: null,
    details: [],
  });
  const [popup, setPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [qty, setQty] = useState(0);

  const dispatch = useDispatch();

  const params = useParams();
  const [IsCartItem, setIsCartItem] = useState(false);
  let productId = params.productid;
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const index = cart.findIndex((ele) => ele.poster_details._id === productId);
  const [rating, setRating] = useState([]);
  const [totalrating, setTotalRating] = useState(Number);
  const [avgrating, setAvgRating] = useState(Number);
  const breakPoints = [
    // for carousel
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 4 },
    { width: 1200, itemsToShow: 4 },
  ];

  useEffect(() => {
    //console.log(index, "====inedx is ====");
    if (index !== undefined && index !== -1) {
      setIsCartItem(true);
    }
    const getSpecificationData = async () => {
      const response = await getProductSpecification(productId);
      if (response) {
        setSpecification(response.data.posterDetails[0]);
        setSimilar(response.data.realtedPosters);
        setYouMayLike(response.data.youMayAlsoLike);
        setConfig(response.data.posterDetails[0].materialDimension);
        setMat({
          ...mat,
          materials: response.data.posterDetails[0].materialDimension.filter(
            (elem, i) => {
              // return i % 2 !== 0 && i < 6;
              return (
                // i == 0 ||
                // elem.material_title !=
                //   response.data.posterDetails[0].materialDimension[i - 1]
                //     .material_title
                i > 0
              );
            }
          ),
          dimensions: response.data.posterDetails[0].materialDimension.filter(
            (elem, i) => {
              // return elem.material_title === "125 Micron Non Tear Paper";
              return (
                elem.material_title ===
                response.data.posterDetails[0].materialDimension[0]
                  .material_title
              );
            }
          ),
          details: response.data.posterDetails[0].description.split("|"),
          activeDetail: response.data.posterDetails[0].description
            .split("|")
            .filter((elem, i) => {
              return i > 5;
            }),
        });
      }
      window.scrollTo({ top: 0, behavior: "smooth" });

      setLoading(false);
      setRating(response.data.posterDetails[0].rating);
      setTotalRating(response.data.totalNoOfRating);
      setAvgRating(response.data.posterDetails[0].average_rating);
    };
    console.log(specification);
    getSpecificationData();
  }, [productId]);

  const handleClick = () => {
    setMat({
      ...mat,
      activeDim: null,
      activeColour: null,
    });
    setLoading(true);
  };

  //console.log(qty);
  // //console.log(mat)

  const setDimension = (i) => {
    setMat({ ...mat, activeDim: mat.dimensions[i] });
    setQty(0);
  };

  const setColour = (i) => {
    setMat({ ...mat, activeColour: mat.colours[i] });
  };

  const checkMaterial = () => {
    if (mat.activeDim === null) {
      setPopup(true);
      setPopupMsg("Dimension");
    } else if (mat.activeColour === null) {
      setPopup(true);
      setPopupMsg("Colour");
    } else {
      //console.log("object2");
      let price =
        mat.activeDim === null
          ? 0
          : qty === 0
          ? mat.activeDim.price
          : mat.activeDim.price * qty;
      let configuration = mat.activeDim;
      //console.log(qty)
      dispatch(
        addProduct({
          ...specification,
          price: price,
          quantity: qty,
          configuration: configuration,
          color: mat.activeColour,
        })
      );
      setMyPopup(true);
    }
  };
  const closePopup = () => {
    setPopup(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToWishlist = () => {
    if (!localStorage.getItem("myuser")) {
      let duplicate = false;

      state.wishlist.forEach((i) => {
        if (i._id === specification._id) {
          duplicate = true;
        }
      });

      if (!duplicate) {
        let data = state.wishlist.concat([{ ...specification }]);
        dispatch(updateWishlistWithoutSignin(data));
        setWishList(true);
      }
    } else {
      dispatch(updateUserAddressAndWishlist(true, productId, ""));
      setWishList(true);
    }
  };

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  } else {
    return (
      <>
        <div className="paginate">
          <Link to={`/category/${specification.category[0].cat_slug}`}>
            <span>{specification.category[0].title}</span>
          </Link>
          /
          <Link
            to={`/subcategory/${specification.category[0].cat_slug}?subCategorySlug=${specification.subCategory[0].sub_cat_slug}`}
          >
            <span>{specification.subCategory[0].title}</span>
          </Link>
          /<span>{specification.orginal_one_drive_link}</span>
        </div>
        <div className="productSpec">
          <div className="productImg">
            <img src={specification.imgUrl} alt="Product" className="proImg" />
          </div>
          {/* Please make the required chnages here as well this div is for mobile view only 

                  to make this page responsive i've use this div 
                   */}
          <div id="detailOfProductSmall">
            <div className="productName">{specification.name}</div>
            <div className="productRating">
              4.6 ⭐⭐⭐⭐⭐ <span className="totalRatings">(20)</span>
              <span className="availability">In Stock</span>
            </div>
            <div className="productPrice">
              <span className="proDiscountPrice">
                ₹
                {mat.activeDim === null
                  ? 0
                  : qty === 0
                  ? mat.activeDim.price
                  : mat.activeDim.price * qty}
              </span>
              <span className="proRealPrice">999</span>
              <span className="proDiscount">65% off</span>
            </div>
          </div>
          <div className="productConfig">
            <div className="configuration">
              <div className="configTitle">Select Dimensions</div>
              <div className="configOptions">
                {mat.dimensions.map((elem, i) => {
                  return (
                    <div
                      key={elem._id}
                      className={
                        mat.activeDim === null
                          ? "configOption configGray"
                          : mat.activeDim._id === elem._id
                          ? "configOption configBlue"
                          : "configOption configGray"
                      }
                      onClick={() => {
                        setDimension(i);
                      }}
                    >
                      <img src={elem.dimension_imgUrl} alt="dimension" />
                      <span className="configData">{elem.dimension_title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="configuration color">
              <div className="configTitle">Select Colour</div>
              <div className="configOptions">
                {mat.colours.map((elem, i) => {
                  return (
                    <div
                      key={elem._id}
                      className={
                        mat.activeColour === null
                          ? "configOption configGray"
                          : mat.activeColour === elem
                          ? "configOption configBlue"
                          : "configOption configGray"
                      }
                      onClick={() => {
                        setColour(i);
                      }}
                    >
                      <span className={`configColor ${elem}`}></span>
                      <span className="configData">{elem}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="productDetails">
            {/* 29/09/2022 if anyone is working in below div don't forget to make changes in div with id=detailOfProductSmall*/}
            <div id="detailOfProductBig">
              <div className="productName">{specification.name}</div>
              <div className="productRating">
                4.6⭐⭐⭐⭐ <span className="totalRatings">(20)</span>
                <span className="availability">In Stock</span>
              </div>
              <div className="bought">473 bought this</div>
              <div className="productPrice">
                <span className="proDiscountPrice">
                  ₹
                  {mat.activeDim === null
                    ? 0
                    : qty === 0
                    ? mat.activeDim.price
                    : mat.activeDim.price * qty}
                </span>
                <span className="proRealPrice">999</span>
                <span className="proDiscount">65% off</span>
              </div>
              <p>Inclusive of all taxes</p>
              <div className="coupon">
                <img src={coupon} />
                <input type="checkbox" />
                <label htmlFor="">Apply Rs.600 coupon</label>
                <p>Terms</p>
              </div>
              <div className="ship">
                Shipping free for orders above INR 2000 Get delivery in 4 hours
                <span>(check availability)</span> Performa Invoices can be
                generated at checkout
              </div>
            </div>
            <div className="detailspro">
              <div className="proDetailsTitle">Product Details</div>
              <ul className="proDetail">
                {mat.activeDetail.map((elem, i) => {
                  return <li key={elem._id}>{elem}</li>;
                })}
              </ul>
            </div>
          </div>
          <div className="prodbuy">
            <div className="quantity">
              <div>Quantity</div>
              <div className="qty-and-wishlist">
                <div className="productQty">
                  <i
                    class="fas fa-minus"
                    onClick={() => {
                      setQty(qty > 0 ? qty - 1 : 0);
                    }}
                  ></i>
                  <span className="qtyVal">{qty}</span>
                  <i
                    class="fas fa-plus"
                    onClick={() => {
                      setQty(qty + 1);
                    }}
                  ></i>
                </div>
              </div>
            </div>
            <div className="productButtons">
              <button
                className="addToCart-btn"
                onClick={() => {
                  setQty(qty === 0 ? 1 : qty);
                  checkMaterial();
                }}
              >
                {/*console.log(IsCartItem)*/}
                <span> ADD TO CART</span>
              </button>

              <button
                className="buyNow-btn"
                onClick={() => {
                  navigate("/cartPage");
                  checkMaterial();
                }}
              >
                <span> BUY NOW</span>
              </button>
              <div className="transition">
                <img src={lock} />
                <p>Secure transaction</p>
              </div>
              <div className="razor">
                <img src={RazorPay} />
              </div>
            </div>
          </div>
        </div>

        <PopUp popup={popup}>
          <div className="materialPopup">
            <img src={popupIcon} alt="select configuration" />
            <div className="popupDetails">
              <span className="popupH">Please select {popupMsg}</span>
              <span className="popupT">
                Choose the appropriate material and dimension before adding an
                item to the cart{" "}
              </span>
            </div>
            <CloseIcon className="closePopup" onClick={closePopup} />
          </div>
        </PopUp>
        <AddToCartPopUp popup={Mypopup} setMyPopup={setMyPopup} />
        <WishlistPopup popup={wishList} setMyPopup={setWishList} />
        <div className="pr-line"></div>
        <Reviews
          rating={rating}
          totalrating={totalrating}
          avgrating={avgrating}
        />
        <div className="pr-line"></div>
        <div className="rpTitle">Related {specification.category[0].title}</div>

        <Carousel
          breakPoints={breakPoints}
          pagination={false}
          itemPadding={[10, 10, 10, 10]}
          className="similarPosters"
        >
          {similar.map((elem, i) => {
            return (
              <Link
                key={elem._id}
                to={`/assetspecification/${elem._id}`}
                className="bsLink"
                onClick={handleClick}
              >
                <ProductCard
                  src={elem.imgUrl[0]}
                  title={elem.name}
                  id={elem._id}
                />
              </Link>
            );
          })}
        </Carousel>

        <div className="rpTitle">You may also likke</div>

        <Carousel
          breakPoints={breakPoints}
          pagination={false}
          itemPadding={[10, 10, 10, 10]}
          className="similarPosters"
        >
          {youMayLike.map((elem, i) => {
            return (
              <Link
                key={elem._id}
                to={`/posterspecification/${elem._id}`}
                className="bsLink"
                onClick={handleClick}
              >
                <ProductCard
                  src={elem.imgUrl[0]}
                  title={elem.name}
                  id={elem._id}
                />
              </Link>
            );
          })}
        </Carousel>

        <div className="footerBanner">
          <img src={footerBanner} alt="footer banner" />
        </div>
      </>
    );
  }
};

export default AssetSpec;
