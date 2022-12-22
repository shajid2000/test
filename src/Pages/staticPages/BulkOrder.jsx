import React, { useState } from "react";
// alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./bulkorder.css";
import { useDispatch } from "react-redux";
import { bulkOrder } from "../../redux/actions/contactAction";
const BulkOrder = () => {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    areaCode: "",
    phone: "",
    requirement: "",
    companyName: "",
    companyAdd: "",
  });
  const dispatch = useDispatch();

  // handle all inputs
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((preVal) => {
      return { ...preVal, [name]: value };
    });
  };
  // On click on submit btn
  const placeBulkOrder = (e) => {
    e.preventDefault();
  
    //console.log(formData);
    if(formData.fName != "" && formData.lName != "" && formData.email!= "" && formData.areaCode != "" && formData.phone != "" && formData.requirement!= ""  && formData.companyName != "" && formData.companyAdd!= ""){
      // //console.log("sumimmmmmmmmmmmmmmmmmmmmmmmmmmmm")
      dispatch(bulkOrder(formData))

      toast.success("Thank You, We will get you back soon", {
        position: "bottom-center",
        progress: undefined,
        closeButton: false,
      });
    }
  };
  return (
    <>
      <div className="bulkOrder-container">
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
        <p className="bulk-heading">For Bulk Orders and Resellers</p>
        <form
          onSubmit={placeBulkOrder}
          className="bulkOrder-form"
          autocomplete="on"
        >
          <div className="name">
            <p>Name</p>
            <div>
              <input
                type="text"
                name="fName"
                placeholder="First Name"
                onChange={changeHandler}
                value={formData.fName}
              />
              <input
                type="text"
                name="lName"
                placeholder="Last Name"
                onChange={changeHandler}
                value={formData.lName}
              />
            </div>
          </div>
          <div className="email">
            <p>Email</p>
            <div>
              <input
                type="text"
                name="email"
                placeholder="Enter Email"
                onChange={changeHandler}
                value={formData.email}
              />
            </div>
          </div>
          <div className="contact">
            <p>Contact Number</p>
            <div>
              <input
                className="small-input"
                type="text"
                name="areaCode"
                placeholder="Area Code"
                onChange={changeHandler}
                value={formData.areaCode}
              />
              <input
                type="text"
                name="phone"
                placeholder="Enter Number"
                onChange={changeHandler}
                value={formData.phone}
              />
            </div>
          </div>
          <div className="requirement">
            <p>Requirements</p>
            <div>
              <input
                type="text"
                name="requirement"
                placeholder="Message"
                onChange={changeHandler}
                value={formData.requirement}
              />
            </div>
          </div>
          <div className="company">
            <p>Company Name</p>
            <div>
              <input
                type="text"
                name="companyName"
                placeholder="Enter Company Name"
                onChange={changeHandler}
                value={formData.companyName}
              />
            </div>
          </div>
          <div className="companyAdd">
            <p>Company Address</p>
            <div>
              {/* <div className="add-ress"> */}
                <input
                  type="text"
                  name="companyAdd"
                  placeholder="Enter Address"
                  onChange={changeHandler}
                  value={formData.companyAdd}
                />
                <p className="full-add">Mention city, state and pincode</p>
              {/* </div> */}
              <button>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BulkOrder;
