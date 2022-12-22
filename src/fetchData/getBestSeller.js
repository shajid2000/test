import axios from 'axios';
import { API } from '../backend';

export const getBestSeller = async (category)=> {
    return await axios.get(`${API}posters/getPosterByCatSubCat`, {
        params: { category_slug: category, bestseller: 1 },
    })
    .then((res)=> res)
    .catch((err)=> {
        //console.log(err);
        return null
    })
};





















// Axios.get(`${API}posters/getPosterById`, { params: { poster_obj_id: '' } })
