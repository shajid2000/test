import React from "react";
import { useState, useEffect } from "react";
import "./userdashboard.css";

// components
import Overview from "./dashboardComponents/Overview";
import Orders from "./dashboardComponents/Orders";
import WishList from "./dashboardComponents/WishList";
import ContactUs from "./dashboardComponents/ContactUs";
import Coupons from "./dashboardComponents/Coupons";
import SavedAddress from "./dashboardComponents/SavedAddress";
import EditProfile from "./dashboardComponents/EditProfile";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions/userAction";
import { useNavigate, Link, useParams } from "react-router-dom";
import { userSignout } from "../../redux/actions/userAction";
import QuoteHistory from "./dashboardComponents/QuoteHistory";

const UserDashboard = () => {
  const topView = () => {
    window.scrollTo({ top: 0 });
  };

  topView();
  const dispatch = useDispatch();
  const params = useParams();
  let linkId = params.id;

  const navigate = useNavigate();

  // const [data, setData] = useState(useSelector(state=>state.userDetail))
  const [active, setActive] = useState({
    activeElement: "overview",
    elements: [
      "overview",
      "orders",
      "wish list",
      "contact us",
      "coupons",
      "saved address",
      "edit profile",
      "my quotations",
    ],
  });

  // dispatch(getUser())

  // useEffect(() => {
  //     dispatch(getUser())

  //   randam = Math.random()

  // }, [])

  // useEffect(() => {
  //   if (!localStorage.getItem("myuser")) {
  //     navigate("/signin");
  //   }
  //   dispatch(getUser());
  // }, []);

  const toggleActive = (i) => {
    setActive({ ...active, activeElement: active.elements[i] });
    // setPage(i + 1);
  };
  const changeActive = (val) => {
    setActive({ ...active, activeElement: active.elements[val] });
  };

  // if (!localStorage.getItem("myuser")) {
  //   return null;
  // }
  return (
    <>
      <div className="userDashboard">
        <div className="dbMenu">
          <div className="menuElements">
            {active.elements.map((elem, i) => {
              return (
                <span>
                  <Link
                    to={`../userdashboard/${i + 1}`}
                    key={i}
                    className={linkId==i+1?"activeLink":""}
                    onClick={() => {
                      toggleActive(i);
                    }}
                  >
                    {elem}
                  </Link>
                </span>
              );
            })}
            <span
              onClick={() => {
                dispatch(userSignout());
                navigate("/signout");
              }}
            >
              <Link>Sign Out</Link>
            </span>
          </div>
        </div>

        <div className="dbContent">
          {linkId == "1" && (
            <div className="dbShow overviewWrapper">{<Overview />}</div>
          )}
          {linkId == "2" && (
            <div className="dbShow ordersWrapper">
              <Orders />
            </div>
          )}
          {linkId == "3" && (
            <div className="dbShow wishListWrapper">
              <WishList />
            </div>
          )}

          {linkId == "4" && (
            <div className="dbShow contactUsWrapper">
              <ContactUs />
            </div>
          )}

          {linkId == "5" && (
            <div className="dbShow couponsWrapper">
              <Coupons />
            </div>
          )}
          {linkId == "6" && (
            <div className="dbShow savedAddressWrapper">
              <SavedAddress />
            </div>
          )}
          {linkId == "7" && (
            <div className="dbShow editProfileWrapper">
              <EditProfile key={active.activeElement} />
            </div>
          )}
          {linkId == "8" && (
            <div className="dbShow ordersWrapper">
              <QuoteHistory key={active.activeElement} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
