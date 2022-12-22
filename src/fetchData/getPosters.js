import axios from 'axios';
import { API } from '../backend';

export const getPosters = async (skipVal) => {
    return await axios.get(`${API}posters/getPoster`, {
        params: { limit: 20, skip: skipVal }
    })
        .then((res) => res)
        .catch((err) => {
            //console.log(err)
            return null;
        })
}