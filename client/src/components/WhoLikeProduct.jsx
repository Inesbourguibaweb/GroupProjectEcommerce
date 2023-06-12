import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';

const WhoLikeProduct = () => {
  const { id } = useParams();
  const [productInfo, setproductInfo] = useState([]);
  const { state } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    !state.user && navigate('/'); // Redirect to homepage if user is not logged in
  }, [state.user, navigate]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/${id}`, { withCredentials: true })
      .then((res) => {
        setproductInfo(res.data.likedBy);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const toggleFavorite = () => {
    if (isproductFavorited) {
      unfavoriteProduct();
    } else {
      favoriteProduct();
    }
  };
// Function can user like a product
  const favoriteProduct = () => {
    axios
      .put(`http://localhost:8000/api/products/${id}/favorite`, {}, { withCredentials: true })
      .then((res) => {
        setproductInfo([...productInfo, state.user.firstName]);
      })
      .catch((err) => console.log(err));
  };
// Function can user dislike a product
  const unfavoriteProduct = () => {
    axios
      .put(`http://localhost:8000/api/products/${id}/unfavorite`, {}, { withCredentials: true })
      .then((res) => {
        const updatedLikedBy = productInfo.filter((user) => user !== state.user.firstName);
        setproductInfo(updatedLikedBy);
      })
      .catch((err) => console.log(err));
  };

  // To verrify if the user is the one who uploaded the product
  const isUserUploader = state.user && productInfo[0] && productInfo[0].addedBy === state.user.firstName;
   // To verrify if the user likes the product
  const isproductFavorited = productInfo.some((user) => user === state.user.firstName);

  return (
    <div className="col-md-5">
      <div className="card">
        <div className="card-body">
      <h3>Users Who Like This product</h3>
      
      {isUserUploader ? (
        <div>
          <p>You are the one who uploaded this product.</p>
          {isproductFavorited && (
            <button className="btn btn-info" onClick={toggleFavorite}>
              Unfavorite
            </button>
          )}
        </div>
      ) : (
        state.user && (
          <ul className="list-group">
            {productInfo.map((user, id) => (
              <li key={id} className="list-group-item">{user}</li>
              
            ))}
            <button className="btn btn-info" onClick={toggleFavorite}>
              {isproductFavorited ? 'Unfavorite' : 'Favorite'}
            </button>
          </ul>
        )
      )}
      </div>
      </div>
    </div>
  );
};

export default WhoLikeProduct;
