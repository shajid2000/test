import React from "react";

// components
import WishListItem from './../dashboardItems/WishListItem';

import './wishlist.css'

const WishList = () => {
    return(
        <>
         <div className="wishList">
            <span className="wishListHeading">Wish List</span>

            <div className="wishListItemWrapper">
                <WishListItem />
            </div>
         </div>
        </>
    )
};

export default WishList;