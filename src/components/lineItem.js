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
    <tr>
      <td className='colcolapse'>
        <Link to={`/product/${item.variant.product.handle}/`}>
          {variantImage}
        </Link>
      </td>
      <td>
        <Link to={`/product/${item.variant.product.handle}/`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
          <h4>
            {item.title}
          </h4>
        </Link>
      </td>
      <td>
        <p>
          {price}
        </p>
      </td>
      <td>
        <button onClick={handleRemove}>Remove</button>
      </td>
    </tr>
  )
}

export default LineItem
