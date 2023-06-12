import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContextProvider";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

const DisplayProducts = (props) => {
  const { products, setProducts } = props;
  const { state } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    !state.user && navigate("/");
  }, [state.user, navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // Function can user like a product
  const addToFavorites = (productId) => {
    axios
      .put(`http://localhost:8000/api/products/${productId}/favorite`, null, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setProducts((prevproducts) => {
          return prevproducts.map((product) => {
            if (product._id === productId) {
              return {
                ...product,
                likedBy: [...product.likedBy, state.user.firstName],
              };
            }
            return product;
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h3>All products</h3>
      <CardGroup>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              style={{ width: '18rem' }}
            >
              <Card.Img variant="top" src={product.image}/>
              <Card.Body>
              <Card.Title>
                <Link to={`/products/${product._id}`} className="card-title">
                  {product.title}
                </Link>
              </Card.Title>
              <Card.Text>
                {product.description}
              </Card.Text>
              
              {state.user && (
                <div>
                  {!product.likedBy.includes(state.user.firstName) ? (
                    <button
                      className="btn btn-info"
                      onClick={() => addToFavorites(product._id)}
                    >
                      Buy
                    </button>
                    
                    
                  ) : (
                    <p>this one is one of your favorites.</p>
                  )}
                </div>
              )}
              <Card.Footer>
                <small className="text-muted">added by {product.addedBy}</small>
              </Card.Footer>
              </Card.Body>
            </Card>
          )
        })}
      </CardGroup>
    </>
  );
};

export default DisplayProducts;
