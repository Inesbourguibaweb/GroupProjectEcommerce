import React from "react";
import {FaBars, FaTimes } from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import "../Styles/main.css";

const NavBarEcommerce = () => {
    const Navigate = useNavigate();
    const navRef = useRef();
    const showNabar = () => {
        navRef.current.classList.toggle("responsive_nav")
    }

  return (
    <div>
        <header>
            <h3>Logo</h3>
            <nav ref={navRef}>
                <Link to={'/'}>Home</Link>
                <Link to={'/about'}>About</Link>
                <Link to="/contactus">Contact us</Link>
                <button className="nav-btn nav-close-btn" onClick={showNabar} >
                    <FaTimes/>
                </button>
            </nav>
            <button className="nav-btn" onClick={showNabar}>
                <FaBars />
            </button>
            <Link to='/login'><button className="nav-btn-login" > SignUp|Login </button> </Link>
        </header>
    </div>
    );
};

export default NavBarEcommerce;
