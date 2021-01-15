import { useDispatch } from 'react-redux'
import { Card, Badge, Button } from 'react-bootstrap'
import CurrencyFormat from 'react-currency-format'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { addToCart } from '../redux/actions/cartActions'
import './Cake.css'

const Cake = ({ cake }) => {
  const dispatch = useDispatch()

  return (
    <Card className='cake my-3 rounded position-relative'>
      <Card.Img src={cake.image} variant='top' />

      <div className='my-4 mx-3'>
        <strong>{cake.name}</strong>
        <Button onClick={() => dispatch(addToCart(cake._id))} className='btn-sm ml-3 btn-info float-right'><AddShoppingCartIcon /></Button>
      </div>

      <h5 className='position-absolute' style={{ top: '7px', left: '10px' }}>
        <Badge style={{ borderRadius: '10px' }} variant="light">
          <CurrencyFormat
            renderText={(value) => (
              <>
                {value}
              </>
            )}
            decimalScale={2}
            value={cake.price}
            displayType={'text'}
            thousandSeparator={true}
            suffix={' MMK'}
        />
        </Badge>
      </h5>
    </Card>
  )
}

export default Cake
