import React from 'react';

// components
import OrderItem from './../dashboardItems/OrderItem';

import './orders.css'

const Orders = () => {
    return (
        <>
            <div className="orders">
                <span className="ordersHeading">Your Past Orders</span>
                <select id="orderFilter">
                    <option value="1">1 Month</option>
                    <option value="2">2 Month</option>
                    <option value="3">3 Month</option>
                </select>

                <div className="orderItemWrapper">
                    <OrderItem />
                </div>
            </div>
        </>
    )
};

export default Orders;