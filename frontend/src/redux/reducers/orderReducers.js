import {
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_SUCCESS:
      return { order: action.payload }
    case ORDER_CREATE_RESET:
      return {}
    default: 
      return state
  }
}

export const orderListReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true }
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload }
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// export const orderDetailsReducer = (state = { order: {} }, action) => {
//   switch (action.type) {
//     case ORDER_DETAILS_REQUEST:
//       return { loading: true }
//     case ORDER_DETAILS_SUCCESS:
//       return { loading: false, order: action.payload }
//     case ORDER_DETAILS_FAIL:
//       return { loading: false, error: action.payload }
//     default:
//       return state
//   }
// }