import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrderDetails } from '../redux/actions/orderActions'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id
  const dispatch = useDispatch()
  
  const orderDetails = useSelector(state => state.orderDetails)
  const { error, loading, order } = orderDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => { 
    if (!order) {
      dispatch(listOrderDetails(orderId))
    }
  }, [order, orderId, dispatch])

  return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
      <>
        <h1>Order</h1>
        <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name: {userInfo.name}</strong></p>
              <p><strong>Email: </strong>{userInfo.email}</p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment</h2>
              {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : 
              <Message variant='danger'>Not Paid</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          {item.name}
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} = {item.qty * item.price} MMK
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
        
            </ListGroup>
          </Card>
        </Col>
      </Row>
      </> 
}

export default OrderScreen
