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
      {lineItems}
      <hr/>
      <div className='row centered'>
        <span className='col-6'/>
        <h3>Subtotal</h3>
        <p>$ {checkout.subtotalPrice}</p>
      </div>
      <h3>Taxes</h3>
      <p>$ {checkout.totalTax}</p>
      <h2>Total</h2>
      <p>$ {checkout.totalPrice}</p>
      <br />
      <button
        onClick={handleCheckout}
        disabled={checkout.lineItems.length === 0}
      >
        Check out
      </button>
    </div>
  )
}

export default Cart
