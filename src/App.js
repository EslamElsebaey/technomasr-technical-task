import { Routes , Route  } from "react-router-dom"
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Cart from './components/Cart/Cart';
import Register from './components/Register/Register';
import Notfound from './components/Notfound/Notfound';
import Singleitem from './components/Singleitem/Singleitem';
import Protectedroute from './components/Protectedroute/Protectedroute';
import $ from "jquery";






function App() {

  const [isLogin , setIsLogin] =  useState(null)
 
 function checkLogin () {  
   let newUserData =  localStorage.getItem("newUser");
   setIsLogin(newUserData)
 }


 $(window).scroll( function(){
  if(window.scrollY > 450){
    $(".toTop").show(1000)
    $(".detailed-header").addClass("detailed-header-fixed")
  }else{
    $(".toTop").hide(1000) ; 
    $(".detailed-header").removeClass("detailed-header-fixed")
  }
 })



 $(".toTop").click(function(){
  $("html , body").animate({
    scrollTop : "0px"
  } , 1500)
 })



useEffect(  ()=>{
  let userData = localStorage.getItem("newUser");
  setIsLogin(userData);

 } , [])

 
 
 
  return (
    <>
   <div className="toTop"><i className="fa-solid arrowTop fa-angle-up"></i></div>
   <Navbar  isLogin={isLogin} setIsLogin={setIsLogin}  />
   <Routes>
   <Route path="/"  element={<Home checkLogin={checkLogin}/> } />
   <Route path="login"  element={  <Login checkLogin={checkLogin} />  } />
   <Route path="register"  element={   <Register/> } />
    <Route path="home"  element={  <Protectedroute>  <Home   checkLogin={checkLogin} /></Protectedroute> } />
    <Route path="singleitem/:productId"  element={ <Protectedroute><Singleitem/></Protectedroute>   } />
    <Route path="Cart"  element={ <Protectedroute>  <Cart  /></Protectedroute>   } />
    <Route path="*"  element={<Notfound/>} />
   </Routes>
    
    </>
  );
}

export default App;
