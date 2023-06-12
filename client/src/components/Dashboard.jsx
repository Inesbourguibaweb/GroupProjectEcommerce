import React, { useContext, useEffect, useState } from 'react';
import AddProduct from './AddProduct';
import DisplayProducts from './DisplayProducts';
import Navbar from './Navbar';
import { UserContext } from '../context/UserContextProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = ({ isLoggedIn, setIsLoggedIn }) => {
  //Lift States using useContext
  const { state } = useContext(UserContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('from dashboard', state);
    state.user && navigate('/products');

  }, [state.user]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/products', { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addProduct = (Product) => {
    setProducts([...products, Product]);
  };

  return (
    <div style={{ backgroundColor: "#d3d0df" }}>
      <Navbar isLoggedIn={isLoggedIn} setIsloggedIn={setIsLoggedIn} />
      <div className="row">
        <DisplayProducts products={products} setProducts={setProducts} />
      </div>
    </div>
  );
};

export default Dashboard;
