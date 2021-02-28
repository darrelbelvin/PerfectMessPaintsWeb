import React, { useContext } from 'react'

import StoreContext from '../context/StoreContext'
import LineItem from '../components/lineItem'

/* eslint-disable jsx-a11y/control-has-associated-label */

const Cart = () => {
  const {
    store: { client, checkout },
    updateLineItem,
  } = useContext(StoreContext)

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  if(checkout.lineItems.length === 0) {
    return(
      <h4>
        Your shopping cart is empty. Go add some paintings to your cart!
      </h4>
    )
  }

  //ensure that nothing has been double added
  checkout.lineItems.forEach(item => {
    if (item.quantity > 1) {
      updateLineItem(client, checkout.id, item.id, 1)
    }
  });

  const lineItems = checkout.lineItems.map(item => (
    <LineItem key={item.id.toString()} item={item} />
  ))

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className='colcolapse'/>
            <th><h3>Title</h3></th>
            <th><h3>Price</h3></th>
            <th/>
          </tr>
        </thead>
        <tbody>
          {lineItems}
        <tr>
          <td colSpan={4}>
            <hr/>
          </td>
        </tr>
        </tbody>
        <tfoot>
          <tr style={{'borderBottom': '1px solid #000'}}>
            <td className='colcolapse'/>
            <td><h4>Subtotal:</h4></td>
            <td colSpan={2}><p>$ {checkout.subtotalPrice}</p></td>
          </tr>
          <tr>
            <td className='colcolapse'/>
            <td><h4>Taxes:</h4></td>
            <td colSpan={2}><p>$ {checkout.totalTax}</p></td>
          </tr>
          <tr>
            <td className='colcolapse'/>
            <td><h3>Total:</h3></td>
            <td colSpan={2}><p>$ {checkout.totalPrice}</p></td>
          </tr>
          <tr>
            <td className='colcolapse'/>
            <td colSpan="2" align='right'>
              <button className='primary'
                onClick={handleCheckout}
                disabled={checkout.lineItems.length === 0}
              >
                Check out
              </button>
            </td>
          </tr>
          <tr>
            <td colSpan={4} align='center'>
              <p>You will be forwarded to perfect-mess-paints.myshopify.com to complete checkout</p>
            </td>
          </tr>
        </tfoot>
      </table>
      
    </div>
  )
}

export default Cart
