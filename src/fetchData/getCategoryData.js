import axios from "axios";
import { API } from "../backend";

export const getCategoryData = async (category, skip, limit) => {
  return await axios
    .get(`${API}posters/getPosterByCatSubCat`, {
      params: { category_slug: category, skip, limit },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};
