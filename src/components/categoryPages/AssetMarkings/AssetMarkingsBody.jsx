import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategoryData } from "../../../fetchData/getCategoryData";

// components
import "./assetMarking.css";
import offer from "./../../../images/Upto50Offer.svg";

import Loading from "./../../commonComponents/LoadingScreen/Loading";
import ProductCard from "../../commonComponents/Crads/productCard";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryDataa } from "../../../redux/actions/productAction";

const AssetMarkingsBody = () => {

  const [pageNumber, setPageNumber] = useState(0);

  const [loading, setLoading] = useState(true);
  const assetMarkingdata = useSelector((state)=>state.product)
 
  const dispatch = useDispatch();

  useEffect(() => {
  
    dispatch(getCategoryDataa("asset-markings",
pageNumber * 12,
12))
  }, [pageNumber]);
  const itemsPerPage = 12;
  const totalPageCount = Math.ceil(assetMarkingdata.count / itemsPerPage);
  const displayItem = assetMarkingdata.assetMarkingSubcategoryList.map((elem) => {
    return (
      <Link to={`/specification/${elem._id}`} className="bsLink" key={elem._id}>
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

  return (
    <>
      <div className="assetMarketingBody">
        <div className="assetMarketingTopContainer">
          <div className="assetMarketingHeading">Asset Marketing</div>

          <div className="assetMarketingBanner">
            <img src={offer} alt="offer" />
          </div>
        </div>
        {loading ? (
          <div className="posterLoading">
            <Loading />
          </div>
        ) : (
          <div className="assetMarkingContainer">{displayItem}</div>
        )}
      </div>
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

export default AssetMarkingsBody;
