import { 
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { cakeListReducer } from './redux/reducers/cakeReducers'
import { userLoginReducer, userRegisterReducer } from './redux/reducers/userReducers'
import { cartReducers } from './redux/reducers/cartReducers'
import { orderCreateReducer, orderListReducer } from './redux/reducers/orderReducers'

const reducer = combineReducers({
  cakeList: cakeListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  cart: cartReducers,
  orderCreate: orderCreateReducer,
  orderList: orderListReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  cart: { cartItems: cartItemsFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store