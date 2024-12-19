import {
  LOGIN,
  LOGOUT,
  CURRENT_USER,
  NOTIFICATIONS,
  CART,
  SHARE,
  UPDATE_PRODUCT_SHARED,
  BUY_ITEM,
  AUTHENTICATION_POP_UP
  } from '../actions/UserAction'

  const user_reducer = (state, action) => {
    // Login user
    if (action.type === LOGIN) {
      return { ...state, currentUser: action.payload, cart: action.payload.cart, notifications: action.payload.notifications }
    }

    // Logout user
    if (action.type === LOGOUT) {
      return { ...state, currentUser: {}, cart: [], notifications: [] }
    }

    // Current user
    if (action.type === CURRENT_USER) {
      return { ...state, currentUser: action.payload, cart: action.payload.cart, notifications: action.payload.notifications }
    }

     // Update Cart
     if (action.type === CART) {
      const {cart} = state

      const checkItem = cart.find(item => item._id === action.payload._id)
      let updatedCart = []
      if(checkItem){
        updatedCart = cart.filter(item => item._id !== action.payload._id)
      } else{
        updatedCart = [...cart,action.payload]
      }
      return { ...state, cart: updatedCart}
    }

    // Share Item
    if (action.type === SHARE) {
      return { ...state, shareItem: action.payload}
    }

    // Buy Item
    if (action.type === BUY_ITEM) {
      return { ...state, buyItem: action.payload}
    }

    // Get Notifications
    if (action.type === NOTIFICATIONS) {
      const {notifications} = state

      if(Array.isArray(action.payload)){
        let updatedNotif = notifications.filter(item => !action.payload.includes(item._id))
        return { ...state, notifications: updatedNotif }
      } else{
        const checkItem = notifications.find(item => item._id === action.payload)
        let updatedNotif = []
        if(checkItem){
          updatedNotif = notifications.filter(item => item._id !== action.payload)
          return { ...state, notifications: updatedNotif }
        } else {
          return { ...state, notifications: notifications }
        }
      }
    }

    // Update product shared number
    if (action.type === UPDATE_PRODUCT_SHARED) {
      return { ...state, updateShareProduct: action.payload}
    }

    // Update product shared number
    if (action.type === AUTHENTICATION_POP_UP) {
      return { ...state, authenticationPopUp: action.payload}
    }

    throw new Error(`No Matching "${action.type}" - action type`)
}

export default user_reducer