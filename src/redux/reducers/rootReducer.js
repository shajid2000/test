import { combineReducers } from "redux";
import handleCart from "./cartReducer";
import handlePoster from "./posterReducer";
import  { handleUser } from "./userReducer";
import handleProduct from "./productReducer";
import handleItem from "./categoryReducer";
const rootReducer = combineReducers({
    cart: handleCart,
    poster:handlePoster,
    user: handleUser,
    product: handleProduct,
    category:handleItem
    
})

export default rootReducer