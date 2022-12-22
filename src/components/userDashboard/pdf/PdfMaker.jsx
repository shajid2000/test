import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PDFExport } from "@progress/kendo-react-pdf";
// import CloseIcon from "@mui/icons-material/Close";
import PopUp, { CommonPopup } from "../../commonComponents/popUp/PopUp";
import { BiRupee } from "react-icons/bi";
// sendEmailPopup
import emailPopupImg from "../../../images/popups/sendEmailPopup.svg";
import warningPopupImg from "../../../images/popups/warning.svg";
import { Logo } from "../../../images";
import CloseIcon from "@mui/icons-material/Close";

import "./pdf.css";
const PdfMaker = ({ sendData, setToggle }) => {
  const [cart, setCart] = useState(sendData.cart);
  const [editPopup, setEditPopup] = useState(false);
  const [incompletePopup, setIncompletePopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const pdfExportComponent = useRef(null);
  // const [emailSend, setEmailSend] = useState(false);
  const [editBtn, setEditBtn] = useState(true);
  const [clientDetail, setClientDetails] = useState({});
  const closePopup = () => {
    setToggle(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const sendEmailhandler = () => {
    if (
      !clientDetail.clientName ||
      !clientDetail.companyName ||
      !clientDetail.companyAdd ||
      !clientDetail.companyContact
    ) {
      setIncompletePopup(true);
    } else {
      setSuccessPopup(true);
      // setEmailSend(true);
    }
  };
  const closeIncompletePopup = () => {
    setIncompletePopup(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <div className="pdf-popup">
        <div className="pdf-popupbox">
          <div className="pdf-div">
            <PDFExport
              paperSize="A4"
              margin="1cm"
              className="pdf-padding"
              ref={pdfExportComponent}
              fileName="Quotation"
            >
              <div className="pdf">
                <div className="pdf-top">
                  <div className="logo-div">
                    <img src={Logo} className="logo" />
                    <p className="heading">Quotation</p>
                  </div>
                  <div className="detail-div">
                    <p className="comp-name">EHS Prints</p>
                    <p>+91 9632418602</p>
                    <p>hello@ehsposters.com</p>
                    <p>
                      45, Old Agarwal Nagar, Indore,
                      <br />
                      Madhya Pradesh-452001
                    </p>
                  </div>
                  <div className="pdf-line"></div>
                </div>
                <div className="pdf-mid">
                  <div className="mid-left">
                    <div className="user-detail">
                      <p> Quotation to</p>
                      <p>
                        {clientDetail.clientName
                          ? clientDetail.clientName
                          : "Client Name"}
                      </p>
                      <p>
                        {clientDetail.companyName
                          ? clientDetail.companyName
                          : "Company Name"}
                      </p>
                      <p>
                        {clientDetail.companyAdd
                          ? clientDetail.companyAdd
                          : "Company Post Address"}
                      </p>
                      <p>
                        {clientDetail.companyContact
                          ? clientDetail.companyContact
                          : "Contact Details"}
                      </p>
                    </div>
                    {editBtn && (
                      <button
                        className="edit-btn"
                        onClick={() => setEditPopup(true)}
                      >
                        {" "}
                        Edit
                      </button>
                    )}
                  </div>
                  <div className="mid-right">
                    <div>
                      <p className="name">Invoice</p>
                      <p>0021</p>
                    </div>
                    <div>
                      <p className="name">Date</p>
                      <p>30/12/2022</p>
                    </div>
                  </div>
                </div>
                <div className="pdf-line"></div>
                <div className="pdf-item">
                  <table>
                    <thead>
                      <tr className="item-head">
                        <th className="item1">
                          <p>Item Description</p>
                        </th>
                        <th className="item2">
                          <p>Quantity</p>
                        </th>
                        <th className="item2">
                          <p>Unit</p>
                        </th>
                        <th className="item2">
                          <p>Amount</p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/*  dynamic data  */}
                      {cart.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td className="item1">
                              <div>
                                <h1>{item._id}</h1>
                                <p>{item.poster_details}</p>
                                <p>{item.materialDimension}</p>
                              </div>
                            </td>
                            <td className="item2">
                              <p>{item.quantity}</p>
                            </td>
                            <td className="item2">
                              <p>{item.total}</p>
                            </td>
                            <td className="item2">
                              <p>
                                <BiRupee />
                                {item.quantity * item.total}
                              </p>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="total">
                  <div className="t-right">
                    <div>
                      <p>Subtotal</p>
                      <p>
                        {" "}
                        <BiRupee />
                        99,999,999.00
                      </p>
                    </div>
                    <div className="discount">
                      <p>Discount(20%)</p>
                      <p>
                        {" "}
                        <BiRupee />
                        99,999,999.00
                      </p>
                    </div>
                    <div>
                      <p>Tax:Vat(15%)</p>
                      <p>
                        {" "}
                        <BiRupee />
                        99,999,999.00
                      </p>
                    </div>
                    <div className="t-total">
                      <p>Total Due</p>
                      <p>
                        {" "}
                        <BiRupee />
                        99,999,999.00
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </PDFExport>
            <div className="example-config">
              <button className="pdf-btn" onClick={closePopup}>
                Back
              </button>

                <button
                  className="pdf-btn"
                  onClick={() => {
                    setEditBtn(false);
                    if (pdfExportComponent.current) {
                      pdfExportComponent.current.save();
                    }
                  }}
                >
                  Download
                </button>
                <button className="pdf-btn" onClick={sendEmailhandler}>
                  Send to Email
                </button>
            </div>
            <div className="terms">
              <h1>Terms & Conditions / Notes</h1>
              <p>
                All the prices are inclusive of GST.
                <br />
                This quotation is valid upto 60 days.
              </p>
            </div>
          </div>
        </div>
        <EditPopup
          setClientDetails={setClientDetails}
          setEditPopup={setEditPopup}
          editPopup={editPopup}
        />
      </div>
      <CommonPopup
        heading="Congrats!"
        desc="Your quote has been successfully sent to email."
        image={emailPopupImg}
        setMyPopup={setSuccessPopup}
        popup={successPopup}
        secondBtn={true}
      />
      <PopUp popup={incompletePopup}>
        <div className="materialPopup">
          <img
            src={warningPopupImg}
            alt="select configuration"
            style={{
              width: "75px",
              height: "75px",
            }}
          />
          <div
            className=""
            style={{
              color: "#898989",
              fontSize: "19px",
              textAlign: "center",
              margin: "15px",
            }}
          >
            Please enter company’s detail before proceeding further.
          </div>
          <CloseIcon className="closePopup" onClick={closeIncompletePopup} />
        </div>
      </PopUp>
    </>
  );
};
export default PdfMaker;

const EditPopup = ({ editPopup, setEditPopup, setClientDetails }) => {
  const [userData, setUserData] = useState({
    clientName: "",
    companyName: "",
    companyAdd: "",
    companyContact: "",
  });
  const handleChnage = (e) => {
    const { name, value } = e.target;
    setUserData((pVal) => {
      return { ...pVal, [name]: value };
    });
  };
  const formSubmit = () => {
    setEditPopup(false);
    setClientDetails(userData);
    console.log(userData);
  };
  return (
    <>
      {editPopup !== true ? null : (
        <div className="edit-popup">
          <div className="edit-popupBox">
            <div className="edit-box">
              <p className="heading">Edit Details</p>
              <div className="form">
                <div>
                  <p>Client Name</p>
                  <input
                    autoComplete="off"
                    type="text"
                    name="clientName"
                    onChange={handleChnage}
                    value={userData.clientName}
                  />
                </div>
                <div>
                  <p>Company Name</p>
                  <input
                    type="text"
                    autoComplete="off"
                    name="companyName"
                    onChange={handleChnage}
                    value={userData.companyName}
                  />
                </div>
                <div>
                  <p>Company Post Address</p>
                  {/* <input type="text" name="companyName" autoComplete="off"  id="address"/> */}
                  <textarea
                    name="companyAdd"
                    autoComplete="off"
                    cols="30"
                    rows="4"
                    onChange={handleChnage}
                    value={userData.companyAdd}
                  ></textarea>
                </div>
                <div>
                  <p>Contact Number</p>
                  <input
                    type="number"
                    name="companyContact"
                    autoComplete="off"
                    onChange={handleChnage}
                    value={userData.companyContact}
                  />
                </div>
                <button className="pdf-btn" onClick={formSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
