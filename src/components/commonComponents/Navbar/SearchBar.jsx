import React, { useState, useEffect } from "react";
import {
  getSubCategoryList,
  getDataBySubCat,
} from "../../../fetchData/getSubCategoryList";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../../backend";
import "./searchbar.css";
import { useDispatch } from "react-redux";
const SearchBar = () => {
  let tags = [{text:"fire in posters", key:"fire",cat_slug:"posters"},
                {text:"fire in signanges", key:"fire",cat_slug:"signages"},
                {text:"fire in floor Graphics", key:"fire",cat_slug:"floor-graphics"},
                {text:"fire in asset markings", key:"fire",cat_slug:"asset-markings"},
                {text:"covid in posters",key:"covid",cat_slug:"posters"},
                {text:"covid in signnages",key:"covid",cat_slug:"signnages"},
                {text:"covid in floor Graphics",key:"covid",cat_slug:"floor-graphics"},
                {text:"covid in asset markings",key:"covid",cat_slug:"asset-markings"}]
  const navigate = useNavigate();
  const dispatch =useDispatch();
  const [subCategory, setSubcategory] = useState([]);
  const [liveSubCat, setLiveSubCat] = useState("all categories");
  const [subCatProducts, setSubCatProducts] = useState([]);
  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [mySelectedSubCat, setMySelectedSubCat] = useState("none");
  const [HideCatList,setHideCatList]=useState(false);
  useEffect(() => {
    const getSubCategoryListData = async () => {
      
      const response = await getSubCategoryList();
      //setSubcategory(response.data.data);
      const options =[{name:"Posters",to:"/category/posters"},
      {name:"Signanges", to:"/category/signages"},
      {name:"Floor Graphics" ,to:"/category/floor-graphics"},
      {name:"Assest Markings",to:"/category/asset-markings" },
      {name:"DIY", to:"/diy"},
      {name:"BestSellers",to:"/category/bestseller"}]
      setSubcategory(options)
    };

    getSubCategoryListData();
  }, []);

  useEffect(() => {
    const setActiveFirstTime = async () => {
      // const response = await axios.get(`${API}posters/getPosterByCatSubCat`, {
      //   params: { category_slug: "posters", bestseller: 1 },
      // });
      
      // const response = await axios.get(`${API}posters/getitemsByKey`, {
      //   params: { key:"covid" },
      // });
      // console.log(response.data.data.postersExists);
      // setSubCatProducts(response.data.data.postersExists);
    
    };

    if (liveSubCat === "all categories") {
      setActiveFirstTime();
    }
  }, []);

  useEffect(() => {
    
    const getSubCatData = async () => {
      const response = await getDataBySubCat(liveSubCat);
      setSubCatProducts(response.data.data.postersExists);
    };

    getSubCatData();
  }, [liveSubCat]);

  useEffect(() => {
    if (mySelectedSubCat !== "none")
      navigate(`${mySelectedSubCat}`);
  }, [mySelectedSubCat]);

  const activeSubCat = (e) => {
    console.log("change captured")
    
    setLiveSubCat(e.target.value);
    setMySelectedSubCat(e.target.value);
    setHideCatList(false)
  };

  const search = (e) => {
    const searchWord = e.target.value;
    console.log(searchWord);
    // const searchResult = subCatProducts.filter((elem) => {
    //   return elem.name.toLowerCase().includes(searchWord.toLowerCase());
    // });
    
    const searchResult =tags.filter((elem) => {
        return elem.text.toLowerCase().includes(searchWord.toLowerCase());
      });
    if (searchWord === "") {
      setResult([]);
      setShowResult(false);
    } else {
      setResult(searchResult);
      setShowResult(true);
    }
  };

  const closeSearch = (object) => {
    setResult([])
  };

  return (
    <div className="searchBar">
      {HideCatList?
        <div className="selectCategory0" >
          <select  onClick={()=>{setHideCatList(false)}}>
          <option>All categories</option>
        </select>
        </div>:<div className="selectCategory" >
        <select onChange={activeSubCat} onClick={()=>{setHideCatList(false)}} onMouseLeave={()=>{setHideCatList(true)}} >
        
        <option value="all categories" >All categories</option>
          {subCategory.map((elem, i) => {
            return <option value={elem.to} key={i}>{elem.name}</option>;
          })}
        
        </select>
      </div>
      }
      <div className="searchInput">
        <input
          type="text"
          placeholder="Search for posters, signages and more..."
          onChange={search}
        />
        <i className="fas fa-search"></i>
      </div>

      <div  onMouseLeave={()=>{   setResult([]);
                                  setShowResult(false);}}
        className={` ${showResult === true ? "searchResult" : "hideResult"}`}
       
      >
        {result.map((elem) => {
          return (
            <Link
            
              // to={`/${
              //   elem.category[0].cat_slug === "posters"
              //     ? "posterspecification"
              //     : elem.category[0].cat_slug === "asset-markings"
              //     ? "assetspecification"
              //     : "specification"
              // }/${elem._id}`}
              to={`/subcategory/search?key=${elem.key}&&cat_slug=${elem.cat_slug}`}
              className="resultLink"
              onClick={()=>closeSearch()}
              key={elem.text}
            >
              <div className="resultItem">{elem.text}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SearchBar;
