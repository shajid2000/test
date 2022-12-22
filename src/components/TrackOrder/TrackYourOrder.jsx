import React, { useEffect, useState } from "react";
import "./trackyourorder.css";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { trackYourOrder } from "../../redux/actions/userAction";

function TrackYourOrder() {
  const [searchParams, setSearchParams] = useSearchParams();
  let orderTrack = useSelector((state) => state.user.orderTrack);
  // const [query, setQuery] = useState(searchParams.get("user"));
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(trackYourOrder(searchParams.get("shipment_id")));
    // dispatch(trackYourOrder(267391166))
    //console.log(orderTrack);
  }, []);
  // //console.log(orderTrack)
  return (
    orderTrack && (
      <>
        {Object.keys(orderTrack).length <= 0 ? (
          "No Response from backend"
        ) : orderTrack.tracking_data.track_status === 1 ? (
          <div className="track-container">
            <div className="secondary-container">
              <div className="heading">
                <h1>Order Status</h1>
                <h1>
                  Shipping-Id:{" "}
                  {orderTrack.tracking_data.shipment_track[0].shipment_id}
                </h1>
              </div>
              <div className="progress-checkout-container">
                <div className="progress-step-container">
                  <div className="step-check"></div>
                  <span className="step-title">Payment</span>
                </div>
                <div className="progress-step-container">
                  <div className="step-check"></div>
                  <span className="step-title">Shipping</span>
                </div>
                <div className="progress-step-container">
                  <div className="step-check"></div>
                  <span className="step-title">Delivered</span>
                </div>
              </div>
              <div className="detail">
                <div className="shipwith common">
                  <p>Pickup_date</p>
                  <p>
                    {" "}
                    {orderTrack.tracking_data.shipment_track[0].pickup_date}
                  </p>
                </div>
                <div className="estimated common">
                  <p>Current location</p>
                  <p>
                    {" "}
                    {orderTrack.tracking_data.shipment_track_activities[0].location
                      .toLowerCase()
                      .charAt(0)
                      .toUpperCase() +
                      orderTrack.tracking_data.shipment_track_activities[0].location
                        .toLowerCase()
                        .slice(1)}
                  </p>
                </div>
                <div className="estimated common">
                  <p>Destination</p>
                  <p>
                    {" "}
                    {orderTrack.tracking_data.shipment_track[0].destination}
                  </p>
                </div>
                {orderTrack.tracking_data.shipment_track[0].delivered_date && (
                  <div className="estimated common">
                    <p>Delivery date</p>
                    <p>
                      {" "}
                      {
                        orderTrack.tracking_data.shipment_track[0]
                          .delivered_date
                      }
                    </p>
                  </div>
                )}
                {orderTrack.tracking_data.shipment_track[0].edd && (
                  <div className="estimated common">
                    <p>Delivery date</p>
                    <p> {orderTrack.tracking_data.shipment_track[0].edd}</p>
                  </div>
                )}
                <div className="common">
                  <p>Current status</p>
                  <p>
                    {" "}
                    {orderTrack.tracking_data.shipment_track[0].current_status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="track-container">
            <div className="track-error">
              <p>{orderTrack.tracking_data.error}</p>
            </div>
          </div>
        )}
      </>
    )
  );
}

export default TrackYourOrder;
