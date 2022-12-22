import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBestSeller } from "../../../fetchData/getBestSeller";
import Carousel from "react-elastic-carousel";
import "./bestseller.css";

// components
import ProductCard from "../Crads/productCard";
import RelatedCard from "../productSpecs/RelatedCard";
//import {bestsellersData } from "../../../redux/actions/categoryAction"
import { useDispatch, useSelector } from "react-redux";
const Bestseller = (props) => {
  const [bestSellerData, setBestSellerData] = useState([]);

  // const dispatch = useDispatch();
  //const bestSellerData = useSelector(state=>state.category.subCategoryItems);
  useEffect(() => {
    const getBestSellerData = async () => {
      let response = await getBestSeller(props.category);
      if (response) {
        setBestSellerData(response.data.data.postersExists);
        // dispatch({
        //   type: "GET_COUNT",
        //   payload: response.data.data.count,
        // });
      }
    };
    getBestSellerData();

    // dispatch(bestsellersData({category:props.category}));
  }, [props.category]);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },

    { width: 800, itemsToShow: 4 },

    { width: 1200, itemsToShow: 5 },
  ];

  let showArrow = window.screen.width < 600 ? false : true;

  return (
    <>
      <div className="bestSellerContainer">
        <div className="bestSellerCategoryTitle">{props.title}</div>
        <Carousel
          breakPoints={breakPoints}
          pagination={false}
          itemPadding={[10, 10, 10, 10]}
          enableAutoPlay={true}
          showArrows={showArrow}
          className="bestSellerCarousel"
        >
          {bestSellerData.map((elem) => {
            return (
              <Link
                key={elem._id}
                to={`/${props.linkTo}/${elem._id}`}
                className="bsLink"
              >
                <RelatedCard
                  photo={elem.imgUrl[0]}
                  name={elem.name}
                  price={elem.originalPrice}
                  id={elem._id}
                />
              </Link>
            );
          })}
        </Carousel>
        <Link
          className="bestseller_link"
          to={`/subcategory/${props.category}?subCategorySlug=bestseller`}
        >
          view All
        </Link>
      </div>
    </>
  );
};

export default Bestseller;
