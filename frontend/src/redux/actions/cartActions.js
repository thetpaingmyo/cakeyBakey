import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REDUCE_ITEM,
  CART_REMOVE_ITEM,
} from '../constants/cartConstants'

export const addToCart = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/cakes/${id}`)
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      cake: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      qty: 1
    }
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const reduceFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REDUCE_ITEM,
    payload: id
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}