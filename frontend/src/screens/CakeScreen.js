import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listCakeDetails } from '../redux/actions/cakeActions'
import { Row, Col, Image, ListGroup, Form, Button } from 'react-bootstrap'

const CakeScreen = ({ history, match }) => {
  const id = match.params.id

  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()

  const cakeDetails = useSelector(state => state.cakeDetails)
  const { loading, error, cake } = cakeDetails

  useEffect(() => {
    dispatch(listCakeDetails(id))
  }, [dispatch, id])

  const addToCartHandler = () => {
    history.push(`/cart?qty=${qty}`)
  }

  return (
    <div>
      <Link className='btn btn-light my-3' style={{ textDecoration: 'none', color: 'black' }} to='/'>
        See All Cakes
      </Link>

      {
        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        <>
          <Row>
            <Col md={6}>
              <Image src={cake.image} alt={cake.name} fluid />
            </Col>
            
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{cake.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span>{cake.rating}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: {cake.price} MMK
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      Price:
                    </Col>
                    <Col>
                      <strong>{cake.price} MMK</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      Status:
                    </Col>
                    <Col>
                      <strong>{cake.countInStock ? 'In Stock' : 'Out of Stock'}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {cake.countInStock > 0 && (
                  <ListGroup.Item>
                  <Row>
                    <Col>
                      Qty:
                    </Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={e => setQty(e.target.value)}
                      >
                        {Array(cake.countInStock).fill().map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
                )}
                
                <ListGroup.Item>
                  <Button onClick={addToCartHandler} disabled={cake.countInStock === 0} className='btn-block' type='button'>
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      }
    </div>
  )
}

export default CakeScreen
