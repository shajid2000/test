import React from "react";
import { Link } from "react-router-dom";
import "./BodySection.css";
import posterTag from "../../../images/posters.png";
import assetTag from "../../../images/assetsmarketing.png";
import signagesTag from "../../../images/signages.png";
import Createown from "../../../images/createowns.png";
import pictograms from "../../../images/pictograms (2).png";
import floorTag from "../../../images/floorg.png";
import homepagePoster from "../../../images/homePagePoster.png";
// import mobilePoster from "../"
import p1 from "../../../images/promo1.jpg";
import p2 from "../../../images/promo2.jpg";
import p3 from "../../../images/promo3.jpg";
import p4 from "../../../images/promo4.jpg";

import artist from "../../../images/home/artistofday.jpeg";
import ehsnews from "../../../images/home/ehsmews.jpeg";
import posterofday from "../../../images/home/p11.jpeg";
import womenempower from "../../../images/home/womenempower.jpeg";
const BodySection = () => {
  return (
    <>
      <section
        className="landing"
        style={{
          backgroundRepeatX: "repeat",
          backgroundRepeatY: "repeat",
          backgroundPosition: "center center",
          backgroundPositionX: "center",
          backgroundPositionY: "center",
          backgroundAttachment: "fixed",
          backgroundSize: "auto",
        }}
      >
        <div className="left">
          <div className="title">
            <h2>
              The Best Environment,
              <br /> Health and Safety Prints for <br />
              your Workplace.
            </h2>
          </div>
        </div>
        <div className="right">
          {/* <img src="./gif.gif" alt="homePic" /> */}
          <img src="./poster.gif" alt="homePic" />
          {/* <img src={homepagePoster} alt="homePic" /> */}
        </div>

        <div className="landing-orders">
          {/* <span className="landing-diy-link">Create Your Own</span> */}
          <p style={{ marginTop: "20px" }}>
            What would you like to order today
          </p>
          <div className="landing-options">
            <Link to="/category/posters">
              <img src={posterTag} alt="" className="imag" />
            </Link>
            <Link to="/category/signages">
              <img src={signagesTag} alt="" className="imag" />
            </Link>
            <Link to="/category/asset-markings">
              <img src={assetTag} alt="" className="imag" />
            </Link>
            <Link to="/category/floor-graphics">
              <img src={floorTag} alt="" className="imag" />
            </Link>
            <Link to="/category/floor-graphics">
              <img src={pictograms} alt="" className="imag" />
            </Link>
            <Link to="/category/floor-graphics">
              <img src={Createown} alt="" className="create" />
            </Link>
          </div>
        </div>
        <div className="landing-gifs">
          <div>Deal of the day</div>
          <div>Premium quality material</div>
          <div>Bulk orders with fast delivery</div>
        </div>
      </section>
      <section className="promotions">
        <div className="card-wrap">
          <div className="card-landing">
            <img
              style={{ height: "425px", border: "2px solid gray" }}
              src={posterofday}
              alt=""
            />

            <div className="info">
              <h4>Poster of the day</h4>
              <small>Find more designs in multiple languages</small>
            </div>
          </div>
          <div className="card-landing">
            <img
              style={{ height: "315px", border: "2px solid gray" }}
              src={artist}
              alt=""
            />
            <div className="info">
              <h4>ARTIST of the day</h4>
              <small>Find more designs from the artist</small>
            </div>
          </div>

          <div className="card-landing">
            <img
              style={{ height: "315px", border: "2px solid gray" }}
              src={womenempower}
              alt=""
            />
            <div className="info">
              <h4>Women Empowerment</h4>
              <small>Join with us and explore possibilities</small>
            </div>
          </div>
          <div className="card-landing">
            <img
              style={{ height: "315px", border: "2px solid gray" }}
              src={ehsnews}
              alt=""
            />
            <div className="info">
              <h4>EHS News</h4>
              <small>Together we can save our planet</small>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BodySection;
