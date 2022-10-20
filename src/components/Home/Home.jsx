import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import $ from "jquery";



export default function Home({checkLogin}) {
  // define state for all products shown in the home page 
  let [products, setProducts] = useState([]);

  // function to get all products from the API 
  async function getAllProducts() {
    let { data } = await axios.get("https://dummyjson.com/products");
    data = await data.products ;  
    setProducts(data);
    checkLogin()
  }

// function to get particular category when we choose it from the menu 
  async function getParticularProduct(category) {
    let { data } = await axios.get("https://dummyjson.com/products/category/"+category);
   let productCategory = await data.products ; 
   setProducts(productCategory);
   checkLogin();
  }


  // this when we click any category from the menu
  let dropdown_item = document.querySelectorAll(".dropdown-item") ; 
  for(let i =0 ; i < dropdown_item.length ; i++){
    dropdown_item[i].addEventListener("click" , function(){
      if(dropdown_item[i].innerHTML.toLowerCase() === ("all products").toLowerCase()){
        getAllProducts();
        localStorage.setItem("choice" , dropdown_item[i].innerHTML.toLowerCase());
      }else{
        getParticularProduct(dropdown_item[i].innerHTML);
      localStorage.setItem("choice" , dropdown_item[i].innerHTML.toLowerCase());
      }
      
    })
  }


// check if we have products in localstorage or not 
  const [cartNumber, setCartNumber] = useState(0);
  let myProducts;
  let myCartNumber ;
  if (localStorage.getItem("myProducts") == null){
    myProducts = [];
  }else {
    myProducts = JSON.parse(localStorage.getItem("myProducts"));
    myCartNumber = myProducts.length ;
  }

  
  // function to add product to my shopping cart 
  function addProductToCart (product){
    myProducts = [...myProducts] ;
    myProducts.push(product);
    localStorage.setItem("myProducts" , JSON.stringify(myProducts));
     myCartNumber =  $(".items-number").html();
    myCartNumber = parseInt(myCartNumber);
    setCartNumber(myCartNumber+1) ;
  }


  

  useEffect(() => {
   if(localStorage.getItem("choice") !== null){
    if(localStorage.getItem("choice").toLowerCase() === ("all products").toLowerCase()){
      getAllProducts()
    }else{
      getParticularProduct(localStorage.getItem("choice").toLowerCase());
    }
   }else{
    getAllProducts();
   }
   if(localStorage.getItem("myProducts") !== null){
    setCartNumber(myProducts.length);
   }
    checkLogin()
  }, []);



  return (
    <>
   
      <div className="home">
        <div className="container">
          <div className="row mb-5 g-4">
            <div className="col-md-12">
              <div className="detailed-header">
              <div className="products-menus">
              <div className="dropdown">
                  <button className="btn text-capitalize dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    select product
                  </button>
                  <ul className="dropdown-menu">
                  <li><button className="dropdown-item " type="button">all products</button></li>
                    <li><button className="dropdown-item" type="button">smartphones</button></li>
                    <li><button className="dropdown-item" type="button">laptops</button></li>
                    <li><button className="dropdown-item" type="button">fragrances</button></li>
                    <li><button className="dropdown-item" type="button">skincare</button></li>
                    <li><button className="dropdown-item" type="button">groceries</button></li>
                    <li><button className="dropdown-item" type="button">home-decoration</button></li>
                    <li><button className="dropdown-item" type="button">furniture</button></li>
                    <li><button className="dropdown-item" type="button">tops</button></li>
                    <li><button className="dropdown-item" type="button">mens-shirts</button></li>
                    <li><button className="dropdown-item" type="button">mens-watches</button></li>
                    <li><button className="dropdown-item" type="button">mens-shoes</button></li>
                    <li><button className="dropdown-item" type="button">womens-shoes</button></li>
                    <li><button className="dropdown-item" type="button">womens-dresses</button></li>
                    <li><button className="dropdown-item" type="button">womens-shoes</button></li>
                    <li><button className="dropdown-item" type="button">womens-bags</button></li>
                    <li><button className="dropdown-item" type="button">womens-watches</button></li>
                    <li><button className="dropdown-item" type="button">womens-jewellery</button></li>
                    <li><button className="dropdown-item" type="button">sunglasses</button></li>
                    <li><button className="dropdown-item" type="button">automotive</button></li>
                    <li><button className="dropdown-item" type="button">motorcycle</button></li>
                    <li><button className="dropdown-item" type="button">lighting</button></li>
                  </ul>
              </div>
              </div>
              <div className="menus-details">
              <Link className="text-capitalize" to="/cart">
               <i className="fa-solid fa-cart-shopping  cart-logo me-2"></i>
               <div className="items-number">{cartNumber}</div>
              </Link>
              </div>
              </div>
             
            </div>
            {products.length > 0 ?  products.map((product ) => {
              return (
                <React.Fragment key={product.id}>
                  <div className="col-xl-3 col-lg-4 col-md-6"  >
                    <div className="product-item text-center d-flex flex-column justify-content-between  position-relative">
                      <Link  to={`/singleitem/${product.id}`}>
                      <img src={product.images[0]} alt=""/>
                      </Link>
                      <div className="product-desc">
                      <h5 className="text-center product-title">{product.title}</h5>
                      <p className="text-center product-price">Price : ${product.price}</p>
                      <div className="d-flex justify-content-between align-items-center">
                      <Link to={`/singleitem/${product.id}`}>
                      <button className=" showdetails-btn text-capitalize ">show details</button>
                      </Link>
                      <span onClick={ ()=>{addProductToCart(product)}} title="Add to Cart" className="add-to-cart"><i className="fa-solid fa-cart-plus"></i></span>

                      </div>
                    
                      </div>
                     
                      
                    </div>
                  </div>
                </React.Fragment>
              );
            })  : <div className="loading-container">
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </div>}
          </div>
        </div>
      </div>
    </>
  );
}
