import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Badge, Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { logout } from '../redux/actions/userActions'
import { getCartCount } from '../redux/reducers/cartReducers'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const history = useHistory()

  const logoutHandler = () => {
    console.log('logout')
    dispatch(logout())
    history.push('/login')
  }

  return (
    <header className='sticky-top'>
    <Navbar bg="secondary" variant='dark' expand="md" collapseOnSelect>
    <Container>
    <LinkContainer to="/">
      <Navbar.Brand>Cakey Bakey</Navbar.Brand>
    </LinkContainer>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
        <LinkContainer className='position-relative mr-3' to='/cart'>
          <Nav.Link>
            <ShoppingCartIcon /> <Badge className='position-absolute' variant="primary">{getCartCount(cartItems)}</Badge>
          </Nav.Link>
        </LinkContainer>
        {userInfo ? (
          <NavDropdown title={userInfo.name} id='username'>
            <LinkContainer to='/orders'>
              <NavDropdown.Item>Orders</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={logoutHandler}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        ) : 
        <LinkContainer to='/login'>
          <Nav.Link>Sign In</Nav.Link>
        </LinkContainer> }

        {/* {userInfo && userInfo.isAdmin && 
          <NavDropdown title='admin' id='adminmenu'>
            <LinkContainer to='/admin/userlist'>
              <NavDropdown.Item>Users</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/admin/cakelist'>
              <NavDropdown.Item>Cakes</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/admin/orderlist'>
              <NavDropdown.Item>Orders</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>} */}
        </Nav>
      </Navbar.Collapse>
    </Container>
    </Navbar>
    </header>
  )
}

export default Header
