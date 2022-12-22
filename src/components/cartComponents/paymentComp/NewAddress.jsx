import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAddressAndWishlist } from "../../../redux/actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NewAddress = ({setSavedAdd,setDeliveryAdd,setOrderClick,  setSelectedAddToggle, setConfirmDelivNo}) => {
  const user = useSelector((state)=>state.user.userDetail)
  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch();
console.log("kk",user)
  const [userAddress, setUserAddress] = useState({
    Area_Street: "",
    type: "",
    pincode: "",
    city: "",
    state: "",
    country: "india",
    name: user.name,
    phone: user.phonenumber,
    default: false
  });
//   const [userDetail, setUserDetail] = useState({
// name: user.name,
//     phone: user.phonenumber,
//   });
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserAddress({ ...userAddress, [name]: value });
    // console.log(userAddress)
  };
  // const handleChangeUser = (e) => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   setUserDetail({ ...userDetail, [name]: value });
  //   console.log(userDetail)
  // };
  const SaveAddress = () => {
    // console.log("hi", userAddress);
    if(  userAddress.Area_Street != "" &&
    userAddress.type != "" &&
    userAddress.pincode != "" &&
    userAddress.city != "" &&
    userAddress.state != "" &&
    userAddress.country != "" &&
    userAddress.name != "" &&
    userAddress.phone != ""){
      dispatch(updateUserAddressAndWishlist(true, "", userAddress));
      setUserAddress({});
      setToggle(false);
      console.log(user.address.length)
      setDeliveryAdd(user.address.length)
      setSelectedAddToggle(true)
      setSavedAdd(false)
      // setConfirmDelivNo(userDetail.phone)
      setOrderClick(true)
    }else{
      // window.alert("Provide detail properly")
      toast.error("Provide detail properly", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
      });
    }
   

  };
  return (
    <div>
      {toggle && (
        <div className="address-cont">
           <ToastContainer
          position="bottom-left"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
          <div className="address-form">
            <div className="input">
              <input
                type="text"
                name="phone"
                value={userAddress.phone}
                onChange={handleChange}
                // placeholder="Alternate Number (Optional)"
                placeholder="Phone No."
              />
              <input
                type="text"
                name="name"
                value={userAddress.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>
            <div>
              <textarea className="textarea" id="" cols="30" rows="3" type="text"
                name="Area_Street"
                value={userAddress.Area_Street}
                onChange={handleChange} placeholder="Address(Area and street)"></textarea>
            </div>
            <div className="input">
              <input
                type="text"
                name="city"
                value={userAddress.city}
                onChange={handleChange}
                placeholder="City"
              />
              <input
                type="text"
                name="pincode"
                value={userAddress.pincode}
                onChange={handleChange}
                placeholder="Pin Code"
              />
            </div>
            <div className="input">
              {/* <input
                type="text"
                name="state"
                value={userAddress.state}
                onChange={handleChange}
                placeholder="State"
              /> */}
              {/* <!--- India states --> */}
         
<select value={userAddress.state} id="country-state" name="state" onChange={handleChange}>
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
                name="country"
                value={userAddress.country}
                onChange={handleChange}
                placeholder="Country"
              />
            </div>
       
             <div className="type">
              <div className="checkbx">
              {/* <input type="checkbox"  /> */}
              <input className="radio" type="checkbox" id="default" name="default"  value="true" onClick={(e)=>{
    setUserAddress({ ...userAddress, [e.target.name]: !userAddress.default })
    console.log(userAddress) }} />
  <label className="radio" for="default">Make default address</label>
              </div>
            <div>
       
            <input className="radio" type="radio" id="work" name="type" value="work" onClick={(e)=>{
    setUserAddress({ ...userAddress, [e.target.name]: e.target.value });
    
   }} />
              <label className="radio" for="work">work</label>
            </div>
              <div>
              <input className="radio" type="radio" id="home"name="type" value="home" onClick={(e)=>{
 setUserAddress({ ...userAddress, [e.target.name]: e.target.value });
 }}/>
              <label className="radio" for="home">home</label>
              </div>
             </div>
      
            <button
              className="saved-btn1"
              onClick={SaveAddress}
              style={{ width: "60px" }}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewAddress;
