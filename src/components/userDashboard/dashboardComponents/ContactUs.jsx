import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", msg: "" });
  //  on clicking submit btn //
  const submitHandler = (e) => {
    e.preventDefault();
    toast.success("We will get back to you soon", {
      position: "bottom-center",
      progress: undefined,
      closeButton: false,
    });
  };
  // INput handler
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((preVal) => {
      return { ...preVal, [name]: value };
    });
  };
  return (
    <>
      <div style={{ "margin-top": "-50px" }}>
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
            <p className="contact-heading">Get in Touch</p>
            <p className="contact-desc">
              We are here for you. How can we help you?
            </p>
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
                rows="5"
                placeholder="Message"
                value={formData.msg}
                onChange={changeHandler}
              ></textarea>
              <button className="contact-btn">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
