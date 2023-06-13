import React,{ useContext, useEffect } from 'react'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import { UserContext } from '../context/UserContextProvider'
import { useNavigate } from 'react-router-dom'
// import NavBarEcommerce from './NavBarEcommerce'
import Carroussel from './Carroussel'
import {FaBars, FaTimes } from 'react-icons/fa'
import { Link } from "react-router-dom";
import { useRef } from "react";
import "../Styles/main.css";

const LogRegister = (props) => {
  const { state } = useContext(UserContext);
  const navigate = useNavigate();
  const {isLoggedIn, setIsloggedIn}=props;

  const navRef = useRef();
    const showNabar = () => {
        navRef.current.classList.toggle("responsive_nav")
    }

  useEffect(()=>{
    console.log("from logRegister",state);
    state.user && navigate("/products")
},[state.user, navigate])

  return (
    <div >
        {/* -----------NavBar--------------- */}
        <header>
            <h3>Logo</h3>
            <nav ref={navRef}>
                <Link>Home</Link>
                <Link>About</Link>
                <Link>Contact us</Link>
                <button className="nav-btn nav-close-btn" onClick={showNabar} >
                    <FaTimes/>
                </button>
            </nav>
            <button className="nav-btn" onClick={showNabar}>
                <FaBars />
            </button>
            <Link to='/login'><button className="nav-btn-login" > SignUp|Login </button> </Link>
        </header>
      <div className='row column-gap-3' >
          <Carroussel />
      </div>
    </div>
  )
}

export default LogRegister