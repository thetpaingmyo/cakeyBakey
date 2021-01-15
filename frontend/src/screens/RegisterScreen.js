import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { register } from '../redux/actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const RegisterScreen = ({ history, location }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userRegister = useSelector(state => state.userRegister)
  const { loading, error } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    setMessage('')
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = e => {
    e.preventDefault()
    setMessage('')
    if (!name || !email || !password || !confirmPassword) {
      setMessage('All Fields are required.')
    } else if (password !== confirmPassword) {
      setMessage('Passwords do not match. Try again')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h1>Register</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' value={name} onChange={e => setName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' value={password} onChange={e => setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>Sing Up</Button>
      </Form>
      <Row>
        <Col>
          Already have an account? <Link to={'/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen