import React, { useContext, useEffect } from 'react';
import UpdateProduct from './UpdateProduct';
import axios from 'axios';
import { UserContext } from '../context/UserContextProvider';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';

const ProductDetail = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.user) {
      navigate('/');
    }
  }, [state.user, navigate]);

  const logout = async () => {
    try {
      await axios.post('http://localhost:8000/api/users/logout', { withCredentials: true });
      dispatch({ type: 'LOGOUT_USER' });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div >
      <Navbar />
      <div className="row">
        <UpdateProduct />
      </div>
    </div>
  );
};

export default ProductDetail;