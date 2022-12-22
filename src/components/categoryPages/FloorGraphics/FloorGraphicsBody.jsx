import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import offer from "./../../../images/Upto50Offer.svg";
// components
import Loading from "./../../commonComponents/LoadingScreen/Loading";

import ProductCard from "../../commonComponents/Crads/productCard";
import ReactPaginate from "react-paginate";

import "./floorGraphics.css";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryDataa } from "../../../redux/actions/productAction";

function FloorGraphicsBody() {

  const [pageNumber, setPageNumber] = useState(0);
  
  const [loading, setLoading] = useState(true);
  const floorGraphicsdata = useSelector((state)=>state.product)
  const dispatch = useDispatch()

  useEffect(() => {
    
    dispatch(getCategoryDataa("floor-graphics",
    pageNumber * 12,
    12))
  }, [pageNumber]);
  const itemsPerPage = 12;
  const totalPageCount = Math.ceil(floorGraphicsdata.count / itemsPerPage);
  const displayItem = floorGraphicsdata.floorGraphicsSubcategoryList.map((elem) => {
    return (
      <Link
        to={`/assetspecification/${elem._id}`}
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
  return (
    <>
      <div className="floorGraphicsBody">
        <div className="floorGraphicsTopContainer">
          <div className="floorHeading">Floor Graphics</div>

          <div className="floorBanner">
            <img src={offer} alt="offer" />
          </div>
        </div>
        {loading ? (
          <div className="posterLoading">
            <Loading />
          </div>
        ) : (
          <div className="floorGraphicsContainer">{displayItem}</div>
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
}

export default FloorGraphicsBody;
