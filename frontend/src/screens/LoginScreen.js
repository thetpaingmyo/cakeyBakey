import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { login } from '../redux/actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const LoginScreen = ({ history, location }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' value={password} onChange={e => setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>Sign In</Button>
      </Form>
      <Row>
        <Col>
          New customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
