import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Container, Row, Col, Card } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOrders } from '../redux/actions/orderActions'
import CurrencyFormat from 'react-currency-format'

const OrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const orderList = useSelector(state => state.orderList)
  const { loading, error, orders } = orderList

  useEffect(() => {
    if (!userInfo) {
      history.push('/login?redirect=orders')
    }
    dispatch(listOrders())
  }, [history, dispatch, userInfo])

  return (
    <Container className='mt-3'>
      <h3>Your Orders</h3>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {orders &&
        orders.map(order => (
        <Card className='mb-3 p-3 position-relative' key={order._id}> 
          <h5>Order Id:</h5>
          <h5>{order._id}</h5>
          <p className='text-muted'>{new Date(order.paidAt).toUTCString()}</p>

          {order.orderItems.map((item, i) => (
            <Row key={i}>
              <Col xs={3}><img style={{ width: '100px' }} src={item.image} alt={item.name} /></Col>
              
              <Col xs={3}>
                <div className='d-none d-sm-block'>
                <p><strong>{item.name}</strong></p>

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
                </div>
              </Col>
              <Col xs={3}>
                <p>x</p>
                <p>{item.qty} {item.qty === 1 ? 'item' : 'items'}</p>
              </Col>
              <Col xs={3}>
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      {value}
                    </>
                  )}
                  decimalScale={2}
                  value={item.price * item.qty}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={' MMK'}
                />
              </Col>
            </Row>
          ))}
          <Badge style={{ borderRadius: '10px', top: '15px', right: '15px' }} className='position-absolute' variant="secondary">
              <CurrencyFormat
                renderText={(value) => (
                  <strong>
                    {value}
                  </strong>
                )}
                decimalScale={2}
                value={order.totalPrice}
                displayType={'text'}
                thousandSeparator={true}
                suffix={' MMK'}
              />
          </Badge>
        </Card>
      ))
      }
    </Container>
  )
}

export default OrderScreen
