import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Cake from '../components/Cake'
import { listCakes } from '../redux/actions/cakeActions'
import Paginate from '../components/Paginate'

const HomeScreen = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const cakeList = useSelector(state => state.cakeList)
  const { loading, error, cakes, pages, page } = cakeList

  useEffect(() => {
    dispatch(listCakes(pageNumber))
  }, [dispatch, pageNumber])

  return (
    <div>
      <h1>Available Cakes</h1>
      {
        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        <>
        <div className='d-lg-none'>
          <Paginate pages={pages} page={page} />
        </div>
        
        <Row className='my-3'>
          {cakes && cakes.map(cake => (
            <Col key={cake._id} sm={12} md={6} lg={4} xl={4}>
              <Cake cake={cake} />
            </Col>
          ))}
        </Row>
        <Paginate pages={pages} page={page} />
        </>
      }
      
    </div>
  )
}

export default HomeScreen
