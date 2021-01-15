import {
  CAKE_LIST_REQUEST,
  CAKE_LIST_SUCCESS,
  CAKE_LIST_FAIL,
} from '../constants/cakeConstants'

export const cakeListReducer = (state = { cakes: [] }, action) => {
  switch (action.type) {
    case CAKE_LIST_REQUEST:
      return { loading: true, cakes: [] }
    case CAKE_LIST_SUCCESS:
      return { 
        loading: false, 
        cakes: action.payload.cakes,
        pages: action.payload.pages,
        page: action.payload.page
      }
    case CAKE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
