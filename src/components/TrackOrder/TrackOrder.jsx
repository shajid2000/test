import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { singleOrder, trackYourOrder } from "../../redux/actions/userAction";
import "./trackorder.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Carousel from "react-elastic-carousel";
import Loading from "../commonComponents/LoadingScreen/Loading";

import img from "../../images/BeforeStart.png";
const TrackOrder = () => {
  const [shipped , setshipped ] = useState(null)
  const [enroute , setenroute ] = useState(null)
  const [delivery , setdelivery ] = useState(null)
  const topView = () => {
    window.scrollTo({ top: 0 });
  };

  topView();
  const [searchParams, setSearchParams] = useSearchParams();
  let orderTrack = useSelector((state) => state.user.orderTrack);
  let order = useSelector((state) => state.user.singleOrder);
  // const [query, setQuery] = useState(searchParams.get("user"));
  const dispatch = useDispatch();
  useEffect(() => {


  dispatch(singleOrder(searchParams.get("orderId")));
  // dispatch(trackYourOrder(order[0].shippingDetails.shipment_id))
 
    //console.log(orderTrack);
    console.log(orderTrack)
 
  
  }, []);
  function tConvert (time) {
    if(time === null)
    return ""
  console.log(time)
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { 
      time = time.slice (1); 
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; 
      time[0] = +time[0] % 12 || 12; 
    }
    return time.join (''); 
  }
  
  console.log(order)
  console.log(orderTrack,"vvvvvvv")
 useEffect(() => {
  orderTrack!= undefined && Object.keys(orderTrack).length > 0 && orderTrack.tracking_data.shipment_status=="6" && setshipped(orderTrack.tracking_data.shipment_track_activities[0].date.split(" ")[1])
 orderTrack!= undefined && Object.keys(orderTrack).length > 0 &&  orderTrack.tracking_data.shipment_status=="17"&& setenroute(orderTrack.tracking_data.shipment_track_activities[0].date.split(" ")[1])
 orderTrack!= undefined && Object.keys(orderTrack).length > 0 &&  orderTrack.tracking_data.shipment_status=="7"&& setdelivery(orderTrack.tracking_data.shipment_track_activities[0].date.split(" ")[1])
 
 }, [orderTrack])
 

  return (
    !orderTrack?  <Loading />: (
      <>
        {Object.keys(orderTrack).length <= 0 ? (
         <Loading />
        ) : orderTrack.tracking_data.track_status === 1 ? (
    <div className="track-order-container">
      <p className="title">Track your order</p>
      <div className="tracking-bar">
        <div class="card-body">
          <div class="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
            <TrackItem
              title="Order Placed"
              time={tConvert(order[0].created_at.split("T")[1].substr(0,8))}
              desc="Your order was placed for delivery"
              completed={true}
            />
            <TrackItem
              title="Order Processing"
              time={tConvert(order[0].created_at.split("T")[1].substr(0,8))}
              desc="Your order was placed for delivery"
              completed={true}
            />
            <TrackItem
              title="Order Shipped"
              time={tConvert(shipped)}
              desc={shipped===null?"":"Your order was shipped"}
              completed={(orderTrack.tracking_data.shipment_status=="6"|| orderTrack.tracking_data.shipment_status=="17"|| orderTrack.tracking_data.shipment_status=="7")?true:false}
            />
            <TrackItem
              title="Order Enroute"
              time={tConvert(enroute)}
              desc={enroute===null?"":"Your order is in route"}
              completed={(orderTrack.tracking_data.shipment_status=="17"|| orderTrack.tracking_data.shipment_status=="7")?true:false}
            />
            <TrackItem
              title="Order Arrived"
              time={tConvert(delivery)}
              desc={delivery===null?"":"Your order was delivered"}
              completed={(orderTrack.tracking_data.shipment_status=="7")?true:false}
            />
          </div>
        </div>
      </div>
      <div className="order-tracking-detail">
        <div className="shipment-box">
          <div className="shipment-info">
            <p className="order-title">Shipment Information</p>
            <div className="shipment-detail">
              <p className="head">Delivery Method</p>
              <p className="desc">FedEx Home Delivery</p>
            </div>
            <div className="shipment-detail">
              <p className="head">Carrier</p>
              <p className="desc">FedEx 800-GO-FEDEX(463.3339)</p>
            </div>
            <div className="shipment-detail">
              <p className="head">Tracking #</p>
              <p className="desc">  {orderTrack.tracking_data.shipment_track[0].awb_code
 ||orderTrack.tracking_data.shipment_track[0].shipment_id}</p>
            </div>
            <div className="shipment-detail">
              <p className="head">Shipping To</p>
              <p className="desc">{order[0].address.name}</p>
            </div>
            <div className="shipment-detail">
              <p className="head">Order #</p>
              <p className="desc">{order[0].orderId}</p>
            </div>
          </div>
          <div className="shipment-items">
            <p className="order-title">Items in shipment</p>
            <Carousel
              // breakPoints={breakPoints}
              pagination={false}
              itemPadding={[10, 10, 10, 10]}
              enableAutoPlay={true}
              className="bestSellerCarousel"
            >
              {
                order.length> 0?(order[0].itemDetails.map((ele)=>{
                  return <OrderedItem 
                  key={ele}
                  img={ele.poster_details.imgUrl[0]}
                  size={ele.materialDimension.dimension_title}
                  color="Yellow"
                  qty={ele.quantity}
                  name={ele.poster_details.name}
                  desc={ele.poster_details.description}
                />
                })
                ):"No items to show" 
}
              {/* 
              <OrderedItem
                img={img}
                size="750 x 800 x 1210"
                color="Yellow"
                qty="5"
                name="French Style Accent Chai with a modern twist"
                desc=" FedEx or UPS will leave your package in a safe place outside the front door."
              /> */}
            </Carousel>
          </div>
        </div>
        <div className="tracking-history">
          <div>
            <div className="description">
              <div className="checkbox">
                <input type="checkbox" name="" id="" />
                <span>Receive Text Updates</span>
              </div>
              <div className="tracking-detail">
                <p className="order-title">Tracking History</p>
                <p className="desc">
                  Please Note : It’s normal for on-time packages to go a few
                  days without being scanned.
                </p>
              </div>
            </div>
            <div className="date-box">
              <p>Delivery - {orderTrack.tracking_data.shipment_track[0].delivered_date.split(" ")[0]} &nbsp; &nbsp; Current activity - {orderTrack.tracking_data.shipment_track[0].current_status
}</p>
            </div>
            <div className="shipment-history">

              {
                orderTrack.tracking_data.shipment_track_activities.map((ele)=>{
                  return <div key={ele} className="time-stamp">
                     <p className="time-p">{ele.date.split(" ")[0]} </p>
                  <p className="time-p">{ele.date.split(" ")[1]}</p>
                  <p className="status-p">
                    {/* <br /> */}
                     Arrived at {ele.location}
                  </p>
                </div>
                })

              }
              {/* <div className="time-stamp">
                <p className="time-p">11:55 AM </p>
                <p className="status-p">
                  CITY OF INDUSTRY, CA, US <br /> Arrived at FedEx location
                </p>
              </div>
              <div className="time-stamp">
                <p className="time-p">07:38 PM</p>
                <p className="status-p">
                  CITY OF INDUSTRY, CA, US <br /> Picked Up
                </p>
              </div>
              <div className="time-stamp">
                <p className="time-p">11:02 AM</p>
                <p className="status-p">
                  US <br /> Shipment Information sent to FedEx
                </p>
              </div> */}
            </div>
          </div>
          <div className="button-box">
            <button className="shipment-btn">See more</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="track-order-container">
      <div className="track-error" style={{width:"100%"}}>
        <p>{orderTrack.tracking_data.error}</p>
      </div>
    </div>
  )}
</>
)
);
}

export default TrackOrder;

const TrackItem = ({ title, time, desc, completed }) => {
  return (
    <>
      <div class="step completed">
        <div class="step-icon-wrap">
          <div class="step-icon">{completed && <CheckCircleIcon />}</div>
        </div>
        <h4 class="step-title">{title}</h4>
        <span className="times">
          <p class="step-time">{time}</p>
          <p class="step-desc">{desc}</p>
        </span>
      </div>
    </>
  );
};
const OrderedItem = ({ img, name, size, qty, color, desc }) => {
  return (
    <>
      <div className="item">
        <img src={img} alt="img" />
        <div className="details">
          <div className="item-detail">
            <p className="item-name">
              {name}
              <br /> Color - {color}
            </p>
            <p className="size-qty">
              Size - {size} <br /> Quantity - {qty}
            </p>
          </div>
          <p className="description">{desc}</p>
        </div>
      </div>
    </>
  );
};
