import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContextProvider";
import NavBarEcommerce from "./NavBarEcommerce";

const RegisterForm = ({ setIsLoggedIn }) => {

  const { state,dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(state);
    state.user && navigate('/products');
  }, [state.user, navigate]);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const changeHandler = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  // Validations of inputs
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate firstName
    if (!userInfo.firstName.trim()) {
      newErrors.firstName = "First Name is required";
      isValid = false;
    } else if (userInfo.firstName.length < 2) {
      newErrors.firstName = "First Name must be greater than 2 characters";
      isValid = false;
    }

    // Validate lastName
    if (!userInfo.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    } else if (userInfo.lastName.length < 2) {
      newErrors.lastName = "Last Name must be greater than 2 characters";
      isValid = false;
    }

    // Validate email
    if (!userInfo.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Validate password
    if (!userInfo.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (userInfo.password.length < 8) {
      newErrors.password = "Password should be at least 8 characters long";
      isValid = false;
    }

    // Validate confirmPassword
    if (!userInfo.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (userInfo.password !== userInfo.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  // Function to submit registration inputs
  const submitHandler = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post("http://localhost:8000/api/users/register", userInfo, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          dispatch({
            type: "SET_USER",
            payload: res.data.user,
          });
          setIsLoggedIn(true);
          navigate("/products");
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            setErrors({ serverError: err.response.data });
          } else {
            setErrors({ serverError: "An error occurred" });
          }
        });
    }
  };

  return (
    <>
      <NavBarEcommerce />
      <section
        className="h-80"
        style={{ backgroundColor: "#d3d0df" }}
      >
        <div className="container py-1 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div
              className="col col-xl-8 h-100"
              style={{ borderRadius: "1rem", height: "500px" }}
            >
              <div
                className="card"
                style={{ borderRadius: "1rem", height: "500px" }}
              >
                <div
                  className="row g-0 h-100"
                  // style={{height:'500px'}}
                >
                  <div className="col-md-6 col-lg-7 d-none d-md-block h-100">
                    <img
                      src="https://images.pexels.com/photos/5632382/pexels-photo-5632382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="login form"
                      className="img-thumbnail h-100 col-lg-12"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-5 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <h1 style={{ color: "#007580" }}>Logo</h1>
                      <form onSubmit={submitHandler}>
                        <h3 className="text-center">Register</h3>
                        <div className="form-group">
                          <label className="form-label">First Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={userInfo.firstName}
                            onChange={changeHandler}
                          />
                          {errors.firstName && (
                            <p className="text-danger">{errors.firstName}</p>
                          )}
                        </div>
                        <div className="form-group">
                          <label className="form-label">Last Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={userInfo.lastName}
                            onChange={changeHandler}
                          />
                          {errors.lastName && (
                            <p className="text-danger">{errors.lastName}</p>
                          )}
                        </div>
                        <div className="form-group">
                          <label className="form-label">Email:</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={userInfo.email}
                            onChange={changeHandler}
                          />
                          {errors.email && (
                            <p className="text-danger">{errors.email}</p>
                          )}
                        </div>
                        <div className="form-group">
                          <label className="form-label">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={userInfo.password}
                            onChange={changeHandler}
                          />
                          {errors.password && (
                            <p className="text-danger">{errors.password}</p>
                          )}
                        </div>
                        <div className="form-group">
                          <label className="form-label">Confirm Password</label>
                          <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            value={userInfo.confirmPassword}
                            onChange={changeHandler}
                          />
                          {errors.confirmPassword && (
                            <p className="text-danger">
                              {errors.confirmPassword}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          {errors.serverError && (
                            <p className="text-danger">{errors.serverError.message}</p>
                          )}
                          <div className="pt-1 mb-4">
                            <button className="btn btn-dark btn-lg btn-block" type="submit">Rgister</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterForm;
