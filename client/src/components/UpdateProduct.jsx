import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';

const UpdateProduct = () => {
  const { id } = useParams();
  const { state } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [productInfo, setProductInfo] = useState({
    title: '',
    description: ''
  });
  const [errors, setErrors] = useState({}); // State to store validation errors

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/products', { withCredentials: true })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, navigate]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/${id}`, { withCredentials: true })
      .then((res) => {
        setProductInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, [id, navigate]);

  const changeHandler = (e) => {
    setProductInfo({
      ...productInfo,
      [e.target.name]: e.target.value
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: undefined,
    }));
  };
// Function to validate inputs
  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (productInfo.title.trim() === '') {
      errors.title = 'Title is required';
      isValid = false;
    } else if (productInfo.title.length < 3) {
      errors.title = 'Title must be at least 3 characters';
      isValid = false;
    }

    if (productInfo.description.trim() === '') {
      errors.description = 'Description is required';
      isValid = false;
    } else if (productInfo.description.length < 5) {
      errors.description = 'Description must be at least 5 characters';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };
// Function user can  update the title and the description of a product
  const updateproduct = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    axios
      .put(`http://localhost:8000/api/products/${id}`, productInfo, { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.errors) {
          setErrors(err.response.data.errors);
        } else {
          setErrors({ server: 'An error occurred. Please try again later.' });
        }
      });
  };
// Function can user delete a product
  const deleteproduct = (productId) => {
    axios
      .delete(`http://localhost:8000/api/products/${productId}`, { withCredentials: true })
      .then((res) => {
        setProductInfo((prevproducts) => prevproducts.filter((product) => product._id !== productId));
        navigate('/products');
      })
      .catch((err) => console.log(err));
  };

  const formatDate = (timestamp) => {
    const options = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true 
    };
    return new Date(timestamp).toLocaleString('en-US', options);
  };

  const isUserUploader = state.user?.firstName === productInfo.addedBy; // To verify if the user is the one who added the product

  return (
    <div className=" d-flex" 
    style={{flexDirection: 'column', justifyContent:'center', alignItems:'center', backgroundColor:'#eceaef'}}>
      <img className="col-4" src={productInfo.image} style={{width:'200px', height:'200px', borderRadius: "1rem"}}/> 
        <div className="card-body">
          {isUserUploader ? (
            <form onSubmit={updateproduct} style={{width:'300px'}} >
              <div>
                <label className="text-start">Title</label>
                <br />
                <input className="form-control" type="text" name="title" value={productInfo.title} onChange={changeHandler} />
                {errors.title && (
                  <p className="text-danger">{errors.title}</p>
                )}
              </div>
              <div>
                <label className="text-start">Description</label>
                <br />
                <textarea className="form-control" type="text" name="description" value={productInfo.description} onChange={changeHandler} />
                {errors.description && (
                  <p className="text-danger">{errors.description}</p>
                )}
              </div>
              <div>
                <label className="text-start">Price</label>
                <input className="form-control" type="number" name="price" value={productInfo.price}
                 onChange={changeHandler} />
                {errors.price && (
                  <p className="text-danger">{errors.price}</p>
                )}
              </div>
              <button type="submit" className="btn btn-warning">Update</button>
              <button className="btn btn-danger" style={{ marginLeft: "15px" }} onClick={() => deleteproduct(id)}>
                Delete
              </button>
            </form>
          ) : (
            <>
              <h1 className="card-title">{productInfo.title}</h1>
              <p className="text-start"><strong>Description: </strong> {productInfo.description}</p>
              <p className="text-start">
                  <strong>Price:</strong> {productInfo.price}
              </p>
              <p className="text-start">Added by: {productInfo.addedBy}</p>
              <p className="text-start">Added on: {formatDate(productInfo.createdAt)}</p>
            </>
          )}
        </div>
      </div>
  );
};

export default UpdateProduct;
