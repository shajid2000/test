import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./signagesbody.css";

// components
import Carousel from "react-elastic-carousel";
import Card from "../../commonComponents/Crads/Card";
import Bestseller from "../../commonComponents/Bestseller/Bestseller";
import { getSingleCategory } from "../../../fetchData/getSingleCategory";
import { getSubCategoryListForPages } from "../../../fetchData/getSubCategoryList";

// images
import offer from "./../../../images/Upto50Offer.svg";
import pc1 from "./../../../images/Pre-printed_Signages.svg";

const SignagesBody = () => {
  const signagesCategoryData = [
    { img: pc1, name: "Caution" },
    { img: pc1, name: "Warning" },
    { img: pc1, name: "Probhition" },
  ];

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 4 },
    { width: 1200, itemsToShow: 3 },
  ];
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      let res = await getSingleCategory("signages");
      if (res) {
        let response = await getSubCategoryListForPages(res.data.data[0]._id);

        if (response) setCategory(response.data.data);
        //console.log(response.data.data)
      }
    };
    getCategory();
  }, []);

  // const signagesCategoryData = [{img: pc1, name: 'Caution'}, {img: pc1, name: 'Warning'}, {img: pc1, name: 'Probhition'}];

  return (
    <>
      <div className="signagesBody">
        <div className="signTopContainer">
          <div className="signHeading">Signages</div>

          <div className="signBanner">
            <img src={offer} alt="offer" />
          </div>
        </div>

        <div className="shopByCategorySignages">
          <h1 className=".sbc-t">Shop By Category</h1>

          <Carousel
            breakPoints={breakPoints}
            pagination={false}
            showArrows={true}
            enableAutoPlay={true}
          >
            {category.map((elem, i) => {
              return (
                <Link key={elem._id} to="/signages/signagessubcategory">
                  <Card title={elem.title} src={elem.imgUrl} />
                </Link>
              );
            })}
          </Carousel>
        </div>

        <Bestseller
          category="signages"
          title="bestseller"
          linkTo="specification"
        />
      </div>

      <Link to="/signages/signagessubcategory" className="explore">
        Explore
      </Link>
    </>
  );
};

export default SignagesBody;
