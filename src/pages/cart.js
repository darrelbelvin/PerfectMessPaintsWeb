import React, { useState, useContext, useEffect, useCallback } from 'react'

import Img from "gatsby-image"
import _ from "lodash"
import { Link } from "gatsby"

import StoreContext from '../context/StoreContext'
import LineItem from '../components/lineItem'

const Cart = () => {
  const {
    store: { client, checkout },
    updateLineItem,
  } = useContext(StoreContext)

  const handleCheckout = () => {
    window.open(checkout.webUrl)
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
        </tbody>
        <tr>
          <td colspan={4}>
            <hr/>
          </td>
        </tr>
        <tfoot>
          <tr style={{'border-bottom': '1px solid #000'}}>
            <td className='colcolapse'/>
            <td><h4>Subtotal:</h4></td>
            <td colspan={2}><p>$ {checkout.subtotalPrice}</p></td>
          </tr>
          <tr>
            <td className='colcolapse'/>
            <td><h4>Taxes:</h4></td>
            <td colspan={2}><p>$ {checkout.totalTax}</p></td>
          </tr>
          <tr>
            <td className='colcolapse'/>
            <td><h3>Total:</h3></td>
            <td colspan={2}><p>$ {checkout.totalPrice}</p></td>
          </tr>
          <tr>
            <td className='colcolapse'/>
            <td colspan="2" align='right'>
              <button className='primary'
                onClick={handleCheckout}
                disabled={checkout.lineItems.length === 0}
              >
                Check out
              </button>
            </td>
          </tr>
          <tr>
            <td colspan={4} align='center'>
              <p>You will be forwarded to perfect-mess-paints.myshopify.com to complete checkout</p>
            </td>
          </tr>
        </tfoot>
      </table>
      
    </div>
  )
}

export default Cart