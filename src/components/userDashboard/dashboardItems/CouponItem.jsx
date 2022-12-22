import React from "react";
import { useSelector } from "react-redux";
import "./couponitem.css";

const CouponItem = () => {

  let data = useSelector((state) => state.user.userDetail);
  let couponData = null;
  if (data !== null) couponData = data.coupons;
  // // console.log(data,couponData)
  return data ? (
    <>
      {couponData &&
        (couponData.length === 0
          ? "No Coupons left"
          : couponData.map((item) => {
              return (
                <div key={item} className="couponItem">
                  <div className="discountValue">
                    <span>{item.discountValue}</span> <span>%</span>{" "}
                    <span className="coff">Off</span>
                  </div>

                  <div className="discountDetails">

                    <span>On orders above ₹1500</span>
                    <span>Code : {item.coupon_code}</span>
                    {/* <span>Valid till 26th November</span> */}
                    <span>
                      Valid till {Date(item.end_time).toString("MMM dd")}
                    </span>
                  </div>
                </div>
              );
            }))}
    </>
  ) : null;
};

export default CouponItem;
