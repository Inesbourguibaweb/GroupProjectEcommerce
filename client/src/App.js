import './App.css';
import { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import LogRegister from './components/LogRegister'
import NotFound from './components/NotFound'
import Dashboard from './components/Dashboard';
import ProductDetail from './components/ProductDetail';
import { UserContext } from './context/UserContextProvider'
import axios from 'axios';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import AddProduct from './components/AddProduct';
import ContactUs from './components/ContactUs';
import About from './components/About';
import Cart from './components/Cart';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  // To ensure that data are secure, the user should login to have access to routes
  useEffect(() => {
    axios.post('http://localhost:8000/api/users/isLoggedIn', {}, { withCredentials: true })
      .then((user) => {
        console.log(user.data);
        console.log("from app", state);
        dispatch({
          type: "SET_USER",
          payload: user.data
        })
        setIsLoggedIn(true)
      })
      .catch(err => {
        console.log(err)
        dispatch({ type: "NULL_USER" })
      })
  }, [])

  return (
    <div className="App">
        <Routes>
          {/* -----------1ere page  ----------*/}
          <Route path="/" element={<LogRegister isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} /> 
          {/* -----------Regiter Form  ----------*/}
          <Route path="/register" element={<RegisterForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          {/* -----------Login Form  ----------*/}
          <Route path="/login" element={<LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          {/* -----------Dashboard to display all products  ----------*/}
          <Route path="/products/" element={<Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
           {/* -----------Display  product detail  ----------*/}
          <Route path='/products/:id/' element={<ProductDetail isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          {/* -----------For pour ajouter un produit ----------*/}
          <Route path="/products/addproduct" element={<AddProduct isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          {/* -----------Contact us----------*/}
          <Route path='/contactus' element={ <ContactUs />  } />
          {/* -----------About us----------*/}
          <Route path='/about' element={ <About />  } />
          {/* -----------Cart----------*/}
          <Route path="/products/cart" element={<Cart isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          {/* -----------Erreur lorsque le user veut accéder à une page inexistente----------*/}
          <Route path='*' element={<NotFound />} />
        </Routes>
      
    </div>
  );
}

export default App;
