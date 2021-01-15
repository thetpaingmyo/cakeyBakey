import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page }) => {
  return pages > 1 && (
    <Pagination>
      {Array(pages).fill().map((_, i) => (
        <LinkContainer key={i + 1} to={`/page/${i + 1}`}>
          <Pagination.Item variant='secondary' active={i + 1 === page}>{i + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  )
}

export default Paginate
