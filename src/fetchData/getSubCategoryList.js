import axios from "axios";
import { API } from "../backend";

export const getSubCategoryList = async () => {
  return await axios
    .get(`${API}posters/get-listOfSubcategory`)
    .then((res) => res)
    .catch((err) => {
     // console.log(err);
      return null;
    });
};

// =======it will give category list bases on pages===========by shajid

export const getSubCategoryListForPages = async (id) => {
  return await axios
    .get(`${API}subCategory/getSubCategory`, {
      params: { categoryId: id },
    })
    .then((res) => res)
    .catch((err) => {
      console.log(err);
      return null;
    });
};

// FOR GETTING DATA BASED ON THE SUBCATEGORY

export const getDataBySubCat = async (subCat) => {
  if (subCat === "all categories") {
    return await axios
      .get(`${API}posters/getPosterByCatSubCat`, {
        params: {
          category_slug: "posters",
          bestseller: 1,
          skip: 12,
          limit: 12,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  } else {
    return await axios
      .get(`${API}posters/getPosterByCatSubCat`, {
        params: { subCategorySlug: subCat },
      })
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        return null;
      });
  }
};
