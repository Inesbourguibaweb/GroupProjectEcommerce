import React, { useContext, useEffect } from 'react';
import UpdateProduct from './UpdateProduct';
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


  return (
    <div >
      <Navbar />
      <UpdateProduct />
    </div>
  );
};

export default ProductDetail;