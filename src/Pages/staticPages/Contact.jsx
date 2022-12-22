import React, { useState } from "react";
import img from "../../images/google-map.png";
import "./contact.css";
// alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import facebook from "../../images/icons/facebook.png";
import instagram from "../../images/icons/instagram.png";
import twitter from "../../images/icons/twitter.png";
import linkedIn from "../../images/icons/linkedin.png";
// icons
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import MailOutlineRoundedIcon from "@material-ui/icons/MailOutlineRounded";
import { useDispatch } from "react-redux";

import { contactUs } from "../../redux/actions/contactAction";


const SocialMedia = ({ link, img }) => {
  return (
    <div>
      <a href={link} target="_blank">
        <img src={img} alt="facebook" />
      </a>
    </div>
  );
};
const Contact = () => {
  const topView = () => {
    window.scrollTo({ top: 0 });
  };

  topView();
  const [formData, setFormData] = useState({ name: "", email: "", msg: "" });

  const dispatch = useDispatch();
  //  on clicking submit btn //

  const submitHandler = (e) => {
    e.preventDefault();
  
 if(formData.name != "" && formData.email != "" && formData.msg != ""){

  dispatch(contactUs(formData))
  toast.success("Please Check Your Mail", {
    position: "bottom-center",
    progress: undefined,
    closeButton: false,
  });
 }
  };
  // INput handler
  const changeHandler = (e) => {
    const { name, value } = e.target;
    //console.log(name, value);
    setFormData((preVal) => {
      return { ...preVal, [name]: value };
    });
  
  };
  return (
    <>
      <div className="contact-container">
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <div className="contact-left">
        <div>

          <p className="contact-heading">Get in Touch</p>
          <p className="contact-desc">
            We are here for you. How can we help you?
          </p>
        </div>
          <form className="my-form" onSubmit={submitHandler}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={changeHandler}
            />
            <input
              type="text"
              name="email"
              placeholder="Enter Email or Phone"
              value={formData.email}
              onChange={changeHandler}
            />
            <textarea
              name="msg"
              cols="30"
              rows="4"
              placeholder="Message"
              value={formData.msg}
              onChange={changeHandler}
            ></textarea>
            <button className="contact-btn">Submit</button>
          </form>
        </div>
        <div className="contact-right">
          <div className="social-media-icons">
            <SocialMedia link="https://www.facebook.com/ehsprints/" img={facebook} />
            <SocialMedia link="https://www.instagram.com/" img={instagram} />
            <SocialMedia link="https://twitter.com/ehsprints" img={twitter} />
            <SocialMedia link="https://www.linkedin.com/company/ehsprints/?originalSubdomain=in" img={linkedIn} />
          </div>
          <div className="google-map">
            {/* <a

              href="https://www.google.com/maps/place/Old+Agarwal+Nagar,+Indore,+Madhya+Pradesh+452001/@22.7015254,75.869763,17z/data=!3m1!4b1!4m5!3m4!1s0x3962fce1e227e207:0x1f0336b6c61463af!8m2!3d22.7010592!4d75.8719134"
              target="_blank "
            >
              <img src={img} alt="google map" />
            </a> */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.718377933874!2d75.86976301479453!3d22.701525385116625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fce1e227e207%3A0x1f0336b6c61463af!2sOld%20Agarwal%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh%20452001!5e0!3m2!1sen!2sin!4v1669137135717!5m2!1sen!2sin"
              width="261"
              height="173"
              style={{border:0}}
              allowFullScreen=""
              loading="lazy"
              // referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="full-address">
            <div className="address">
              <LocationOnOutlinedIcon />
              <p>
                45, Old Agarwal Nagar, Indore,
                <br /> Madhya Pradesh-452001
              </p>
            </div>
            <div className="phone-no">
              <PhoneOutlinedIcon />
              <p>+91 9632418602</p>
            </div>
            <div className="email">
              <MailOutlineRoundedIcon />
              <p>hello@ehsposters.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
