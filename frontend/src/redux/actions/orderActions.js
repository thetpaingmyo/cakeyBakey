import axios from 'axios'
import {
  ORDER_CREATE_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
} from '../constants/orderConstants'
import { 
  CART_CLEAR_ITEMS
} from '../constants/cartConstants'

export const createOrder = (order) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo }
  } = getState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }

  const { data } = await axios.post(`/api/orders`, order, config)

  dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })

  dispatch({
    type: CART_CLEAR_ITEMS,
  })

  localStorage.removeItem('cartItems')
}

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()
  
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  
    const { data } = await axios.get(`/api/orders`, config)
  
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

// export const listOrderDetails = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: ORDER_DETAILS_REQUEST })

//     const {
//       userLogin: { userInfo }
//     } = getState()
  
//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     }
  
//     const { data } = await axios.get(`/api/orders/${id}`, config)
  
//     dispatch({
//       type: ORDER_DETAILS_SUCCESS,
//       payload: data
//     })
//   } catch (error) {
//     dispatch({
//       type: ORDER_DETAILS_FAIL,
//       payload: error.response && error.response.data.message ? error.response.data.message : error.message
//     })
//   }
// }