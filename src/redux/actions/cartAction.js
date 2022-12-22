import { API } from "../../backend";
import { useSelector } from "react-redux";

export const addProduct = (data) => async dispatch => {
    const myuser = JSON.parse(localStorage.getItem('myuser'))
    // let cart= localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[]
    console.log(data, "qudsduffy")
    if (myuser) {
        let cart = []
        const cartResponse = await fetch(`${API}auth/get_user_details_by_id`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": `${myuser.token}`
            },
        })
        const responseData = await cartResponse.json();
        if (cartResponse.status === 200) {

            // console.log(responseData)
            cart = responseData.data[0].cart;
            // cart = cart.concat(responseData.data[0].cart)
            // console.log(cart,"-------------------------");


            let duplicate;
            if (data) {
                duplicate = cart.filter((elem) => {
                    return elem._id === data._id
                });
            }
            // console.log(duplicate)
            if (duplicate.length === 0) {
                //add to backend 
                // console.log(data,"in cart") 
                let cartObject = {
                    // "poster_obj_id": data._id,
                    "material_obj_id": data.configuration._id,
                    "quantity": data.quantity,
                    "removeCart": data.removeCart ? data.removeCart : false
                }
                if(data._id){

                    cartObject.poster_obj_id=data._id
                }
                if(data.pageId){
                cartObject.pageId=data.pageId
                }

                //console.log(data,"in cartobject") 
                const response = await fetch(`${API}auth/update_user_cart`, {
                    method: "POST",
                    body: JSON.stringify(cartObject),
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": `${myuser.token}`
                    },
                });
                if (response.status === 200) {
                    //const cartResponse = await response.json();
                    // //console.log(cartResponse);
                    cart.push(data);
                }

                ////////////
                const cartResponse2 = await fetch(`${API}auth/get_user_details_by_id`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": `${myuser.token}`
                    },
                })
                const responseData2 = await cartResponse2.json();
                if (cartResponse2.status === 200) {


                    const cart2 = responseData2.data[0].cart;
                    // console.log(cart2,"======")
                    dispatch({
                        type: "ADD_PRODUCT",
                        payload: cart2
                    });
                }

                ////////////
            }
        }
    }
    else {
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        // console.log
        if (cart && cart[0] === null) {
            cart = [];
        }
        const duplicate = cart.filter((elem) => {
            return elem._id === data._id
        });
        if (duplicate.length === 0) {
            console.log("qazxsw")
            let cartEle = {
                materialDimension: { _id: data.materialDimension._id },
                poster_details: { imgUrl: data.imgUrl, _id: data._id, },
                _id: data._id,
                quantity: data.price,
                total: data.price * data.quantity,
                ...data

            }


            cart.push(cartEle);



            dispatch({
                type: "ADD_PRODUCT",
                payload: cart
            });
        }
    }

}


export const deleteProduct = (id) => {
    return async (dispatch) => {
   const myuser = JSON.parse(localStorage.getItem('myuser'))
  if(myuser){
        const cartObject = {
            "poster_obj_id": id,
            "removeCart": true
        }
        const myuser = JSON.parse(localStorage.getItem('myuser'))
        const response = await fetch(`${API}auth/update_user_cart`, {
            method: "POST",
            body: JSON.stringify(cartObject),
            headers: {
                "Content-Type": "application/json",
                "x-access-token": `${myuser.token}`
            },
        });
        let datares = await response.json();
        //console.log(datares,"[[[[[[[[[[[[[[[[[[[");
        if (response.status === 200) {
            let cartbackend = [];
            const cartResponse = await fetch(`${API}auth/get_user_details_by_id`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": `${myuser.token}`
                },
            })
            const responseData = await cartResponse.json();
            if (cartResponse.status === 200) {
                cartbackend = responseData.data[0].cart;
                //console.log(cartbackend,"cartbackend");
                dispatch({
                    type: 'DELETE_PRODUCT',
                    payload: cartbackend
                })
            }
            if (cartResponse.status === 410) {
                dispatch({
                    type: 'DELETE_PRODUCT',
                    payload: cartbackend
                })
            }
        }
    }
    else{
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        console.log(cart)
        let delcart = cart.filter((i) => {
            return i._id != id
        })
        console.log(delcart)
        dispatch({
            type: "DELETE_PRODUCT",
            payload: delcart
        });
    }
}
    //}

};


export const increaseQuantity = (data) => {
    return async (dispatch) => {

        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

        cart.forEach(element => {
            if (data._id == element._id) {
                element.quantity = data.quantity
                element.total = element.quantity * element.originalPrice
            }
        });
        dispatch({
            type: "ADD_PRODUCT",
            payload: cart
        });

    }
};


export const decreaseQuantity = (data) => {
    return async (dispatch) => {

        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        if (data.removeCart) {
            let delcart = cart.filter((i) => {
                return i._id != data._id
            })
            dispatch({
                type: "ADD_PRODUCT",
                payload: delcart
            });
        } else {
            cart.forEach(element => {
                if (data._id == element._id) {
                    element.quantity = data.quantity
                    element.total = element.quantity * element.originalPrice

                }
            });
            dispatch({
                type: "ADD_PRODUCT",
                payload: cart
            });
        }
    }
};

export const deleteCartItem = (data) => {
    return async (dispatch) => {

        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
      
            let delcart = cart.filter((i) => {
                return i._id != data
            })
            dispatch({
                type: "ADD_PRODUCT",
                payload: delcart
            });
        }
};

export const getQuote = () => {
    return async (dispatch) => {
        const myuser = JSON.parse(localStorage.getItem('myuser'))
        const response = await fetch(`${API}quotes/get_quotation`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": `${myuser.token}`
            },
        });
        const data = await response.json();
        //console.log(data);
    }
}

export const getQuotationHistory = () => {
    return async (dispatch) => {
        const myuser = JSON.parse(localStorage.getItem('myuser'))
        const response = await fetch(`${API}quotes/quotation_history`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": `${myuser.token}`
            },
        });
        if (response.status === 200) {
            const quotation = await response.json();
            //console.log(quotation,"--------------------");
            dispatch({
                type: "QUOTATION_HISTORY",
                payload: quotation.data
            });
        }
    }

}

export const cartEmpty = () => {
    return async (dispatch) => {
     
            dispatch({
                type: "EMPTY_CART",
                payload:[]
            });
        }
    }