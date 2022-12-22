import React from "react";

import { Link } from "react-router-dom";

import Graph from "../../images/icons/Graph.png";
import User from "../../images/icons/User.png";
import Swap from "../../images/icons/Swap.png";
import gallery from "../../images/icons/gallerylogo.png";

import Counter from "../../components/homeComponents/Counter";

import "./aboutUs.css";
const AboutUs = () => {
  const topView = () => {
    window.scrollTo({ top: 0 });
  };

  topView();
  return (
    <div className="about-container">
      <p className="heading">About Us</p>
      <div className="about-text-container">
        <p className="aboutText">
          EHS Prints is a subsidiary of Dichroic Labs LLP incorporated in
          January 2017. We are a E-marketplace for Industrial content
          development & improving Industrial operational safety & standards.
        </p>
        <p className="aboutText">
          People’s health and enabling better outcomes through prevention &
          keeping informed is our duty. EHS Prints leverages advanced technology
          and deep design/thought process and consumer insights to deliver
          integrated solutions.
        </p>
        <p className="aboutText">
          The company is an innovation leader in posters, safety Signage, floor
          graphics & asset markings due to its vast panel of
          artist/designer/industry experts & online presence for all (Artist,
          Distributor and Customer). We facilitate customized digital asset
          portfolio creation through E central.
        </p>
        <p className="aboutText">
          We provide and implement unique safe environment solutions by
          understanding business processes, application & infrastructure of our
          customers. Lot of our work is a mandatory operational requirement.
        </p>
        <p className="aboutText">
          We have developed D.I.Y tools also to facilitate end user & we do
          provide educational/informational data on our website
          www.ehsprints.com. We ensure your sign displays a powerful message
          with impact at right place
        </p>
      </div>
      <p className="heading">Our Products</p>
      <div className="products">
        <Product img={gallery} title="Poster" link="/poster" />
        <Product img={User} title="Pictograms" link="/assetmarkings" />
        <Product img={Swap} title="Signages" link="/signages" />
        <Product img={Graph} title="Floor Graphics" link="/floorgraphics" />
      </div>
      <p className="heading">Why Customer Choose Us ?</p>
      <section className="choice-list">
        <ul>
          <li>User-Friendly site</li>
          <li>Payment Secure System</li>
          <li>2000+ unique artworks</li>
          <li>24/7 Support Mon to Fri</li>
          <li>DIY Features</li>
          <li>100% Satisfaction</li>
          <li>English/Hindi posters</li>
          <li>End-to-end e-commerce solution</li>
          <li>Multiple payment options</li>
          <li>Seamless returns</li>
          <li>Nationwide delivery</li>
        </ul>
      </section>
      <section className="about-counter">
        <p>
          <Counter end={1100} />
          <span> CUSTOMERS</span>
        </p>
        <p>
          <Counter end={250} />
          <span> DESIGNERS</span>
        </p>
        <p>
          <Counter end={4500} />
          <span>VISITORS</span>
        </p>
      </section>
    </div>
  );
};

export default AboutUs;

const Product = ({ img, title, link }) => {
  return (
    <div className="product">
      <div className="circle-border">
        <div className="logo-circle">
          <img src={img} alt="" />
        </div>
      </div>
      <Link to={link} className="my-pic-desc">
        {title}
      </Link>
    </div>
  );
};
