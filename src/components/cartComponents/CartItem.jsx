import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { decreaseQuantity, deleteProduct, increaseQuantity } from '../../redux/actions/cartAction';
// import Electrical from './../../images/ELECTRICAL.jpg';
import { addProduct } from '../../redux/actions/cartAction';
import './cartitem.css';

const CartItem = ({productData})=> {
   console.log(productData,"product data====");
   let user = useSelector((state)=>state)
    const dispatch = useDispatch();
    const dimension_title = productData.materialDimension.dimension_title;
    const price = productData.total ;
    const quantity =productData.quantity;
    const imageURL =productData.poster_details?productData.poster_details.imgUrl[0] : productData.pageDetail?productData.pageDetail.imgUrl:"mmmmm"; 
    console.log(user)
    function incrementProductCount(){
        if(!localStorage.getItem('myuser')){
            dispatch(increaseQuantity({
                _id:productData.poster_details._id,
                configuration:{_id:productData.materialDimension._id},
                quantity:quantity+1,
            }))
        }
        else{
        dispatch(
            addProduct({
                _id:productData.poster_details._id,
                configuration:{_id:productData.materialDimension._id},
                quantity:quantity+1,
              
            })
          );
    }
}
    function decrementProductCount(){
        let action ={
            _id:productData.poster_details._id,
            configuration:{_id:productData.materialDimension._id},
            quantity:quantity-1,
            removeCart:false,
          
        }
        if(!localStorage.getItem('myuser')){
            if(action.quantity===0){
            dispatch(decreaseQuantity({
                ...action,removeCart:true
            }))
        }
        else{
            dispatch(decreaseQuantity(action)) 
        }
        }
        else{
        //console.log(action, "action")
        if(action.quantity===0){
            dispatch(addProduct({...action,removeCart:true}));
        }
        else{
        dispatch( 
            addProduct(action)
          );
        }
    }
    }

    
    const deleteItem = (id)=>{
      
            dispatch(deleteProduct(id))
        
    }
   // console.log(imageURL)
    return(
        <>
        
         <div className="cartItem">
            <div className="cartItemImg"><img src={imageURL} alt="Poster" /></div>
            <div className="cartItemDetail">
                <div className="ciName">{productData.name}</div>
                {/* <div className="ciMaterial">{productData.color === null ? "Material" : "Colour"}: <span>{productData.color === null ? productData.configuration.material_title : productData.color}</span> </div> */}
                <div className="ciDimension">Dimension: 
                <span>{dimension_title}</span> </div>
                <div className="ciPrice">Price: <span className="discountedPrice">₹{price}</span> <span className="realPrice">₹999</span> <span className="discountPercent">65% off</span> </div>
            </div>
            <div className="cartItemQty"><i className="fas fa-minus" onClick={decrementProductCount}></i><span className="ciQty">{quantity}</span><i className="fas fa-plus" onClick={incrementProductCount}></i></div>
            {/* <div className="cartItemTotal"> ₹ {productData.price}</div> */}
            <div className="removeCartItem" onClick={() => {deleteItem(productData._id)}}><i className="fas fa-times"></i></div>
         </div>
        </>
    )
};

export default CartItem;
