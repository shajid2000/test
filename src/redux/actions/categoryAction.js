import axios from "axios";
import { API } from "../../backend";
import { getSingleCategory } from "../../fetchData/getSingleCategory";
import { getSubCategoryListForPages} from "../../fetchData/getSubCategoryList";
import { getBestSeller } from "../../fetchData/getBestSeller";

export const subCategoryList = (slug) => async (dispatch) => {
    console.log(slug)
        let res = await getSingleCategory(slug);
        if (res.status===200) {
            let response;
            if(res.data.data[0]._id)
                response = await getSubCategoryListForPages(res.data.data[0]._id);
                let dataPayload =response.data.data?response.data.data:[]
                dispatch({
                    type: "GET_SUBCATEGORY",
                    payload: dataPayload,
                  });
        }
  };

  export const postersubcategory = (data, skip, limit,category_slug) => async (dispatch) => {
    const getDataBySubCat = async (data, skip, limit,category_slug) => {
    //   if (data === "all categories") {
    //     return await axios
    //       .get(`${API}posters/getPoster`)
    //       .then((res) => res)
    //       .catch((err) => {
    //         console.log(err);
    //         return null;
    //       });
    //   } else {
        // console.log(data,"***********************")
        let params={};
        if(data==="all categories"){
            params={  skip, limit,category_slug }
        }
        
        else{
            params={ subCategorySlug: data, skip, limit }
        }
        return await axios
          .get(`${API}posters/getPosterByCatSubCat`, {
            params: params,
          })
          .then((res) => res)
          .catch((err) => {
            console.log(err);
            return null;
          });
      //}
    };
    console.log(data, skip, limit,category_slug)
    const res = await getDataBySubCat(data, skip, limit,category_slug,"dfsd");
    console.log("Poster", res.data);
    dispatch({
      type: "GET_ITEMS_SUBCATEGORY",
      payload: res.data.data.postersExists,
    });
    dispatch({
      type: "GET_COUNT",
      payload: res.data.data.count,
    });
  };

  export const bestsellersData = (data) => async (dispatch) => {
    const getBestSellerData = async () => {
      let response = await getBestSeller(data.category);
      if (response) {
        dispatch({
          type: "GET_ITEMS_SUBCATEGORY",
          payload: response.data.data.postersExists,
        });
        dispatch({
          type: "GET_COUNT",
          payload: response.data.data.count,
        });
      }
    };
    getBestSellerData();
  }

  export const searchResult =(data) =>async (dispatch)=>{
    const response = await axios.get(`${API}posters/getitemsByKey`, {
        params: { key:data.key, cat_slug:data.cat_slug },
      });
      console.log(response.data.data.postersExists,"---------------");
      if (response) {
        dispatch({
          type: "GET_ITEMS_SUBCATEGORY",
          payload: response.data.data.postersExists,
        });
        dispatch({
          type: "GET_COUNT",
          payload: response.data.data.count,
        });
      }
  }


  export const posterInfoLanguage = (data, skip, limit) => async (dispatch) => {
    const getPosters = async (skipVal) => {
      return await axios
        .get(`${API}posters/get_poster_by_language?language=${data}`, {
          params: { limit, skip },
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
    };
    const res = await getPosters();
    console.log("res.data.data",res.data);
    dispatch({
      type: "GET_ITEMS_SUBCATEGORY",
      payload: res.data.data.postersExists,
    });
    dispatch({
      type: "GET_COUNT",
      payload: res.data.data.count,
    });
  };