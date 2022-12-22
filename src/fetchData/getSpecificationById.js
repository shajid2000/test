import axios from "axios";
import { API } from "../backend";

export const getProductSpecification = async (id) => {
    return await axios.get(`${API}posters/getPosterById`, {
        params: {poster_obj_id: id}
    })
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        //console.log(err);
        return null
    })
};


