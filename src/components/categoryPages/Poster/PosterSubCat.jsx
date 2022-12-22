import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategoryData } from "./../../../fetchData/getCategoryData";
import { getSubCategoryList } from "../../../fetchData/getSubCategoryList";
import { getPosters } from "../../../fetchData/getPosters";
// components
import ProductCard from "../../commonComponents/Crads/productCard";
import Carousel from "react-elastic-carousel";
import Loading from "./../../commonComponents/LoadingScreen/Loading";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./postersubcat.css";
import {
  posterInfoLanguage,
  postersubcategory,
} from "../../../redux/actions/posterActions";
const PosterSubCat = () => {
  let parameters = { language: "", subCategorySlug: "" };

  const [pageNumber, setPageNumber] = useState(0);
  const poster = useSelector((state) => state.poster);
  const posterSubcategoryList = poster.posterSubcategoryList;
  const count = poster.count;

  const [loading, setLoading] = useState(true);
  const posterList = poster.posterList;

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  for (const entry of searchParams.entries()) {
    if (entry[0] === "language") {
      parameters = { language: entry[1], subCategorySlug: "" };
    } else if (entry[0] === "subCategorySlug") {
      parameters = { language: "", subCategorySlug: entry[1] };
    }
    else{
      parameters = { language: "", subCategorySlug:"alld" };
    }
  }
  useEffect(() => {
    if (parameters.language) {
      dispatch(posterInfoLanguage(parameters.language, pageNumber * 12, 12));
    } else if (parameters.subCategorySlug) {
      dispatch(
        postersubcategory(parameters.subCategorySlug, pageNumber * 12, 12)
      );
    }
  }, [searchParams, pageNumber]);
  const breakPoints = [
    { width: 2, itemsToShow: 1 },
    { width: 550, itemsToShow: 1, itemsToScroll: 1 },
    { width: 690, itemsToShow: 3 },
    { width: 768, itemsToShow: 4 },
    { width: 1200, itemsToShow: 5 },
  ];
  const itemsPerPage = 12;
  const totalPageCount = Math.ceil(count / itemsPerPage);
  const displayItem = posterSubcategoryList.map((elem) => {
    return (
      <Link
        to={`/posterspecification/${elem._id}`}
        className="bsLink"
        key={elem._id}
      >
        <ProductCard src={elem.imgUrl} title={elem.name} />
      </Link>
    );
  });
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
    setLoading(false);
  }, [pageNumber]);
  const changePageItem = ({ selected }) => {
    setPageNumber(selected);
    setLoading(true);
  };
  // asset-marking-test-sub-category
  // floor-graphics-test-sub-category
  return (
    <><div className="paginate" >/posters/subcategory/{parameters.subCategorySlug}</div>
      <div className="miniNav">
        <Carousel
          breakPoints={breakPoints}
          pagination={false}
          enableAutoPlay={true}
        >
          {posterList.map((elem) => {
            return elem.sub_cat_slug === parameters.subCategorySlug ? (
              elem.title === "Asset Marking test sub category" ||
              elem.title === "Floor Graphics test sub category" ? (
                <Link
                  key={elem._id}
                  className="categoryElementactive"
                  to={`/poster/postersubcategory?subCategorySlug=${elem.sub_cat_slug}`}
                >
                  <div>{elem.title.replace(" test sub ", " ")}</div>
                </Link>
              ) : (
                <Link
                  key={elem._id}
                  className="categoryElementactive"
                  to={`/poster/postersubcategory?subCategorySlug=${elem.sub_cat_slug}`}
                >
                  <div>{elem.title}</div>
                </Link>
              )
            ) : elem.title === "Asset Marking test sub category" ||
              elem.title === "Floor Graphics test sub category" ? (
              <Link
                key={elem._id}
                className="categoryElement"
                to={`/poster/postersubcategory?subCategorySlug=${elem.sub_cat_slug}`}
              >
                <div>{elem.title.replace(" test sub ", " ")}</div>
              </Link>
            ) : (
              <Link
                key={elem._id}
                className="categoryElement"
                to={`/poster/postersubcategory?subCategorySlug=${elem.sub_cat_slug}`}
              >
                <div>{elem.title}</div>
              </Link>
            );
          })}
        </Carousel>
      </div>
      {loading ? (
        <div className="posterLoading">
          <Loading />
        </div>
      ) : (
        <div className="posterContainer">{displayItem}</div>
      )}
      <div className="paginationContainer">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={totalPageCount}
          onPageChange={changePageItem}
          containerClassName={"paginate-container"}
          previousClassName={"previous-btn"}
          nextClassName={"next-btn"}
          disabledClassName={"disabled-btn"}
          activeClassName={"active-paginate-btn"}
        />
      </div>
    </>
  );
};

export default PosterSubCat;
