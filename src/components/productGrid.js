import React, { useState, useContext, useEffect, useCallback } from "react"

import PostCard from "./postCard"

import StoreContext from '../context/StoreContext'

import "../utils/normalize.css"
import "../utils/css/screen.css"

const ProductGrid = ({data}) => {
  const posts = data.allShopifyProduct.edges

  const {
    store: { client }
    // storedAvailability
  } = useContext(StoreContext)

  let postCounter = 0

  const initAvailable = Object.assign({}, ...posts.map((p) => (
    {
      [p.node.shopifyId]: p.node.availableForSale ? 1 : 0})))
  const [available, setAvailable] = useState(initAvailable)

  const checkAvailability = useCallback(
    productId => {
      client.product.fetch(productId).then(fetchedProduct => {
        available[productId] = fetchedProduct.variants[0].available ? 2 : 0
        setAvailable(available)
      })
    },
    [client.product, available]
  )

  useEffect(() => {
    for (var id in available) {
      if (available[id] === 1) {
        checkAvailability(id)
      }
    }
  }, [checkAvailability, available])

  return (
    <div className="post-feed">
    {posts.map(({ node }) => {
        postCounter++
        return (
        <PostCard
            key={node.id}
            count={postCounter}
            node={node}
            postClass={`post`}
            available={available[node.shopifyId]}
        />
        )
    })}
    </div>
  )
}

export default ProductGrid
