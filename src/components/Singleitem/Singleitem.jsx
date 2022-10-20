import React from 'react'
import {useParams} from "react-router-dom"
import  axios from 'axios';
import { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';





export default function Singleitem() {
  
  
let {productId} = useParams();
let [productDetails , setProductDetails] = useState({})

  async function getProductDetails(productId){
    let response = await axios.get("https://dummyjson.com/products/"+productId);
    setProductDetails(response.data);
  }

  useEffect(() => {
    getProductDetails(productId);
  }, [productId])
  

   
  
  
  
    return ( 
        
        <>
    <div className="singleitem">
        <div className="container">
            <div className="row gx">
            { Object.keys(productDetails).length > 0 ? <>
              <div className="col-md-6">
                    <div className="product-img h-50 text-center">
                    <Carousel   showIndicators={false} showThumbs={true}  showStatus={false} infiniteLoop={true}>
                      {productDetails.images.length > 0 ? productDetails.images.map( (image , index)=>{
                        return <React.Fragment key={index}>
                          <div>
                          <img className="w-100 h-100" src={image} alt="" />
                        </div>
                        </React.Fragment>
                      }) :<div className='loading-container'><div className="lds-ripple"><div></div><div></div></div></div> }
                    </Carousel>
                    
                    </div>
              </div>
                <div className="col-md-6">
                  <div className="product-info">
                     <h3>{productDetails.title}</h3>
                    <h4>{productDetails.tagline}</h4>
                    <p className='text-capitalize product-details'>{(productDetails.description)} </p>
                    <p className='text-capitalize product-details'>Price : ${(productDetails.price)} </p>
                    <p className='text-capitalize product-details'>rating : {(productDetails.rating)} </p>
                    <p className='text-capitalize product-details mb-4'>stock : {(productDetails.stock)} </p>
                    <p className='text-capitalize product-details mb-4'>brand : {(productDetails.brand)} </p>
                    <p className='product-details'>category : {(productDetails.category)}</p>
                  </div>
                    
                </div> </> : <div className='loading-container'><div className="lds-ripple"><div></div><div></div></div></div>   }
               
        </div>
    </div>
    </div>
    </>
  )
}
