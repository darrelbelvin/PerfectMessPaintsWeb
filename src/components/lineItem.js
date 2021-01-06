import React, { useContext } from 'react'
import { Link } from 'gatsby'

import StoreContext from '../context/StoreContext'

const LineItem = props => {
  const { item } = props
  const {
    removeLineItem,
    store: { client, checkout },
  } = useContext(StoreContext)

  const variantImage = item.variant.image ? (
    <img
      src={item.variant.image.src}
      alt={`${item.title} product shot`}
      height="120px"
    />
  ) : null

  const handleRemove = () => {
    removeLineItem(client, checkout.id, item.id)
  }

  const price = Intl.NumberFormat(undefined, {
    currency: item.variant.priceV2.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(item.variant.priceV2.amount)

  console.log(item)

  return (
    <div className='row'>
      {console.log(item)}
      <Link to={`/product/${item.variant.product.handle}/`} className='col-3'>
        {variantImage}
      </Link>
      <div className='col-9 row'  style={{'align-items': 'center'}}>
        <h4 className='col-5'>
          {item.title}
        </h4>
        <h5 className='col-2'>
          {price}
        </h5>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
  )
}

export default LineItem
