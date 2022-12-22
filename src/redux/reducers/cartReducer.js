import {API} from "../../backend";
const initialState = {
    cart: [],
    quotation:[]
};
if (localStorage.getItem('cart')) {
    initialState.cart = JSON.parse(localStorage.getItem('cart'));
}
else {
    initialState.cart = [];
}


const handleCart = (state = initialState, action) => {
    
    switch (action.type) {
        case 'ADD_PRODUCT':{
            if(action.payload.length!==0)
            localStorage.setItem('cart', JSON.stringify([...action.payload]));    
            
            return {
                    cart: [...action.payload]
                }
            }
        case 'DELETE_PRODUCT':
            
            localStorage.setItem('cart', JSON.stringify([...action.payload]));   

            return {...state,

                cart: [...action.payload]
            }
        case 'INCREASE_QUANTITY':
            return {...state,
                cart: [...action.payload]
            }
        case 'DECREASE_QUANTITY':
            return {...state,
                cart: [...action.payload]
            }
        case 'EMPTY_CART':
            localStorage.setItem('cart', JSON.stringify([])); 
            return {...state,
                cart:[]
            }
        case "UPDATE_CART_BACKEND":
            return {...state,
                cart:[...action.payload]
            }
        case "QUOTATION_HISTORY":
            return {...state,
                quotation:[...action.payload]
            }

        default: return state
    }
}



export default handleCart;