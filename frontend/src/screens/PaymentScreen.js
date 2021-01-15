import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import CurrencyFormat from 'react-currency-format'
import { getCartCount, getCartTotal } from '../redux/reducers/cartReducers'
import { CardElement } from '@stripe/react-stripe-js'
import Message from '../components/Message'
import { createOrder } from '../redux/actions/orderActions'
// import { useHistory } from 'react-router-dom'
import { ORDER_CREATE_RESET } from '../redux/constants/orderConstants'

const PaymentScreen = ({ history }) => {
  // const history = useHistory()
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [disabled, setDisabled] = useState(true)

  const dispatch = useDispatch()

  const orderCreate = useSelector(state => state.orderCreate)
  const { order } = orderCreate

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login?redirect=payment')
    } else if (order) {
      setError(null)
      setProcessing(false)
      history.push('/orders')
      dispatch({ type: ORDER_CREATE_RESET })
    }
  }, [history, userInfo, order, dispatch])

  const handleChange = event => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }
  
  const submitHandler = e => {
    if (!error) {
      e.preventDefault()
      setProcessing(true)

      dispatch(createOrder({
        orderItems: cartItems,
        shippingAddress: {
          address, city, postalCode, country
        },
        totalPrice: getCartTotal(cartItems),
      }))
    } else {
      setError('Something is wrong with your payment.')
    }
  }

  return (
    <div>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Row>
          <Col md={6}>
          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control type='text' placeholder='Enter address' required value={address} onChange={e => setAddress(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control type='text' placeholder='Enter city' value={city} required onChange={e => setCity(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='postalCode'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control type='text' placeholder='Enter postal code' value={postalCode} required onChange={e => setPostalCode(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control type='text' placeholder='Enter country' value={country} required onChange={e => setCountry(e.target.value)}></Form.Control>
          </Form.Group>
          </Col>

          <Col md={6}>
            <div className='mb-3'>
            <CurrencyFormat
              renderText={(value) => (
                <>
                  <h6>Total Item: {getCartCount(cartItems)} items</h6>
                  <h6>Total Price: {value}</h6>
                </>
              )}
              decimalScale={2}
              value={getCartTotal(cartItems)}
              displayType={'text'}
              thousandSeparator={true}
              suffix={' MMK'}
            />
            </div>
            <CardElement className='border border-secondary rounded p-3' onChange={handleChange} />
            <Button className='my-3' disabled={processing || disabled || cartItems.length === 0} type='submit' variant='primary'>
              <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
            </Button>
            {error && <Message variant='danger'>{error}</Message>}
          </Col>
          
        </Row>
        
      </Form>
    </div>
  )
}

export default PaymentScreen
