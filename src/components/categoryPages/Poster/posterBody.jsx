import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../commonComponents/Crads/Card";
import offer from "../../../images/Upto50Offer.svg";
import "./posterBody.css";
import Carousel from "react-elastic-carousel";
import Bestseller from "../../commonComponents/Bestseller/Bestseller";
// import { getSubCategoryList} from '../../../fetchData/getSubCategoryList'
import { getSingleCategory } from "../../../fetchData/getSingleCategory";
import { getSubCategoryListForPages } from "../../../fetchData/getSubCategoryList";

import pc1 from "./../../../images/posterCategory/CHEMICAL.png";
import pc10 from "./../../../images/posterCategory/ENGLISH.png";
import pc11 from "./../../../images/posterCategory/HINDI.png";
import pc12 from "./../../../images/posterCategory/BILINGUAL.png";

import { useDispatch, useSelector } from "react-redux";
import {
  posterInfo,
  posterInfoLanguage,
} from "../../../redux/actions/posterActions";

import delivery_img from "../../../images/delivery.png";

const PosterBody = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      let res = await getSingleCategory("posters");
      if (res) {
        let response = await getSubCategoryListForPages(res.data.data[0]._id);
        if (response) setCategory(response.data.data);
      }
      // console.log(response.data.data)
    };
    getCategory();
  }, []);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 4 },
    { width: 1200, itemsToShow: 4 },
  ];
  const dispatch = useDispatch();
  const posterCategoryData = useSelector((state) => state.poster.posterList);
  //const posterCategoryData=posterCategory.poster
  //console.log("...",posterCategoryData);

  useEffect(() => {
    dispatch(posterInfo(0));
  }, []);

  // const posterCategoryData = [{img: pc1, name: 'chemical'}, {img: pc2, name: 'covid'}, {img: pc3, name: 'electrical'}, {img: pc4, name: 'environment'}, {img: pc5, name: 'fire'}, {img: pc6, name: 'housekeeping'}, {img: pc7, name: 'material'}, {img: pc8, name: 'ppe'}, {img: pc9, name: 'quality'}];

  const posterByLanguageData = [
    { img: pc10, name: "english", language: 1 },
    { img: pc11, name: "hindi", language: 2 },
    { img: pc12, name: "bilingual", language: 3 },
  ];

  return (
    <>
      <div className="posterBody">
        <section className="m-body">
          <div className="top">
            <div className="title">
              <h1 className="pos-t">Posterss</h1>
            </div>
            <div className="banner">
              <img src={offer} alt="offer" />
            </div>
          </div>
        </section>
        <h1 className="sbc-t">Shop By Categoryy</h1>
        <section className="shopBycategory">
          <Carousel
            breakPoints={breakPoints}
            pagination={false}
            enableAutoPlay={true}
            showArrows={window.screen.width > 600 ? true : false}
          >
            {posterCategoryData.slice(0, 11).map((elem, ind) => {
              /*repalce pc1 with elem.imgUrl*/
              return (
                <Link
                  key={elem._id}
                  to={`/poster/postersubcategory?subCategorySlug=${elem.sub_cat_slug}`}
                >
                  <Card title={elem.title} src={pc1} />
                </Link>
              );
            })}
          </Carousel>
        </section>

        <h1 className="sbc-t">Shop By Language</h1>
        <section className="shopBylanguage">
          <Carousel
            breakPoints={breakPoints}
            pagination={false}
            enableAutoPlay={window.screen.width > 600 ? false : true}
            showArrows={window.screen.width > 600 ? true : false}
          >
            {posterByLanguageData.map((elem) => {
              return (
                <Link
                  key={elem._id}
                  to={`/poster/postersubcategory?language=${elem.language}`}
                >
                  <Card title={elem.name} src={elem.img} />
                </Link>
              );
            })}
          </Carousel>
        </section>

        <section className="bestsellers">
          <Bestseller
            category="posters"
            title="Bestseller"
            linkTo="posterspecification"
          />
        </section>

        <Link
          to="/poster/postersubcategory?subCategorySlug=all categories"
          className="explore"
        >
          Explore
        </Link>

        <section className="posterFooterSection">
          <div className="content">
            <p>
              Worried of Covid <br />
              We Ensure Contact less Delivery
            </p>
            <Link to="/">Learn More</Link>
          </div>
          <div className="contact-less">
            <img src={delivery_img} alt="deliveryImg" />
          </div>
        </section>
      </div>
    </>
  );
};

export default PosterBody;
