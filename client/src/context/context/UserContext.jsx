import React, { useContext, useReducer, useEffect } from 'react'
import reducer from '../reducers/UserReducer'
import {
  LOGIN,
  LOGOUT,
  CURRENT_USER,
  NOTIFICATIONS,
  LIKE,
  SAVE,
  SHARE,
  CART,
  UPDATE_PRODUCT_SHARED,
  BUY_ITEM,
  AUTHENTICATION_POP_UP
} from '../actions/UserAction'

const initialState = {
  // currentUser: JSON.parse(localStorage.getItem("currentUser")) || {},
    currentUser: {},
    cart: [],
    notifications: [],
    shareItem: {},
    buyItem: {},
    updateShareProduct: [],
    authenticationPopUp: '',
}

const UserContext = React.createContext()

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const login = (user) => {
    dispatch({ type: LOGIN, payload: user})
  }

  const logout = () => {
    dispatch({ type: LOGOUT})
  }

  const getCurrentUser = (user) => {
    dispatch({ type: CURRENT_USER, payload: user})
  }

  const getLike = ({item, id}) => {
    dispatch({ type: LIKE, payload: {item, id}})
  }

  const getSave= (user) => {
    dispatch({ type: CURRENT_USER, payload: user})
  }
  
  const getShareItem = (item) => {
    dispatch({ type: SHARE, payload: item})
  }

  const getBuyItem = (item) => {
    dispatch({ type: BUY_ITEM, payload: item})
  }

  const updateSharedItem = (item) => {
    dispatch({ type: UPDATE_PRODUCT_SHARED, payload: item})
  }

  const updateCart = (product) => {
    dispatch({ type: CART, payload: product})
  }

  const getNotification = (notifId) => {
    dispatch({ type: NOTIFICATIONS, payload: notifId})
  }

  const getAunthenticationPopUp= (text) => {
    dispatch({ type: AUTHENTICATION_POP_UP, payload: text})
  }



  // useEffect(() => {
  //   localStorage.setItem("currentUser", JSON.stringify(state.currentUser))
  // }, [state.currentUser])

  return (
    <UserContext.Provider
      value={{ ...state, login, logout, getCurrentUser, updateCart, 
        getShareItem, updateSharedItem, getNotification, getBuyItem, getAunthenticationPopUp}}
    >
      {children}
    </UserContext.Provider>
  )
}

// make sure use
export const UseUserContext = () => {
  return useContext(UserContext)
}

export default UseUserContext


