import axios from "axios";

import { API } from "../../backend";
export const posterInfo = (data) => async (dispatch) => {
  const getSubCategoryList = async () => {
    return await axios
      .get(`${API}posters/get-listOfSubcategory`)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        return null;
      });
  };
  const res = await getSubCategoryList(data);
  // console.log(res,"-----")
  dispatch({
    type: "GET_POSTER_CATEGORY",
    payload: res.data.data,
  });
};

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
    type: "GET_POSTER_SUBCATEGORY",
    payload: res.data.data.postersExists,
  });
  dispatch({
    type: "GET_POSTER_COUNT",
    payload: res.data.data.count,
  });
};

export const postersubcategory = (data, skip, limit) => async (dispatch) => {
  const getDataBySubCat = async (subCat) => {
    if (data === "all categories") {
      return await axios
        .get(`${API}posters/getPoster`)
        .then((res) => res)
        .catch((err) => {
          console.log(err);
          return null;
        });
    } else {
      // console.log(data,"***********************")
      return await axios
        .get(`${API}posters/getPosterByCatSubCat`, {
          params: { subCategorySlug: data, skip, limit },
        })
        .then((res) => res)
        .catch((err) => {
          console.log(err);
          return null;
        });
    }
  };
  // console.log("hello")
  const res = await getDataBySubCat(data);
  console.log("Poster", res.data);
  dispatch({
    type: "GET_POSTER_SUBCATEGORY",
    payload: res.data.data.postersExists,
  });
  dispatch({
    type: "GET_POSTER_COUNT",
    payload: res.data.data.count,
  });
};
export const addingReview = (review,posterId) => async (dispatch) => {

  try {
    let payload ={
      ...review,
      "poster_obj_id":posterId ,
    }
    // console.log("rev-",p)
    const myuser = JSON.parse(localStorage.getItem('myuser'))
    const response = await fetch(`${API}posters/insertUpdateRating`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json",
      "x-access-token": `${myuser.token}`
   }

  })
  const data = await response.json();
  // console.log("review",data)

   } catch (error) {
    console.log(error)
   }
  };

/*export const posterInfoLanguage = (data) => async dispatch => {
   
        const getPosters = async (skipVal) => {
            return await axios.get(`${API}posters/get_poster_by_language?language=${data}`, {
                params: { limit: 20, skip: skipVal }
            })
                .then((res) => {return res})
                .catch((err) => {
                    //console.log(err)
                    return null;
                })
        }
        const res=await getPosters();
        //console.log(res.data.data.postersExists);
            dispatch( {
                type: "GET_POSTER_SUBCATEGORY",
                payload: res.data.data.postersExists
            });
    }
*/
    
    // export const postersubcategory =(data,skip) => async dispatch =>{
    //     const getDataBySubCat = async (subCat) => {
            
    //         if (data === 'all categories') {

    //             return await axios.get(`${API}posters/getPoster`)
    //                 .then((res) => res)
    //                 .catch((err) => {
    //                     //console.log(err);
    //                     return null;
    //                 })
    //         }
    //         else {
    //             // //console.log(data,"***********************")
    //             return await axios.get(`${API}posters/getPosterByCatSubCat`, {
    //                 params: {subCategorySlug: data, skip:skip}
    //             })
    //                 .then((res) => res)
    //                 .catch((err) => {
    //                     //console.log(err)
    //                     return null;
    //                 })
    //         }
    //     }
    //     // //console.log("hello")
    //     const res = await getDataBySubCat(data);
    //     // //console.log(res.data.data.postersExists);
    //         dispatch( {
    //             type: "GET_POSTER_SUBCATEGORY",
    //             payload: res.data.data.postersExists
    //         });
    // }
