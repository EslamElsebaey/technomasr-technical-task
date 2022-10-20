import React from "react";
import { useEffect, useState } from "react";
import $ from "jquery";





export default function Cart() {
  // define cart items and total price for them 

  const [cartItems, setCartItems] = useState([]);
  const [myTotalPrice, setMyTotalPrice] = useState(0);
 

  // function to remove all items from the cart
function removeAllProducts (){
  localStorage.removeItem("myProducts") ;
  setCartItems([]); 
  $(".col-md-12").css( { 
    textAlign : "center" , 
    color : "red" , 
    fontWeight : "bold" , 
    fontSize : "30px",
  })
  setMyTotalPrice(0)
}

  
 useEffect(() => {
  let totalPrice ;
  if(localStorage.getItem("myProducts") === null) {
    $(".col-md-12").css( { 
      textAlign : "center" , 
      color : "red" , 
      fontWeight : "bold" , 
      fontSize : "30px",
    })
    $(".shopping-cart").css("overflow-y" , "hidden")
  }else {
    setCartItems (JSON.parse(localStorage.getItem("myProducts"))) ; 
    totalPrice = JSON.parse(localStorage.getItem("myProducts"));
    totalPrice =  totalPrice.map( (item) => item.price) ; 
    let initialValue = 0 ; 
    totalPrice =  totalPrice.reduce( (prev , next) => prev + next , initialValue) ; 
    setMyTotalPrice(totalPrice)
     
    
  }
  
 }, []);



  return (
    <>
      <div className="cart">
        <div className="container">
         <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="shopping-cart">
            <div className="Header">
              <h3 className="Heading">Shopping Cart</h3>
              <h3 className="totalitems text-capitalize">total items :  {cartItems.length}</h3>
              <h3 className="totalprice text-capitalize">total price : ${myTotalPrice}</h3>
              <h5 className="Action" onClick={removeAllProducts}>Remove all</h5>
            </div>
            <div className="items">
              <div className="row">
                <div className="col-md-12">
                 {cartItems.length > 0 ? cartItems.map(( cartItem ,index )=>{
                 
                  return (
                    <React.Fragment key={index}>
                        <div className="single-item-content">
                            <div className="item-img">
                            <img  src={cartItem.images[0]}  alt="img" />
                            </div>
                            <div className="description">
                              <h3>{cartItem.title}</h3>
                            </div>
                            <div className="price">${cartItem.price}</div>
                          </div>
                      </React.Fragment>
                  )
                 } )     :  <h2 className="fw-bold mt-5">Shopping Cart Is Empty</h2>}
                  
                 
                </div>
              </div>
            </div>
            </div>
          </div>
         </div>
        </div>
      
      </div>
    </>
  );
}
