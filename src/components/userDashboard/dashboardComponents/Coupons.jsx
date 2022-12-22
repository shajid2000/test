import React from "react";

import './coupons.css';

// components
import CouponItem from "./../dashboardItems/CouponItem";

const Coupon = () => {
    return(
        <>
         <div className="coupons">
            <span className="couponHeading">Coupons</span>

            <div className="couponItemWrapper">
                <CouponItem />
                {/* <CouponItem /><CouponItem /><CouponItem /><CouponItem /><CouponItem /><CouponItem /><CouponItem /> */}
            </div>

         </div>
        </>
    )
};

export default Coupon;