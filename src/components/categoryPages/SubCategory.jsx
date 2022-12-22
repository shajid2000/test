import React from "react";
import { useParams, Link } from "react-router-dom";
import "./subcategory.css";
import offer from "../../images/Upto50Offer.svg";
import Carousel from "react-elastic-carousel";
import { useSelector, useDispatch } from "react-redux";
import Card, { LangCard, SmallCard } from "../commonComponents/Crads/Card";
import pc1 from "./../../images/posterCategory/CHEMICAL.png";
import pc10 from "./../../images/posterCategory/ENGLISH.png";
import pc11 from "./../../images/posterCategory/HINDI.png";
import pc12 from "./../../images/posterCategory/BILINGUAL.png";
import RelatedCard from "../commonComponents/productSpecs/RelatedCard";
import next from "./../../images/next.png";
import delivery_img from "./../../images/delivery.png";
import { useEffect, useState } from "react";
import { subCategoryList } from "../../redux/actions/categoryAction";
import Bestseller from "../commonComponents/Bestseller/Bestseller";

const SubCategory = () => {
  const [showmore, Setshowmore] = useState(false);
  const [num, Setnum] = useState(10);
  const topView = () => {
    window.scrollTo({ top: 0 });
  };
  topView();
  const { categoryName } = useParams();

  const dispatch = useDispatch();
  const subCategory = useSelector((state) => state.category.subCategoryList);
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 4 },
    { width: 1200, itemsToShow: 4 },
  ];
  useEffect(() => {
    if (categoryName !== "bestseller") dispatch(subCategoryList(categoryName));
  }, [categoryName]);
  const posterByLanguageData = [
    { img: pc10, name: "english", language: 1 },
    { img: pc11, name: "hindi", language: 2 },
    { img: pc12, name: "bilingual", language: 3 },
  ];

  let linkname = "posterspecification";
  if (categoryName === "signages" || categoryName === "asset-markings") {
    linkname = "specification";
  } else if (categoryName === "floor-graphics") {
    linkname = "assetspecification";
  }
  const Next = () => {
    if (num === 19) {
      return;
    } else {
      Setnum(num + 1);

      window.scrollTo(0, 300);
    }
  };
  const top = () => {
    Setshowmore(true);
    window.scrollTo(0, 300);
  };
  return (
    <>
      <h6 style={{ textTransform: "capitalize" }}>{categoryName}</h6>
      {categoryName !== "bestseller" ? (
        <div className="posterBody">
          <section className="m-body">
            <div className="top">
              <div className="title">
                <h1 className="pos-t">{categoryName}</h1>
              </div>
              <div className="banner">
                <img src={offer} alt="offer" />
              </div>
            </div>
          </section>
          <h1 className="sbc-t">Shop By Category</h1>
          <section className="shopBycategory">
            {/* <Carousel breakPoints={breakPoints} pagination={false} enableAutoPlay={true} showArrows={window.screen.width > 600 ? true : false}> */}
            {categoryName === "posters" && (
              <div className="shopBycategory">
                {subCategory.slice(0, 10).map((elem) => {
                  console.log(subCategory);
                  return (
                    <>
                      <Link
                        key={elem._id}
                        to={`/subcategory/${categoryName}?subCategorySlug=${elem.sub_cat_slug}`}
                      >
                        <Card title={elem.title} src={elem.imgUrl} />
                      </Link>
                    </>
                  );
                })}
                {!showmore && (
                  <div className="more" onClick={top}>
                    More...
                  </div>
                )}
                {showmore && (
                  <div className="morelist">
                    {subCategory.slice(num, num + 4).map((elem) => {
                      return (
                        <>
                          <Link
                            key={elem._id}
                            to={`/subcategory/${categoryName}?subCategorySlug=${elem.sub_cat_slug}`}
                          >
                            <SmallCard title={elem.title} src={elem.imgUrl} />
                          </Link>
                        </>
                      );
                    })}
                    <button onClick={Next} className="next">
                      <img src={next} />
                    </button>
                  </div>
                )}
              </div>
            )}
            {categoryName === "signages" && (
              <div className="shopBycategory">
                {subCategory.slice(0, 4).map((elem) => {
                  return (
                    <>
                      <Link
                        key={elem._id}
                        to={`/subcategory/${categoryName}?subCategorySlug=${elem.sub_cat_slug}`}
                      >
                        <Card title={elem.title} src={elem.imgUrl} />
                      </Link>
                    </>
                  );
                })}
                <div className="signdivnew"></div>
              </div>
            )}
            {categoryName != "posters" &&
              categoryName != "signages" &&
              subCategory.map((elem) => {
                console.log(subCategory);
                return (
                  <Link
                    key={elem._id}
                    to={`/subcategory/${categoryName}?subCategorySlug=${elem.sub_cat_slug}`}
                  >
                    <Card title={elem.title} src={elem.imgUrl} />
                  </Link>
                );
              })}
            {/* </Carousel> */}
          </section>

          <h1 className="sbc-t">Shop By Language</h1>
          <section className="shopBylanguage">
            {/* <Carousel breakPoints={breakPoints} pagination={false} enableAutoPlay={window.screen.width > 600 ? false : true} showArrows={window.screen.width > 600 ? true : false}> */}
            {posterByLanguageData.map((elem) => {
              return (
                <Link
                  className="card-link"
                  key={elem._id}
                  to={`/subcategory/${categoryName}?language=${elem.language}`}
                >
                  <LangCard title={elem.name} src={elem.img} />
                </Link>
              );
            })}
            {/* </Carousel> */}
          </section>

          <section className="bestsellers">
            <Bestseller
              category={categoryName}
              title="Bestseller"
              linkTo={linkname}
            />
          </section>
          {/*to be corrected*/}
          <Link
            to={`/subcategory/${categoryName}?subCategorySlug=all categories`}
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
      ) : (
        <div>
          <section className="m-body">
            <div className="top">
              <div className="title">
                <h1 className="pos-t">{"posters"}</h1>
              </div>
            </div>
          </section>
          <section className="bestsellers">
            <Bestseller
              category={"posters"}
              title="Bestseller"
              linkTo={linkname}
            />
          </section>
          <section className="m-body">
            <div className="top">
              <div className="title">
                <h1 className="pos-t">{"floor-graphics"}</h1>
              </div>
            </div>
          </section>
          <section className="bestsellers">
            <Bestseller
              category={"floor-graphics"}
              title="Bestseller"
              linkTo={linkname}
            />
          </section>
          <section className="m-body">
            <div className="top">
              <div className="title">
                <h1 className="pos-t">{"asset-markings"}</h1>
              </div>
            </div>
          </section>
          <section className="bestsellers">
            <Bestseller
              category={"asset-markings"}
              title="Bestseller"
              linkTo={linkname}
            />
          </section>
          <section className="m-body">
            <div className="top">
              <div className="title">
                <h1 className="pos-t">{"signages"}</h1>
              </div>
            </div>
          </section>
          <section className="bestsellers">
            <Bestseller
              category={"signages"}
              title="Bestseller"
              linkTo={linkname}
            />
          </section>
          <Link
            to={`/subcategory/${categoryName}?subCategorySlug=all categories`}
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
      )}
    </>
  );
};

export default SubCategory;
