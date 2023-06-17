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
    // Function to cancel a product
    const cancelProduct = (productId) => {
      axios
        .delete(`http://localhost:8000/api/products/${productId}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          // Remove the canceled product from the products state
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== productId)
          );
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
              <Card.Img variant="top" src={product.image} style={{width:'200px', height:'200px'}}/>
              <Card.Body>
              <Card.Title>
                <Link to={`/products/${product._id}`} className="card-title">
                  {product.title}
                </Link>
              </Card.Title>
              <Card.Text>
                {product.description}
              </Card.Text>
              
              {state.user.firstName === product.addedBy && (
                      <div>
                        <button
                          className="btn btn-danger"
                          onClick={() => cancelProduct(product._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-primary"
                        >
                          Update
                        </button>
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
