import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategoryData } from "../../../fetchData/getCategoryData";

// components
import ReactPaginate from "react-paginate";
import Loading from "./../../commonComponents/LoadingScreen/Loading";

import ProductCard from "../../commonComponents/Crads/productCard";
import Carousel from "react-elastic-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryDataa } from "../../../redux/actions/productAction";

const SignagesSubCat = () => {
  const signagesdata = useSelector((state)=>state.product)
  const [active, setActive] = useState({
    activeCategory: "Caution",
    category: ["Caution", "Warning", "Probhition"],
  });
  const dispatch = useDispatch(); 
  
  const [pageNumber, setPageNumber] = useState(0);

  const [loading, setLoading] = useState(true);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1, itemsToScroll: 1 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3 },
  ];

  const toogleActive = (i) => {
    //console.log(i);
    setActive({ ...active, activeCategory: active.category[i] });
  };

  useEffect(() => {
  
    dispatch(getCategoryDataa("signages", pageNumber * 12, 12))
  }, [pageNumber]);

  const itemsPerPage = 12;
  const totalPageCount = Math.ceil(signagesdata.count/ itemsPerPage);
  const displayItem = signagesdata.signagesSubcategoryList.map((elem) => {
    return (
      <Link
        to={`/specification/${elem._id}`}
        className="bsLink"
        key={elem._id}
      >
        <ProductCard key ={elem._id} src={elem.imgUrl} title={elem.name} />
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
      <div className="miniNav">
        <Carousel
          breakPoints={breakPoints}
          pagination={false}
          showArrows={true}
        >
          {active.category.map((elem, i) => {
            return (
              <div
                key={elem._id}
                className={
                  active.activeCategory === active.category[i]
                    ? "categoryElement categoryElementActive"
                    : "categoryElement"
                }
                onClick={() => {
                  toogleActive(i);
                }}
                // key={i}
              >
                {elem}
              </div>
            );
          })}
        </Carousel>
      </div>
      {loading ? (
        <div className="posterLoading">
          <Loading />
        </div>
      ) : (
        <div className="signagesContainer">{displayItem}</div>
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

export default SignagesSubCat;