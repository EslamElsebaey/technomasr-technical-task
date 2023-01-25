/* eslint-disable jsx-a11y/anchor-is-valid */
import React  from 'react'
import {Link , useNavigate} from "react-router-dom"





export default function Navbar({isLogin , setIsLogin }) {
 

  let navigation = useNavigate()
 
  function logOut(){
  localStorage.removeItem("newUser");
  localStorage.removeItem("choice");
  setIsLogin(null)
  navigation("/login");
 }



 
 
  return (
    <>
    <nav className="navbar   navbar-expand-lg  ">
      <div className="container">
        <div className="logoinfo d-flex align-items-center justify-content-center">
            <Link className="navbar-brand text-capitalize" to="home">
            <i className="fa-solid fa-cart-shopping  logo me-2"></i>
            </Link>
        </div>
      
        <button    className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"><i className="fa-solid fa-bars"></i></span>
      </button>
        <div   className="collapse navbar-collapse" id="navbarSupportedContent">
        {isLogin === null ? "" :   <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link homelink "   aria-current="page"  to="/home" >home</Link>
            </li>
          </ul>}
        
          <ul className="navbar-nav ms-auto  ">
          {isLogin ? <> 
              <li className="nav-item ">
               
               <a onClick={logOut} className="nav-link logout">logout</a>
              </li>
               </> 
             :  <><li className="nav-item">
              <Link className="nav-link" to="login">login</Link>
            </li>
            <li className="nav-item">
               <Link className="nav-link" to="register">register</Link>
            </li></>}
          </ul>
        </div>
      </div>
    </nav>

    </>
  )
}
