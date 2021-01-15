import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import OrderScreen from './screens/OrderScreen'
import CartScreen from './screens/CartScreen'
import PaymentScreen from './screens/PaymentScreen'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe(
  'pk_test_51I1TVNGrlbrIiAkL5noFdNhYJjxsdxV3Z0Gsue2bbslA1gspW9EPq84cmXT5Nuuvkzm98IPFpxaiCcxcAH8Hwv7t00w6iLzlIR'
  )

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <main>
          <Container>
            <Switch>
              <Route path='/' component={HomeScreen} exact />
              <Route path='/page/:pageNumber' component={HomeScreen} />
              <Route path='/login' component={LoginScreen} />
              <Route path='/register' component={RegisterScreen} />
              <Route path='/orders' component={OrderScreen} />
              <Route path='/cart' component={CartScreen} />
              <Elements stripe={promise}>
                <Route path='/payment' component={PaymentScreen} />
              </Elements>
            </Switch>
          </Container>
        </main>
      </Router>
    </div>
  );
}

export default App;
