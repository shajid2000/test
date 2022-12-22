import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./orderitem.css";

// images
import BeSafe from "./../../../images/BeSafe.png";
import { useEffect } from "react";
import { getUserOrders, trackYourOrder } from "../../../redux/actions/userAction";
import { Link } from "react-router-dom";
import Reviews from "../../commonComponents/productSpecs/Reviews";
import Review from "../../commonComponents/popUp/Review";

const OrderItem = () => {
  const dispatch = useDispatch();
  const [posterId, setposterId] = useState("");
  const [reviewToggle, setReviewToggle] = useState(false);
  const orders = useSelector((state) => state.user.orders);
  // console.log(orders);

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

//  const getTtackingDetail= (shipment_id)=>{
//   dispatch(trackYourOrder(shipment_id))
//  }
  return orders ? (
    <>
    {console.log(orders)}
      {orders &&
        (orders.length == 0
          ? "No Orders Placed"
          : orders.map((item) => {
              return (
                <div key={item} className="orderItem">
                  <div className="orderStatusStrip">
                    {/* <span className="orderStatus">{item.orderStatus}</span> */}
                    <span className="deliveryStatusIcon">
                      <i class="fa fa-stream"></i>
                    </span>
                    {item.shippingDetails && (
                      <Link 
                        to={`/trackorder?orderId=${
                          item.shippingDetails.shipment_id
                            ? item.orderId: null
                        }`}
                      >
                        <span className="deliveryStatus">
                          {item.shippingDetails.shipment_id
                            ? "Track Your Order"
                            : "No tracking detail"}
                        </span>
                      </Link>
                    )}
                  </div>

                  <div className="orderItemContent">
                    <img
                      src={item.itemDetails[0].poster_details?item.itemDetails[0].poster_details.imgUrl[0]:""}
                      alt="fire"
                    />
                    {/* <img
                        src={item.itemDetails[1].poster_details.imgUrl[0]}
                        alt="fire"
                      /> */}

                    <div className="orderItemDetails">
                      <span className="oiName">{item.name}</span>
                      <span className="oiMaterial">
                        Material :{" "}
                        <span>
                          {item.itemDetails[0].materialDimension && item.itemDetails[0].materialDimension.material_title}
                        </span>
                      </span>
                      <span className="oiDimension">
                        Dimension :{" "}
                        <span>
                          {
                            item.itemDetails[0].materialDimension && item.itemDetails[0].materialDimension.dimension_title
                          }
                        </span>
                      </span>
                      <span className="oiTotal">
                        Total : <span>₹{item.sumPriceToPay}</span>
                      </span>

                    </div>
                    <span
                      className="review-link"
                      onClick={() => {
                        setposterId(item.itemDetails[0].poster_details._id);
                        setReviewToggle(true);
                      }}
                    >
                      Write a review
                    </span>
                  </div>
                </div>
              );
            }))}
      <div className="review11">
        <Review
          posterId={posterId}
          reviewToggle={reviewToggle}
          setReviewToggle={setReviewToggle}
        />
      </div>
    </>
  ) : null;
};

export default OrderItem;
