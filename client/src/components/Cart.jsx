import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import CardGroup from 'react-bootstrap/CardGroup';
import Navbar from './Navbar';
import Button from 'react-bootstrap/Button';

const Cart = ({ isLoggedIn, setIsLoggedIn }) => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const products = state.cart;
  const [refrechstate, setRefrech] = useState(false)
  const [show, setShow] = useState(false);
  const refrech = () => {
    setRefrech(!refrechstate)
  }
  useEffect(() => {
    !state.user && navigate("/");
  }, [state.user, navigate]);

  const removeFromCart = (product) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: product,
    });
  };

  const updateQuantity = (product, action) => {
    if (action === 1 && product.quantity < 100) {
      product.quantity ++
    }
    if (action === 0 && product.quantity > 1) {
      product.quantity --
    }
   dispatch({
      type: 'UPDATE_QUANTITY',
      payload: product,
    });
    refrech() 
  };

  const calculatePrice = (price, quantity) => {
    return price * quantity
  }

  const confirmProduct  = (product) => {
    setShow(false)
  };

  return (
    <>
      <div style={{ backgroundColor: "#d3d0df" }}>
        <Navbar isLoggedIn={isLoggedIn} setIsloggedIn={setIsLoggedIn} />
        <div className="row"></div>
        <h3>Shopping cart</h3>
        <CardGroup>
          {products.map((product, index) => {
            return (
              <Card
                key={index}
                className="cartItem">
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>
                    <Link to={`/products/${product._id}`} className="card-title">
                      {product.title}
                    </Link>
                  </Card.Title>
                  <Card.Text>
                    {product.description}
                  </Card.Text>
                  <Card.Text>
                    Quantité:
                    <div className="input-group quantity-group">
                      <div className="input-group-btn" onClick={(e) => updateQuantity(product, 0)}>
                        <button type="button" className="btn btn-default btn-number" data-type="minus" data-field="quantity">
                          <span className="glyphicon glyphicon-minus"></span>
                        </button>
                      </div>
                      <div>{product.quantity}</div>
                      <div className="input-group-btn" onClick={(e) => updateQuantity(product, 1)}>
                        <button type="button" className="btn btn-default btn-number" data-type="plus" data-field="quantity">
                          <span className="glyphicon glyphicon-plus"></span>
                        </button>
                      </div>
                    </div>
                  </Card.Text>
                  <Card.Text>
                    Prix unitaire: {product.price}DT
                  </Card.Text>
                  <Card.Text>
                    Prix total: {calculatePrice(product.price, product.quantity)}DT
                  </Card.Text>
                  <Card.Footer>
                    <div>
                      <button
                        className="btn btn-primary mb-2"
                        onClick={() => setShow(true)}>
                          Confirm
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromCart(product)}>
                        Remove from cart
                      </button>
                    </div>
                  </Card.Footer>
                </Card.Body>
              </Card>
            )
          })}
        </CardGroup>
        {show ? (
            <Alert variant="info" onClose={() => setShow(false)} >
               <Alert.Heading>Confirm Order</Alert.Heading>
                <p>
                 Are you sure to confirm the order?
                </p>
                <div className="d-flex justify-content-end">
                  <Button onClick={() => confirmProduct(false)} variant="outline-success">
                   Confirm
                  </Button>
                </div>
            </Alert> )
           : (
            <>
            </>
          )}
      </div>
    </>
  );
};

export default Cart;
