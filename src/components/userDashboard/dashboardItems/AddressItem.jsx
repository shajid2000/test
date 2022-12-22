import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  editUserAddress,
  getUser,
  updateUserAddressAndWishlist,
} from "../../../redux/actions/userAction";

import "./addressitem.css";


const AddressItem = () => {
  const dispatch = useDispatch();
  //   const [address, setAddress] = useState(useSelector((state) => state.user.toEditAddress));
  let address = useSelector((state) => state.user.toEditAddress);
  const [addressID, setAddressID] = useState("");
  const [d, setHouseDetails] = useState("");
  const [pincode, setPincode] = useState(Number);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const [editToggle, setEditToggle] = useState(false);
  let data = useSelector((state) => state.user.userDetail);
  console.log("🚀 ~ file: AddressItem.jsx ~ line 27 ~ AddressItem ~ data", data)
  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name == "d") {
      setHouseDetails(e.target.value);
    }
    if (e.target.name == "pincode") {
      setPincode(e.target.value);
    }
    if (e.target.name == "lat") {
      setLat(e.target.value);
    }
    if (e.target.name == "lon") {
      setLon(e.target.value);
    }
    if (e.target.name == "state") {
      setState(e.target.value);
    }
    if (e.target.name == "country") {
      setCountry(e.target.value);
    }
    if (e.target.name == "d") {
      address.d = e.target.value;
    }
    if (e.target.name == "pincode") {
      address.pincode = e.target.value;
    }
    if (e.target.name == "lat") {
      address.lat = e.target.value;
    }
    if (e.target.name == "lon") {
      address.lon = e.target.value;
    }
    if (e.target.name == "state") {
      address.state = e.target.value;
    }
    if (e.target.name == "country") {
      address.country = e.target.value;
    }
  };
  const EditAddress = () => {
    dispatch(updateUserAddressAndWishlist(true, "", "", address, addressID));
    setEditToggle(!editToggle);
  };
  const removeAddress = (address_pincode) => {
    // console.log(address_pincode);
    dispatch( updateUserAddressAndWishlist(false, "", "", "", "", address_pincode));
  };
  return data ? (
    <>
      {data.address &&
        (data.address.length === 0
          ? "You need to add address"
          : data.address.map((item) => {
              return (
                <div key={item} className="addressItem">
                  <div className="adName">
                    {data.name}
                    <span>work</span>
                  </div>

                  <div className="addressDetails">
                    <div className="localAddress">
                      {item.d} {item.lat} {item.lon} {item.country}{" "}
                    </div>
                    {/* Valparai main road, Valparai, Coimbatore District */}
                    <div className="state-pin">
                      {" "}
                      {item.pincode} {item.state}
                    </div>
                    <div className="adMobile">{data.phonenumber}</div>
                  </div>

                  <button
                    onClick={() => {
                      setEditToggle(!editToggle);
                      setHouseDetails(item.d);
                      setPincode(item.pincode);
                      setLat(item.lat);
                      setLon(item.lon);
                      setState(item.state);
                      setCountry(item.country);
                      dispatch(
                        editUserAddress({
                          d: item.d,
                          lat: item.lat,
                          lon: item.lon,
                          pincode: item.pincode,
                          state: item.state,
                          country: item.country,
                        })
                      );
                      setAddressID(item._id);
                    }}
                    className="addressEdit-btn"
                  >
                    <i class="fa fa-edit"></i>
                    <span>Edit</span>
                  </button>

                  <span className="removeAddress">
                    <i
                      onClick={() => {
                        removeAddress(item.pincode);
                      }}
                      class="fa fa-times"
                    ></i>
                  </span>
                </div>
              );
            }))}

      {editToggle && (
        <div className="save-address-form">
          <div>
            <input
              type="text"
              value={d}
              onChange={handleChange}
              name="Area_Street"
              placeholder=" House Details"
            />
            <input
              type="number"
              value={pincode}
              onChange={handleChange}
              name="pincode"
              placeholder=" pincode"
            />
          </div>
          <div>
            <input
              type="text"
              value={lat}
              onChange={handleChange}
              name="lat"
              placeholder="  lat"
            />
            <input
              type="text"
              value={lon}
              onChange={handleChange}
              name="lon"
              placeholder="lon"
            />
          </div>
          <div>
            <input
              type="text"
              value={state}
              onChange={handleChange}
              name="state"
              placeholder="state"
            />
            <input
              type="text"
              value={country}
              onChange={handleChange}
              name="country"
              placeholder="country"
            />
          </div>
          <button
            className="saved-btn"
            onClick={EditAddress}
            style={{ width: "60px" }}
          >
            Add
          </button>
        </div>
      )}
    </>
  ) : null;
};

export default AddressItem;
