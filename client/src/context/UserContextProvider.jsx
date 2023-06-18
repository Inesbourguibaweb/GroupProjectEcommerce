import { createContext, useReducer } from "react";
import axios from "axios";

const UserContext = createContext();
const persistedCart = localStorage.getItem("cart") && localStorage.getItem("cart") !== 'undefined' ? JSON.parse(localStorage.getItem("cart")) : []
const initialState = {user:null, cart: persistedCart}

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload
            }
        case "NULL_USER":
            return {
                ...state,
                user:null
        }
        case "LOGOUT_USER":
                axios.post('http://localhost:8000/api/users/logout', {}, { withCredentials: true })
                .then(res => {
                    localStorage.removeItem('cart')
                    return {
                        ...state,
                        user:null,
                        cart: []
                    }
                    
                })
                .catch((err) => {
                    console.log(err)
                    return {
                        ...state,
                    }
                })
                return{
                    ...state,
                        user:null
        }
        case "ADD_TO_CART":
            if (state.cart.length > 0) {
                const obj = state.cart.find(x => x._id === action.payload._id) 
                 // check if product already exists => increase quantity
                if (obj) {
                    obj.quantity ++
                } else {
                    state.cart.push({...action.payload, quantity: 1});  
                }
            } else {
                state.cart.push({...action.payload, quantity: 1});     
            }
            localStorage.setItem("cart", JSON.stringify(state.cart))
            return {
              ...state
            };
        case "UPDATE_QUANTITY":
            if (state.cart.length > 0) {
                const obj = state.cart.find(x => x._id === action.payload._id) 
                if (obj) {
                    obj.quantity = action.payload.quantity
                    localStorage.setItem("cart", JSON.stringify(state.cart))
                }
            }
            return {
                ...state
            };
        case "REMOVE_FROM_CART":
            if (state.cart.length > 0) {
                const pos = state.cart.findIndex(x => x._id === action.payload._id) 
                if (pos > -1) {
                    // remove product from the array state.cart
                    state.cart.splice(pos, 1)
                    localStorage.setItem("cart", JSON.stringify(state.cart))
                }
            }
            return {
              ...state
        };
        default:
            return state
    }
}

const UserContextProvider = ({children}) =>{

    const [state, dispatch]=useReducer(reducer,initialState)
    
    return(
        <UserContext.Provider value={{state,dispatch}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContextProvider, UserContext}