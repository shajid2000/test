import { API } from "../../backend";
import axios from "axios";

export const getCategoryDataa = (category, skip, limit) => async (dispatch) => {
  try {
    const res = await axios.get(`${API}posters/getPosterByCatSubCat`, {
      params: { category_slug: category, skip, limit },
    });
    if (category === "asset-markings") {
      dispatch({
        type: "GET_ASSET-MARKINGS",
        payload: res.data.data,
      });
    }
    if (category === "signages") {
      dispatch({
        type: "GET_SIGNAGES",
        payload: res.data.data,
      });
    }
    if (category === "floor-graphics") {
      dispatch({
        type: "GET_FLOORGRAPHICS",
        payload: res.data.data,
      });
    }
    if (category === "pictograms") {
      dispatch({
        type: "GET_PICTOGRAMS",
        payload: res.data.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
