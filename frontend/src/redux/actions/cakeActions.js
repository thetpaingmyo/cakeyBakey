import axios from 'axios'
import {
  CAKE_LIST_REQUEST,
  CAKE_LIST_SUCCESS,
  CAKE_LIST_FAIL,
} from '../constants/cakeConstants'

export const listCakes = (pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: CAKE_LIST_REQUEST })
    
    const { data } = await axios.get(`/api/cakes?pageNumber=${pageNumber}`)

    dispatch({ type: CAKE_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CAKE_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}