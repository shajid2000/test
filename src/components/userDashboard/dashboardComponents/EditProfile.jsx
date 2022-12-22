import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../redux/actions/userAction";

import "./editprofile.css";

const EditProfile = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const data = useSelector((state) => state.user.userDetail);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    if (data) {
      setName(data.name);
      setPhone(data.phonenumber);
      setEmail(data.emailid);
      setName(data.name);
    }
  }, []);
  // //console.log(data)
  return data ? (
    <>
      <div className="editProfile">
        <span className="editProfileHeading">Edit Profile</span>

        <div className="editProfileDetails">
          <div className="epNumber">
            <span>Phone Number</span>
            <span className="epData">
              {data.phonenumber} <i className="fas fa-check-circle"></i>
            </span>
            {/* <input type="text" name="phone" id="" value={phone} /> */}
            <button className="editNumber-btn">change</button>
          </div>

          <div className="editProfileDetails">
          {/* <div className="epNumber">
              <span>Phone Number</span>
              <span className="epData">
                {data.phonenumber} <i className="fas fa-check-circle"></i>
              </span>
              <input type="text" name="phone" id="" value={phone} />
              <button className="editNumber-btn">change</button>
            </div> */}

            <div className="epEmail">
              <span>Email ID</span>
              <span className="epData">
                {data.emailid} <i className="fas fa-check-circle"></i>
              </span>
              <button className="editEmail-btn">change</button>
            </div>

            <fieldset className="fullName">
              <legend className="lClass">Name</legend>
              <input type="text" value={data.name} />
            </fieldset>

            <fieldset className="dob">
              <legend className="lClass">(dd/mm/yyyy)</legend>
              <input type="text" value="01/07/2005" />
            </fieldset>

            <fieldset className="alternateNo">
              <legend className="lClass">Alternate Phone Number</legend>
              <input type="text" value={9977886655} />
            </fieldset>

            <button className="saveChanges-btn">save changes</button>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default EditProfile;
