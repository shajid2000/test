import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddressPopup } from "../../commonComponents/popUp/PopUp";
import {
  editUserAddress,
  getUser,
  updateUserAddressAndWishlist,
} from "../../../redux/actions/userAction";

const Address = ({
  setSavedAdd,
  setOrderClick,
  setDeliveryAdd,
  setSelectedAddToggle,
}) => {
  const [toggle, setToggle] = useState(false);
  let data = useSelector((state) => state.user.userDetail);
  let address = useSelector((state) => state.user.toEditAddress);
  const dispatch = useDispatch();

  const [addressID, setAddressID] = useState("");
  const [city, setcity] = useState("");
  const [pincode, setPincode] = useState(Number);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [editToggle, setEditToggle] = useState(false);
  const [Area_Street, setArea_Street] = useState("");
  const [type, settype] = useState("");
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [defaultt, setdefaultt] = useState(false);
  const [initialDefaultt, setInitialDefaultt] = useState(Boolean);

  // Use the below address for deliver
  const [selectedAdd, setSelectedAdd] = useState(0);
  useEffect(() => {
    dispatch(getUser());
  }, []);
  // console.log(selectedAddres);
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name == "city") {
      setcity(e.target.value);
      address.city = e.target.value;
    }
    if (e.target.name == "pincode") {
      setPincode(e.target.value);
      address.pincode = e.target.value;
    }
    if (e.target.name == "lat") {
      setLat(e.target.value);
      address.lat = e.target.value;
    }
    if (e.target.name == "lon") {
      setLon(e.target.value);
      address.lon = e.target.value;
    }
    if (e.target.name == "state") {
      setState(e.target.value);
      address.state = e.target.value;
    }
    if (e.target.name == "country") {
      setCountry(e.target.value);
      address.country = e.target.value;
    }
    if (e.target.name == "Area_Street") {
      setArea_Street(e.target.value);
      address.Area_Street = e.target.value;
    }
    if (e.target.name == "name") {
      setname(e.target.value);
      address.name = e.target.value;
    }
    if (e.target.name == "phone") {
      setphone(e.target.value);
      address.phone = e.target.value;
    }

  };
  const EditAddress = () => {
    console.log(address)
    console.log(type)
    if(initialDefaultt){
      address.default = true
    }
    else{
      address.default = defaultt
    }
    console.log(address)
    console.log(type)
    console.log(address.default)
    dispatch(updateUserAddressAndWishlist(true, "", "", address, addressID));
    setEditToggle(!editToggle);
  };
  const checkedItem = (index) => {
    setDeliveryAdd(index);
    setOrderClick(true);
    setSelectedAddToggle(true);
    setSavedAdd(false);
  };
  return data ? (
    <div className="address-cont">
      {data.address &&
        (data.address.length === 0
          ? <div style={{ color: "black" }}>
            <h6>Please add address first!</h6>
          </div>
          : data.address.map((item, index) => {
            return (
              <div key={index} className="eachAdd ">
                <input
                  type="radio"
                  name="address"
                  value={index}
                  onChange={() => {
                    setSelectedAdd(index);
                  }}
                  onClick={() => checkedItem(index)}
                  checked={item.default}
                />
                <div>
                  <div className="add-Name">
                    {item.name}
                    <span>{item.type}</span>
                  </div>
                  <p>
                    {item.Area_Street} {item.city} {item.lon}
                  </p>
                  <p>
                    {item.pincode} {item.state} {item.country}
                  </p>
                  <p>{item.phone}</p>

                  <button
                    onClick={() => {
                      setEditToggle(!editToggle);
                      setcity(item.city);
                      setPincode(item.pincode);
                      setLat(item.lat);
                      setLon(item.lon);
                      setState(item.state);
                      setCountry(item.country);
                      setArea_Street(item.Area_Street)
                      settype(item.type)
                      setname(item.name)
                      setphone(item.phone)
                      setdefaultt(item.default)
                      setInitialDefaultt(item.default)
                      dispatch(
                        editUserAddress({
                          city: item.city,
                          lat: item.lat,
                          lon: item.lon,
                          pincode: item.pincode,
                          state: item.state,
                          country: item.country,
                          Area_Street: item.Area_Street,
                          type: item.type,
                          name: item.name,
                          phone: item.phone,
                          default: item.default
                        })
                      );
                      console.log("hi");
                      setAddressID(item._id);
                    }}
                    className="address-Edit-btn"
                  >
                    <i className="fa fa-edit"></i>
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            );
          }))}

      <AddressPopup popup={editToggle}>
        {/* <div className="address-form">
          <div className="input">
            <input
              type="text"
              value={city}
              onChange={handleChange}
              name="city"
              placeholder=" city"
            />
            <input
              type="number"
              value={pincode}
              // onChange={handleChange}
              name="pincode"
              placeholder=" pincode"
            />
          </div>
          <div className="input">
            <input
              type="text"
              value={lat}
              // onChange={handleChange}
              name="lat"
              placeholder="  lat"
            />
            <input
              type="text"
              value={lon}
              // onChange={handleChange}
              name="lon"
              placeholder="lon"
            />
          </div>
          <div className="input">
            <input
              type="text"
              value={state}
              // onChange={handleChange}
              name="state"
              placeholder="state"
            />
            <input
              type="text"
              value={country}
              // onChange={handleChange}
              name="country"
              placeholder="country"
            />
          </div>
          <button
            className="saved-btn"
            onClick={EditAddress}
            style={{ width: "60px", padding: "10px" }}
          >
            Update
          </button>
        </div> */}
        <div className="address-form">
          <div className="input">
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={handleChange}
              // placeholder="Alternate Number (Optional)"
              placeholder="Phone No."
            />
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Name"
            />
          </div>
          <div>
            <textarea className="textarea" id="" cols="30" rows="3" type="text"
              name="Area_Street"
              value={Area_Street}
              onChange={handleChange} placeholder="Address(Area and street)"
            ></textarea>
          </div>
          <div className="input">
            <input
              type="text"
              value={city}
              onChange={handleChange}
              name="city"
              placeholder=" city"
            />
            <input
              type="number"
              value={pincode}
              onChange={handleChange}
              name="pincode"
              placeholder=" pincode"
            />
          </div>
          <div className="input">
            {/* <input
                type="text"
                value={state}
                onChange={handleChange}
                name="state"
                placeholder="state"
              /> */}
            <select value={state} id="country-state" name="state" onChange={handleChange}>
              <option value="" disabled selected hidden>Select State...</option>
              <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
              <option value="Daman and Diu">Daman and Diu</option>
              <option value="Delhi">Delhi</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </select>
            <input
              type="text"
              value={country}
              onChange={handleChange}
              name="country"
              placeholder="country"
            />
          </div>

          <div className="type">
            <div className="checkbx">
              {/* <input type="checkbox"  /> */}
              <input className="radio" type="checkbox" id="default" name="default" value="true" onClick={(e) => {
               setdefaultt(!defaultt)
              console.log(defaultt)
              }} />
              <label className="radio" for="default">Make default address</label>
            </div>
            <div>
              <div>

                <input className="radio" type="radio" id="work" name="type" value="work"
                  onClick={(e) => {
                    settype(e.target.value);
                    address.type = e.target.value;
                  }}
                />
                <label className="radio" for="work">work</label>
              </div>
              <div>
                <input className="radio" type="radio" id="home" name="type" value="home"
                  onClick={(e) => {
                    settype(e.target.value);
                    address.type = e.target.value;
                  }}
                />
                <label className="radio" for="home">home</label>
              </div>
            </div>
            </div>
            <button
              className="saved-btn1"
              onClick={EditAddress}
              style={{ width: "60px", padding: "10px" }}
            >
              Update
            </button>
          </div>

      </AddressPopup>
    </div>
  ) : null;
};

export default Address;
