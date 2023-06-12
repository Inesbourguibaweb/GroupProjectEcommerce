import React,{ useContext, useEffect } from 'react'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import { UserContext } from '../context/UserContextProvider'
import { useNavigate } from 'react-router-dom'
import NavBarEcommerce from './NavBarEcommerce'
import Carroussel from './Carroussel'

const LogRegister = (props) => {
  const { state } = useContext(UserContext);
  const navigate = useNavigate();
  const {isLoggedIn, setIsloggedIn}=props;

  useEffect(()=>{
    console.log("from logRegister",state);
    state.user && navigate("/products")
},[state.user, navigate])

  return (
    <div >
        <NavBarEcommerce />
      <div className='row column-gap-3' >
          {/* <RegisterForm isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn} />
          <LoginForm  isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn} /> */}
          <Carroussel />
      </div>
    </div>
  )
}

export default LogRegister