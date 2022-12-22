const initialState = {
    userDetail: null,
    loginResponse: Number,
    updatedDetail: null,
    responseMessage: '',
    refresh: Math.random(),
    toEditAddress: null,
    orders: [],
    orderTrack: {},
    wishlist: localStorage.getItem("wishlist") ?JSON.parse(localStorage.getItem("wishlist")):[],
    singleOrder: [],


};

export const handleUser = (state = initialState, { type, payload }) => {
    // //console.log(payload);
    switch (type) {
        case 'GET_USER_RESPONSE':
            return {
                ...state, userDetail: payload.data.user_details
                , responseMessage: payload.message, loginResponse: payload.success, refresh: Math.random()
            }

        case 'GET_USER_DETAIL':
            return { ...state, userDetail: payload }

        case 'UPDATE_USER_ADDRESS_OR_WISHLIST':
            return { ...state, userDetail: payload }

        case 'USER_SIGNOUT': {
            localStorage.removeItem('myuser')
            localStorage.removeItem('cart')
            return {
                userDetail: null
                , responseMessage: '', loginResponse: payload, refresh: Math.random(),wishlist: JSON.parse(localStorage.getItem("wishlist"))
            }
        }
        case 'EDIT_USER_ADDRESS':
            return { ...state, toEditAddress: payload }

        case 'GET_USER_ORDERS':
            return { ...state, orders: payload }

        case 'REMOVE_WISHLIST':
            return { ...state, userDetail: payload }


        case 'TRACK_YOUR_ORDER':
            return { ...state, orderTrack: payload }

        case 'ADDWLIST':{
            localStorage.setItem("wishlist", JSON.stringify(payload))
            return { ...state,  wishlist:payload }
        }
        case 'GET_SINGLE_ORDER':{
            return { ...state,  singleOrder:payload}
        }

        default: return state
    }
}

