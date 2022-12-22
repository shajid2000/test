import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./../commonComponents/Crads/productCard";
import Carousel from "react-elastic-carousel";
import Loading from "./../commonComponents/LoadingScreen/Loading";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./subcategoryitems.css";
import { posterInfoLanguage,postersubcategory } from "../../redux/actions/categoryAction";
import { useParams } from "react-router-dom";
import { bestsellersData } from "../../redux/actions/categoryAction";
import {searchResult} from "../../redux/actions/categoryAction";
import { subCategoryList } from '../../redux/actions/categoryAction';
const SubCategoryItems = () => {
  //search?key=fire&&cat_slug=posters
    let parameters = { language: "", subCategorySlug: "" , key:"", cat_slug:""};
    const { categoryName } = useParams();

    const subCategory=useSelector(state=>state.category.subCategoryList)
   
    console.log(subCategory)
    const [pageNumber, setPageNumber] = useState(0);
    const subCategoryItemList = useSelector((state) => state.category); 
    const SubcategoryItem = subCategoryItemList.subCategoryItems;
    const count = subCategoryItemList.count;
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    useEffect(()=>{
      if(categoryName==="posters"||categoryName==="signages"||categoryName==="floor-graphics"||categoryName==="asset-markings")
        dispatch(subCategoryList(categoryName));
    
    },[categoryName])
  for (const entry of searchParams.entries()) {
    console.log(entry);
    if (entry[0] === "language") {
      parameters = { language: entry[1], subCategorySlug: "",key:"", cat_slug:"" };
    } else if (entry[0] === "subCategorySlug") {
      parameters = { language: "", subCategorySlug: entry[1],key:"", cat_slug:"" };
    }
    else if(entry[0]==="key"){
      parameters ={...parameters, language: "", subCategorySlug: "",key:entry[1]};
    }
    else if(entry[0]==="cat_slug"){
      parameters ={...parameters, language: "", subCategorySlug: "",cat_slug:entry[1] }
    }
  }

  useEffect(() => {
    
    if (parameters.language ) {
      dispatch(posterInfoLanguage(parameters.language, pageNumber * 12, 12));
    }
    if(categoryName === "search"){
      dispatch(searchResult({key:parameters.key,cat_slug:parameters.cat_slug}))
    } 
    else if(parameters.subCategorySlug==="bestseller"){
      dispatch(bestsellersData({category:categoryName}));
    }
    else if (parameters.subCategorySlug) {
      dispatch(
        postersubcategory(parameters.subCategorySlug, pageNumber * 12, 12,categoryName)
      );
    }
    else{
        postersubcategory("all categories", pageNumber * 12, 12,categoryName)
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

  const displayItem = SubcategoryItem.map((elem) => {
    let linkname="posterspecification";
    if(categoryName === "signages" || categoryName ==="asset-markings"){
        linkname="specification";
    }
    else if (categoryName === "floor-graphics"){
        linkname="assetspecification";
    }
    return (
      <Link
        to={`/${linkname}/${elem._id}`}
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
  let language;
  if(parameters.language){
    console.log(parameters.language)
    if(parameters.language==1){
      language= "Engish "+categoryName;
    }
    else if(parameters.language==2){
      language= "Hindi "+categoryName;
    }
    else if(parameters.language==3){
      language= "Bilingual "+categoryName;
    }
  }
  return (
    <>
    <h6 style={{textTransform:"capitalize"}}><Link to={`/category/${categoryName}`}>{categoryName}</Link>
    /{parameters.subCategorySlug||language||parameters.cat_slug}</h6>
      <div className="miniNav">
        <Carousel
          breakPoints={breakPoints}
          pagination={false}
          enableAutoPlay={true}
        >
          {subCategory.map((elem) => {
          
            return elem.sub_cat_slug === parameters.subCategorySlug ? (
                <Link
                  key={elem._id}
                  className="categoryElementactive"
                  to ={`/subcategory/${categoryName}?subCategorySlug=${elem.sub_cat_slug}`}
                >
                  <div>{elem.title}</div>
                </Link>
            ) :(
              <Link
                key={elem._id}
                className="categoryElement"
                to ={`/subcategory/${categoryName}?subCategorySlug=${elem.sub_cat_slug}`}
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
}

export default SubCategoryItems
