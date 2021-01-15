import { useDispatch, useSelector } from 'react-redux'
import { Card, Badge, ListGroup, Button, Row, Col, Image } from 'react-bootstrap'
import Message from '../components/Message'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import Button from '@material-ui/core/Button';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { addToCart, reduceFromCart, removeFromCart } from '../redux/actions/cartActions'
import { getCartCount, getCartTotal } from '../redux/reducers/cartReducers'
import CurrencyFormat from 'react-currency-format'

const CartScreen = ({ history }) => {
  const dispatch = useDispatch()
  
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? <Message>Your cart is empty</Message> : 
        <ListGroup>
          {cartItems.map(item => (
            <ListGroup.Item key={item.cake}>
              <Row>
                <Col xs={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col xs={3} lg={2}>
                  <p><strong>{item.name}</strong></p>
                </Col>
                <Col className='d-none d-lg-block' xs={2}>
                  <CurrencyFormat
                    renderText={(value) => (
                      <>
                        {value}
                      </>
                    )}
                    decimalScale={2}
                    value={item.price}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={' MMK'}
                  />
                </Col>
                <Col xs={1}>
                  <Badge style={{ padding: '5px' }} variant="primary">{item.qty}</Badge>
                </Col>
                <Col xs={3}>
                {/* <Button size='small' variant="outlined" color="primary" href="#outlined-buttons">
                <ArrowDropUpIcon />
                </Button>
                <Button size='small' variant="outlined" color="primary" href="#outlined-buttons">
                <ArrowDropDownIcon />
                </Button> */}
                  <Button onClick={() => dispatch(addToCart(item.cake))} className='btn-success btn-sm mr-lg-4 mt-lg-2'><ArrowDropUpIcon /></Button>
                  <Button onClick={() => dispatch(reduceFromCart(item.cake))} className='btn-secondary btn-sm mt-md-2 mt-lg-2'><ArrowDropDownIcon /></Button>

                </Col>
                <Col xs={1} sm={2}>
                  <Button onClick={() => dispatch(removeFromCart(item.cake))} className='mt-lg-2 btn-sm btn-danger' type='button'>
                    <RemoveShoppingCartIcon />
                  </Button>
                </Col>
                
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>}
      </Col>

      <Col className='mt-5' md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              {/* <h2>Subtotal {getCartCount(cartItems)} items</h2> */}
              <CurrencyFormat
                renderText={(value) => (
                  <>
                    <h4>Total Item: {getCartCount(cartItems)} {getCartCount(cartItems) === 1 ? 'item' : 'items'}</h4>
                    <h4>Total Price: {value}</h4>
                  </>
                )}
                decimalScale={2}
                value={getCartTotal(cartItems)}
                displayType={'text'}
                thousandSeparator={true}
                suffix={' MMK'}
              />
              {/* {getCartTotal(cartItems)} MMK */}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button onClick={() => history.push('/payment')} type='button' className='btn-block' disabled={cartItems.length === 0}>
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
