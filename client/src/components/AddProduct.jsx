import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContextProvider';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const AddProduct = () => {
  const { state } = useContext(UserContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    !state.user && navigate('/');
  }, [state.user, navigate]);

  const [productInfo, setProductInfo] = useState({
    title: '',
    description: '',
    image:'',
    category:'',
    price:''
  });
  const handlePress = () => {
   
    navigate('/products');
    };

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

  const [errors, setErrors] = useState({}); // State to store validation errors

  const changeHandler = (e) => {
    setProductInfo({
      ...productInfo,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/products/', productInfo, { withCredentials: true })
      .then((res) => {
        console.log(res);
        addProduct(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.errors) {
          setErrors(err.response.data.errors);
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div >
      <Navbar />
      <form onSubmit={submitHandler}>
        <h3 className="text-center">Add a New product</h3>
        <div className="form-group">
          <label className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={productInfo.title}
            onChange={changeHandler}
          />
          {errors.title && (
            <p className="text-danger">{errors.title.message}</p>
          )}
        </div>
        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea
            type="text"
            className="form-control"
            name="description"
            rows="3"
            value={productInfo.description}
            onChange={changeHandler}
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="form-group">
          <label className="form-label">Photo:</label>
          <input
            type="text"
            className="form-control"
            name="image"
            rows="3"
            value={productInfo.image}
            onChange={changeHandler}
          />
          {errors.description && (
            <p className="text-danger">{errors.image.message}</p>
          )}
        </div>
        <div className="form-group">
          <label className="form-label">Choose Category</label>
          <select name="category" >
            <option value="cosmetic">cosmetic</option>
            <option value="vehicle">vehicle</option>
            <option value="laptop">laptop</option>
            <option value="phone">phone</option>
            <option value="accessories">accessories</option>
            <option value="games">games</option>
          </select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>
        <div className="form-group">
          <label className="form-label">Price:</label>
          <input
            type="number"
            className="form-control"
            name="price"
            rows="3"
            value={productInfo.price}
            onChange={changeHandler}
          />
          {errors.description && (
            <p className="text-danger">{errors.price.message}</p>
          )}
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary mt-3">
            Add a product
          </button>
          <button type="submit" className="btn btn-warning mt-3" onClick={handlePress}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
