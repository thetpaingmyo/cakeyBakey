import {
  CART_ADD_ITEM,
  CART_REDUCE_ITEM,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEMS,
} from '../constants/cartConstants'

export const getCartTotal = (cartItems) => cartItems.reduce((amount, item) => amount + item.qty * item.price, 0)

export const getCartCount = (cartItems) => cartItems.reduce((amount, item) => amount + item.qty, 0)

export const cartReducers = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    // case CART_ADD_ITEM:
    //   const item = action.payload
    //   const existItem = state.cartItems.find(x => x.cake === item.cake)
    //   if (existItem) {
    //     existItem.qty = existItem.qty + item.qty
    //     const updatedcartItems = state.cartItems.filter(x => x.cake !== existItem.cake)
    //     updatedcartItems.push(existItem)
    //     return {
    //       ...state,
    //       cartItems: updatedcartItems
    //     }
    //   } else {
    //     return {
    //       ...state,
    //       cartItems: [...state.cartItems, item]
    //     }
    //   }

    case CART_ADD_ITEM:
      const item = action.payload
      const addCartItems = state.cartItems
      const addIndex = addCartItems.findIndex(x => x.cake === item.cake)
      if (addIndex === -1) {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      } else {
        addCartItems[addIndex].qty = addCartItems[addIndex].qty + 1
        return {
          ...state,
          cartItems: addCartItems
        }
      }

    // case CART_REDUCE_ITEM:
    //   const id = action.payload
    //   const reduceItem = state.cartItems.find(x => x.cake === id)
    //   if (reduceItem.qty === 1) {
    //     return {
    //       ...state,
    //       cartItems: state.cartItems.filter(x => x.cake !== id)
    //     }
    //   } else {
    //       reduceItem.qty = reduceItem.qty - 1
    //       const updatedCartItems = state.cartItems.filter(x => x.cake !== id)
    //       updatedCartItems.push(reduceItem)
    //       return {
    //         ...state,
    //         cartItems: updatedCartItems
    //     }
    //   }

    case CART_REDUCE_ITEM:
      const id = action.payload
      const reduceCartItems = state.cartItems
      const reduceIndex = state.cartItems.findIndex(x => x.cake === id)
      if (reduceCartItems[reduceIndex].qty === 1) {
        return {
          ...state,
          cartItems: state.cartItems.filter(x => x.cake !== id)
        }
      } else {
          reduceCartItems[reduceIndex].qty = reduceCartItems[reduceIndex].qty - 1
          return {
            ...state,
            cartItems: reduceCartItems
        }
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.cake !== action.payload)
      }

    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: []
      }

    default:
      return state
  }
}