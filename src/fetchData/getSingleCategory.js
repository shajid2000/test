import axios from "axios";
import { API } from "../backend";

export const getSingleCategory = async (category) => {
    return await axios.get(`${API}category/getcategory`, {
        params: { cat_slug: category }
    })
        .then((res) => res)
        .catch((err) => {
            //console.log(err)
            return null
        })
};
