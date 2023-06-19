import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContextProvider';
import {FaBars, FaTimes } from 'react-icons/fa'
import { Link } from "react-router-dom";
import { useRef } from "react";
import "../Styles/main.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MdAddShoppingCart } from "react-icons/md";

const Navbar = ({ setIsLoggedIn }) => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const cart = state.cart;
  const navRef = useRef();
    const showNabar = () => {
        navRef.current.classList.toggle("responsive_nav")
    }

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/', { withCredentials: true });
        const user = response.data;
        dispatch({
          type: 'SET_USER',
          payload: user
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (!state.user) {
      checkUser();
    }
  }, [state.user, dispatch]);

  // Function to let the user logout
  const logout = () => {
    axios
      .post('http://localhost:8000/api/users/logout', {}, { withCredentials: true })
      .then(res => {
        console.log("logout", res);
        dispatch({
          type: "LOGOUT_USER",
          payload: null
        });
        setIsLoggedIn(false);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <header>
        <Link style={{textDecoration:'none', color:'#007580'}} to={'/'} ><h1  >Logo</h1></Link> 
            <h3>
            Welcome, {state.user && state.user.firstName}!
            </h3>
            <nav ref={navRef} 
            style={{ maxHeight: '100px', display:'flex'}}>
                <button className="nav-btn nav-close-btn" onClick={showNabar} >
                    <FaTimes/>
                </button>
            </nav>
            <button className="nav-btn" onClick={showNabar}>
                <FaBars />
            </button>
            <div style={{ display:'flex'}}>
            <Form.Control type='search' placeholder="Search"/>
            <Button variant="outline-success">Search</Button>
            </div>
            <Link to='/products/addproduct'><button className="nav-btn-sell"  >Sell a product</button> </Link>
            <Link to={'/products/cart'} ><button className="nav-btn-cart" onClick={showNabar} >
                <MdAddShoppingCart />
                {cart.length > 0 && (
                <div className="badge">
                  {cart.length}
                </div>
              )}
            </button>
            </Link> 
            <button className="nav-btn-login" onClick={logout}> Logout</button>
        </header>
    </>
      
  );
};
export default Navbar;
