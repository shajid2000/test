import axios from "axios";
import { API } from '../../backend';


// export const userInfo = (user) => async dispatch => {

//     //console.log(user)
//     const response = await fetch(`${API}auth/login`, {
//       method: "POST",
//       body: JSON.stringify(user),
//       headers: { "Content-Type": "application/json" },
//     });
//     const data = await response.json();
//     //console.log('action')
//     //console.log(data.data);
//     // const data1 = []
//     // data1.push(data)

//     //console.log("-----")
//     dispatch( {
//         type: "GET_USER_RESPONSE",
//         payload: data.data
//     });
//     };


export const userInfo = (user) => async (dispatch) => {
  // //console.log(user)
  const response = await fetch(`${API}auth/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  });
  if (response.status === 410) {
    //console.log("410")
    const datares = await response.json();
    dispatch({
      type: "GET_USER_RESPONSE",
      payload: datares
    })
  }
  if (response.status === 200) {
    const datares = await response.json();
    //console.log(datares,"+++++++");
    //check for cart too
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    console.log(cart);
    if (cart && cart[0] === null) {
      cart = [];
    }
    if (cart.length !== 0) {
      const updCart = async () => {
        for (let i = 0; i < cart.length; i++) {
          const cartObject = {
            "poster_obj_id": cart[i]._id,
            "material_obj_id": cart[i].configuration._id,
            "quantity": cart[i].quantity,
            "removeCart": false
          }
          console.log("carbln", cartObject)
          const response2 = await fetch(`${API}auth/update_user_cart`, {
            method: "POST",
            body: JSON.stringify(cartObject),
            headers: {
              "Content-Type": "application/json",
              "x-access-token": datares.data.session_token
            },
          });

        }
      }
      updCart().then(() => {
        // console.log("initial cart updated")
      }).catch((error) => {
        console.log("no initial cart up", error)
      })


    }
    let wishlist = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem("wishlist")) : []
    if (!Array.isArray(wishlist)) {
      wishlist = []
    }
    if (wishlist.length != 0) {
      for (let i = 0; i < wishlist.length; i++) {
        let d = {
          add: true,
          poster_obj_id: wishlist[i]._id
        }
        //console.log(d)
        const response = await fetch(`${API}auth/add_user_details`, {
          method: "POST",
          body: JSON.stringify(d),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": datares.data.session_token
          },
        });
        const data = await response.json();
        console.log(data, "updwishhhhhh");

        if (data.status === 200)
          dispatch({
            type: "UPDATE_USER_ADDRESS_OR_WISHLIST",
            payload: data.data
          })
        console.log("adding")
      }
    }

    const response3 = await fetch(`${API}auth/get_user_details_by_id`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": datares.data.session_token
      },
    });

    if (response3.status === 200) {
      const r = await response3.json();
      console.log(r.data, "{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{");
      dispatch({
        type: "UPDATE_CART_BACKEND",
        payload: r.data[0].cart
      })
      dispatch({
        type: "ADDWLIST",
        payload: r.data[0].wishList
      })
    }
    if (response3.status === 410) {
      dispatch({
        type: "EMPTY_CART"
      })
    }


    dispatch({
      type: "GET_USER_RESPONSE",
      payload: datares
    })


  }
}

export const userSignout = () => async (dispatch) => {

  dispatch({
    type: "EMPTY_CART"
  })
  dispatch({
    type: "USER_SIGNOUT",
  })
  dispatch({
    type: "ADDWLIST",
payload: []
  })

}


export const getUser = () => async (dispatch) => {
  // //console.log(user)
  const myuser = JSON.parse(localStorage.getItem('myuser'))
  //console.log("asdasda", myuser)
  const response = await fetch(`${API}auth/get_user_details_by_id`, {
    method: "GET",
    // body: JSON.stringify(email),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${myuser.token}`
    },
  });

  if (response.status === 200) {
    const data = await response.json();
    dispatch({
      type: "GET_USER_DETAIL",
      payload: data.data[0]
    })
    dispatch({
      type: "UPDATE_CART_BACKEND",
      payload: data.data[0].cart
    })
  }
  else {
    dispatch({ type: "USER_SIGNOUT" })
  }
}

export const updateUserAddressAndWishlist = (add, poster_obj_id, address, editAddress, addressID, address_pincode) => async (dispatch) => {
  const myuser = JSON.parse(localStorage.getItem('myuser'))
  let d = {
    add: add,
    address: address,
    poster_obj_id: poster_obj_id,
    editAddress: editAddress,
    addressID: addressID,
    address_pincode: address_pincode,
  }
  //console.log(d)
  const response = await fetch(`${API}auth/add_user_details`, {
    method: "POST",
    body: JSON.stringify(d),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${myuser.token}`
    },
  });
  const data = await response.json();
  console.log(data, "updwishhhhhh");

  if (data.status === 200)
    dispatch({
      type: "UPDATE_USER_ADDRESS_OR_WISHLIST",
      payload: data.data
    })
    // let w = JSON.parse(local)
    // dispatch({
    //   type: "ADDWLIST",
    //   payload: data.data.wishList
    // })

}

export const editUserAddress = (obj) => async (dispatch) => {

  // //console.log('action')
  // //console.log(obj);

  dispatch({
    type: "EDIT_USER_ADDRESS",
    payload: obj
  })

}

export const getUserOrders = () => async (dispatch) => {

  try {
    const myuser = JSON.parse(localStorage.getItem('myuser'))
    const response = await fetch(`${API}orders/g`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${myuser.token}`
      }
    })
    const data = await response.json();
    console.log("orders",data)

    if (data.status === 200) {
      dispatch({
        type: "GET_USER_ORDERS",
        payload: data.data
      })
    }
  } catch (error) {
    //console.log(error)
  }

}

export const removeWishList = (add, poster_obj_id) => async (dispatch) => {
  const myuser = JSON.parse(localStorage.getItem('myuser'))

  let d = {
    add: add,
    poster_obj_id: poster_obj_id,

  }
  //console.log(d)
  const response = await fetch(`${API}auth/add_user_details`, {
    method: "POST",
    body: JSON.stringify(d),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${myuser.token}`
    },
  });
  const data = await response.json();
  // //console.log("111",data);

  const response1 = await fetch(`${API}auth/get_user_details_by_id`, {
    method: "GET",
    // body: JSON.stringify(email),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${myuser.token}`
    },
  });
  const data1 = await response1.json();
  dispatch({
    type: "REMOVE_WISHLIST",
    payload: data1.data[0]
  })

}

export const trackYourOrder = (shipment_id) => async (dispatch) => {

  try {
    //  const myuser = JSON.parse(localStorage.getItem('myuser'))
    const response = await fetch(`${API}orders/TrackOrder?order_id=${shipment_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //  "x-access-token": `${myuser.token}`
      }
    })
    const data = await response.json();
    //console.log("orders",data.data)


    dispatch({
      type: "TRACK_YOUR_ORDER",
      payload: data.data
    })

  } catch (error) {
    //console.log(error)
  }

}

export const updateWishlistWithoutSignin = (data) => async (dispatch) => {
  // console.log(data,"user")

  dispatch({
    type: "ADDWLIST",
    payload: data
  })


}

export const singleOrder = (order_id) => async (dispatch) => {

  try {

    const response = await fetch(`${API}orders/singleOrder?order_id=${order_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
       
      }
    })
    const data = await response.json();
    console.log("orders",data.data)


    
    console.log(data.data[0].shippingDetails.shipment_id,"pppp")
    let a= 267391166
    // let a=data.data[0].shippingDetails.shipment_id
    const response1 = await fetch(`${API}orders/TrackOrder?order_id=${a}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //  "x-access-token": `${myuser.token}`
      }
    })
    const data1 = await response1.json();
      dispatch({
        type: "TRACK_YOUR_ORDER",
        payload: data1.data
      })
      dispatch({
        type: "GET_SINGLE_ORDER",
        payload: data.data
      })

  } catch (error) {
    //console.log(error)
  }

}