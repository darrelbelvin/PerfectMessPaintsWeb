import React, { useState, useContext, useEffect, useCallback } from "react"
import PostCard from "./postCard"
import StoreContext from '../context/StoreContext'
import Pagination from "react-js-pagination"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const ProductGrid = ({data}) => {
  const posts = data.allShopifyProduct.edges

  const {
    store: { client },
    storedAvailability,
    storeItemAvailability
  } = useContext(StoreContext)

  const [activePage, setActivePage] = React.useState(1)
  const postsPerPage = 6
  const postOffset = (activePage - 1) * postsPerPage
  const [filterShow, setFilterShow] = React.useState(false)
  const [filterAvail, setFilterAvail] = React.useState(true)
  const [filterSold, setFilterSold] = React.useState(true)

  let postCounter = 0

  const initAvailable = Object.assign({}, ...posts.map((p) => (
    {[p.node.shopifyId]: 
      p.node.shopifyId in storedAvailability ?
        storedAvailability[p.node.shopifyId]:
        p.node.availableForSale ? 1 : 0})))
  const [available, setAvailable] = useState(initAvailable)

  const checkAvailability = useCallback(
    productId => {
      client.product.fetch(productId).then(fetchedProduct => {
        available[productId] = fetchedProduct.variants[0].available ? 2 : 0
        setAvailable(available)
        storeItemAvailability(productId, available[productId])
      })
    },
    [client.product, available, setAvailable, storeItemAvailability]
  )
  
  const setFilter = (e) => {
    if(e.target.id === "show-sold") {
      setFilterSold(!filterSold)
      setFilterAvail(true)
    } else if(e.target.id === "show-avail") {
      setFilterAvail(!filterAvail)
      setFilterSold(true)
    }
    setActivePage(1)
  }

  useEffect(() => {
    for (var id in available) {
      if (available[id] === 1) {
        checkAvailability(id)
      }
    }
  }, [checkAvailability, available])

  const filteredPosts = posts.filter(({ node }) => {
    if(filterSold && filterAvail) {return(true)}
    else if(filterSold) {return(available[node.shopifyId] === 0)}
    else if(filterAvail) {return(available[node.shopifyId] === 2)}
    return(false)
  })

  return (
    <>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"/>
      <form className="row gtr-uniform">
        <div className="col-6 col-12-small" style={{visibility: filterShow? 'visible':'hidden'}}>
          <input type="checkbox" id="show-avail" name="show-avail" checked={filterAvail} onChange={setFilter}/>
          <label htmlFor="show-avail">Show Available Art</label>
        </div>
        <div className="col-6 col-10-small" style={{display: filterShow? 'block':'none'}}>
          <input type="checkbox" id="show-sold" name="show-sold" checked={filterSold} onChange={setFilter}/>
          <label htmlFor="show-sold">Show Sold Art</label>
        </div>
        <div className="material-icons"
          style={{position: 'absolute', left: '95%', transform: 'translateY(10px)', cursor: 'pointer'}}
          role="button"
          onClick={() => {setFilterShow(!filterShow)}}
          onKeyPress={() => {setFilterShow(!filterShow)}}
          tabIndex={0}
        >
          filter_alt
        </div>
      </form>
      <div className="post-feed">
      {filteredPosts.slice(postOffset, postOffset + postsPerPage).map(({ node }) => {
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
      <Pagination
        activePage={activePage}
        itemsCountPerPage={postsPerPage}
        totalItemsCount={filteredPosts.length}
        pageRangeDisplayed={5}
        onChange={setActivePage}
        itemClass="page-item"
        activeClass="page-item-active"
        linkClass="page-link"
        activeLinkClass="page-link-active"
      />
    </>
  )
}

export default ProductGrid
