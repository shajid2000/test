import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { API } from "../backend";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/commonComponents/Footer/Footer";
import BodySection from "../components/homeComponents/Body/BodySection";
import EHSPrints from "../components/homeComponents/Body/EHSPrints";
import Bestseller from "../components/commonComponents/Bestseller/Bestseller";
import EhsFeatures from "../components/homeComponents/Body/EhsFeatures";
import "../components/homeComponents/Body/Home.css";
import "../components/homeComponents/Body/Home.css"
const Home = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("user"));

  const topView = () => {
    window.scrollTo({ top: 0 });
  };

  topView();

  return (
    <>
      
      <div className="homecontainer" style={{backgroundRepeatX:"repeat",
    backgroundRepeatY: "repeat",
    backgroundPosition: "center center",
    backgroundPositionX: "center",
    backgroundPositionY: "center",
    backgroundAttachment: "fixed",
    backgroundSize: "auto"}}>
    
        <BodySection/>
        <EHSPrints />
        <Bestseller
          category="posters"
          title="Posters"
          linkTo="posterspecification"
        />
        <Bestseller
          category="signages"
          title="Signages"
          linkTo="specification"
        />
        <Bestseller
          category="floor-graphics"
          title="Floor Graphics"
          linkTo="specification"
        />
        <Bestseller
          category="asset-markings"
          title="Asset Markings"
          linkTo="assetspecification"
        />
        <EhsFeatures />
      </div>

      {/* scroll to top */}
    </>
  );
};

export default Home;
