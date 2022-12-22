import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductSpecification } from "../../../fetchData/getSpecificationById";
import { addProduct } from "../../../redux/actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import popupIcon from "./../../../images/popupIcon.png";
import "./specification.css";
import coupon from "./../../../images/Coupon (2).png";
import RazorPay from "./../../../images/Razorpay.png";

// components
import Loading from "./../../commonComponents/LoadingScreen/Loading";
import Carousel from "react-elastic-carousel";
import ProductCard from "../Crads/productCard";
import RelatedCard from "./RelatedCard";
import CloseIcon from "@mui/icons-material/Close";
import PopUp, { WishlistPopup, AddToCartPopUp } from "../popUp/PopUp";
// images
import dimension from "./../../../images/Dimension1.svg";
import material from "./../../../images/Fold.svg";
import footerBanner from "./../../../images/Poster.svg";

// icons
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import {
  updateWishlistWithoutSignin,
  updateUserAddressAndWishlist,
} from "../../../redux/actions/userAction";

import Reviews from "./Reviews";
import lock from "./../../../images/lock.png";

const Specification = () => {
  let state = useSelector((state) => state.user);
  console.log(state)
  const [specification, setSpecification] = useState();
  const [similar, setSimilar] = useState([]);
  const [youMayLike, setYouMayLike] = useState([]);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState([]);
  const [mat, setMat] = useState({
    activeMat: null,
    materials: [],
    activeDim: null,
    dimensions: [],
    activeDetail: null,
    details: [],
  });
  const [popup, setPopup] = useState(false);
  const [Mypopup, setMyPopup] = useState(false);
  const [wishList, setWishList] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [qty, setQty] = useState(0);
  const [IsCartItem, setIsCartItem] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  //console.log(cart, "cart is -----");
  const params = useParams();
  const navigate = useNavigate();
  let productId = params.productid;
  const [rating, setRating] = useState([]);
  const [totalrating, setTotalRating] = useState(Number);
  const [avgrating, setAvgRating] = useState(Number);

  const index = cart.findIndex((ele) => ele.poster_details._id === productId);

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
      console.log(mat);
      window.scrollTo({ top: 0, behavior: "smooth" });

      setLoading(false);
      setRating(response.data.posterDetails[0].rating);
      setTotalRating(response.data.totalNoOfRating);
      setAvgRating(response.data.posterDetails[0].average_rating);
    };

    getSpecificationData();
  }, [productId]);

  const handleClick = () => {
    setMat({ ...mat, activeMat: null, activeDim: null, activeDetail: null });
    setQty(0);
    setLoading(true);
  };
  const setActiveDetail = (i) => {
    if (i === 0) {
      return mat.details.filter((elem, i) => {
        return i < 3 || i > 5;
      });
    } else if (i === 1) {
      return mat.details.filter((elem, i) => {
        return i === 4 || i > 5;
      });
    } else {
      return mat.details.filter((elem, i) => {
        return i === 2 || i > 3;
      });
    }
  };

  const setMaterial = (i) => {
    setMat({
      ...mat,
      activeMat: mat.materials[i],
      dimensions: config.filter((elem) => {
        return elem.material_title === mat.materials[i].material_title;
      }),
      activeDim: null,
      activeDetail: setActiveDetail(i),
    });
    setQty(0);
  };

  const setDimension = (i) => {
    setMat({ ...mat, activeDim: mat.dimensions[i] });
  };

  const checkMaterial = () => {
    if (mat.activeMat === null) {
      setPopup(true);
      setPopupMsg("Material");
    } else if (mat.activeDim === null) {
      setPopup(true);
      setPopupMsg("Dimension");
    } else {
      //console.log("dispatched");
      let price =
        mat.activeDim === null
          ? 0
          : qty === 0
          ? mat.activeDim.price
          : mat.activeDim.price * qty;
      let configuration = mat.activeDim;
      dispatch(
        addProduct({
          ...specification,
          price: price,
          quantity: qty,
          configuration: configuration,
          color: null,
        })
      );
      setMyPopup(true);
    }
  };

  const closePopup = () => {
    setPopup(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // const addToWishlist = () => {
  //   if (!localStorage.getItem("myuser")) {
  //     let duplicate = false;

  //     state.wishlist.forEach((i) => {
  //       if (i._id === specification._id) {
  //         duplicate = true;
  //       }
  //     });

  //     if (!duplicate) {
  //       let data = state.wishlist.concat([{ ...specification }]);
  //       dispatch(updateWishlistWithoutSignin(data));
  //       setWishList(true);
  //     }
  //   } else {
  //     dispatch(updateUserAddressAndWishlist(true, productId, ""));
  //     setWishList(true);
  //   }
  // };
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
          {/* #detailOfProductSmall Please make the required chnages here as well this div is for mobile view only 
                  to make this page responsive i've use this div 
                   */}
          <div id="detailOfProductSmall">
            <div className="productName">{specification.name}</div>
            <div className="productRating">
              4.6 ⭐⭐⭐⭐ <span className="totalRatings">(20)</span>
              <span className="availability">In Stockk</span>
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
              <div className="configTitle">Select Material</div>
              <div className="configOptions">
                {mat.materials.map((elem, i) => {
                  return (
                    <div
                      key={elem._id}
                      className={
                        mat.activeMat === null
                          ? "configOption configGray"
                          : mat.activeMat._id === elem._id
                          ? "configOption configBlue"
                          : "configOption configGray"
                      }
                      onClick={() => {
                        setMaterial(i);
                      }}
                    >
                      <img src={elem.material_imgUrl} alt="dimension" />
                      <span className="configData">{elem.material_title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="configuration">
              <div className="configTitle">Select Dimensions</div>
              <div className="configOptions">
                {mat.dimensions.map((elem, i) => {
                  return (
                    <div
                      key={elem._id}
                      className={
                        mat.activeDim === null
                          ? "dimetit"
                          : mat.activeDim._id === elem._id
                          ? "dimetit blue"
                          : "dimetit"
                      }
                      onClick={() => {
                        setDimension(i);
                      }}
                      // key={i}
                    >
                      <span className="configtile">{elem.dimension_title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* <div className="configTitle">Select Material</div>
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
                        console.log(mat.activeDim);
                      }}
                    >
                      <img src={elem.material_imgUrl} alt="dimension" />
                      <span className="configData">{elem.material_title}</span>
                    </div>
                  );
                })}
              </div>
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
              </div> */}
          {/* <div className="qty-and-wishlist">
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
              <div className="wishlist">
                <button className="wishlist-btn" onClick={addToWishlist}>
                  <span> Wishlistt</span>
                  <FavoriteBorderOutlinedIcon />
                </button>
              </div>
            </div> */}
          {/* <div className="productButtons">
              {IsCartItem === false ? (
                <button
                  className="addToCart-btn"
                  onClick={() => {
                    setQty(qty === 0 ? 1 : qty);
                    checkMaterial();
                  }}
                >
                  <span> ADD TO CART</span>
                  <LocalMallOutlinedIcon />
                </button>
              ) : (
                <button
                  className="buyNow-btn"
                  onClick={() => {
                    navigate("/cartPage");
                  }}
                >
                  <span> BUY NOW</span>
                  <ShoppingCartOutlinedIcon />
                </button>
              )}
            </div> */}

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
        {/* Working in above div */}
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
                to={`/specification/${elem._id}`}
                className="bsLink"
                onClick={handleClick}
              >
                <RelatedCard
                  photo={elem.imgUrl[0]}
                  name={elem.name}
                  price={elem.originalPrice}
                  id={elem._id}
                />
              </Link>
            );
          })}
        </Carousel>

        <div className="rpTitle">You may also like</div>

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
                <RelatedCard
                  photo={elem.imgUrl[0]}
                  name={elem.name}
                  price={elem.originalPrice}
                  id={elem._id}
                />
              </Link>
            );
          })}
        </Carousel>
        <div className="pr-line"></div>
        <Reviews
          rating={rating}
          totalrating={totalrating}
          avgrating={avgrating}
        />
        <div className="pr-line"></div>

        {/* <div className="footerBanner">
          <img src={footerBanner} alt="footer banner" />
        </div> */}
      </>
    );
  }
};

export default Specification;

/* To be edited
 <div className="proDetailsTitle">Product Details</div>
            <ul className="proDetail">
              {specification.description.split("|").map((elem, i) => {
                return <li key={elem._id}>{elem}</li>;
              })}
            </ul>*/
