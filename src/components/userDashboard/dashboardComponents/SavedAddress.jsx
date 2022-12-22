import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API } from "../../../backend";
import { updateUserAddressAndWishlist } from "../../../redux/actions/userAction";

// components
import AddressItem from "../dashboardItems/AddressItem";

import "./savedaddress.css";

const SavedAddress = () => {
  // const [data, setData] = useState(useSelector(state=>state.userDetail))
  const [address, setAddress] = useState({});
  const [buttonToggle, setButtonToggle] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();

    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEdit = () => {
    setButtonToggle(!buttonToggle);
  };

  const SaveAddress = () => {
    dispatch(updateUserAddressAndWishlist(true, "", address));
    setButtonToggle(!buttonToggle);
    setAddress({});
  };

  return (
    <>
      <div className="savedAddress">
        <span className="savedAddressHeading">Saved Address</span>

        <div className="savedAddressWrapper">
          <AddressItem toggleEdit={toggleEdit} />

          <button onClick={toggleEdit} className="addNewAddress-btn">
            <i class="fa fa-plus"></i> <span>Add New Address</span>
          </button>
        </div>

        {buttonToggle && (
          <div className="save-address-form">
            <div>
              <input
                type="text"
                value={address.Area_Street ? address.Area_Street : ""}
                onChange={handleChange}
                name="Area_Street"
                placeholder=" House Details"
              />
              <input
                type="number"
                value={address.pincode ? address.pincode : ""}
                onChange={handleChange}
                name="pincode"
                placeholder=" Pincode"
              />
            </div>
            <div>
              <input
                type="text"
                value={address.lat ? address.lat : ""}
                onChange={handleChange}
                name="lat"
                placeholder="  Lat"
              />
              <input
                type="text"
                value={address.lon ? address.lon : ""}
                onChange={handleChange}
                name="lon"
                placeholder="Lon"
              />
            </div>
            <div>
              <input
                type="text"
                value={address.state ? address.state : ""}
                onChange={handleChange}
                name="state"
                placeholder="State"
              />
              <input
                type="text"
                value={address.country ? address.country : ""}
                onChange={handleChange}
                name="country"
                placeholder="Country"
              />
            </div>
            <button
              className="saved-btn"
              onClick={SaveAddress}
              style={{ width: "60px" }}
            >
              Add
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SavedAddress;
