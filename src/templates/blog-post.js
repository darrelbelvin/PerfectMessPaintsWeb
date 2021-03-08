import React, { useState, useContext, useEffect, useCallback } from 'react'

import { graphql } from "gatsby"
import _ from "lodash"
import { Link } from "gatsby"

import SEO from "../components/seo"
import ComboSlickCarousel from "../components/comboSlickCarousel"

import StoreContext from '../context/StoreContext'


const BlogPostTemplate = ( post ) => {
  const product = post.data.shopifyProduct
  const { previous, next } = post.pageContext
  const {
    variants: [productVariant],
    priceRange: { minVariantPrice },
  } = product
  const {
    addVariantToCart,
    store: { client, adding, checkout },
  } = useContext(StoreContext)

  const checkInCart = useCallback(
    () => {
      return checkout.lineItems.filter(item => item.variant.id === productVariant.shopifyId).length !== 0;
    },
    [checkout.lineItems, productVariant.shopifyId]
  );

  const [available, setAvailable] = useState(false)
  const [inCart, setInCart] = useState(checkInCart())

  const checkAvailability = useCallback(
    productId => {
      client.product.fetch(productId).then(fetchedProduct => {
        setAvailable(fetchedProduct.variants[0].available)
      })
    },
    [client.product]
  )

  useEffect(() => {
    checkAvailability(product.shopifyId)
  }, [checkAvailability, product.shopifyId])

  useEffect(() => { setInCart(checkInCart()); }, [checkInCart])

  const handleAddToCart = () => {
    if (!checkInCart()) {
      addVariantToCart(productVariant.shopifyId, 1)
    }
    setInCart(true)
  }

  const price = Intl.NumberFormat(undefined, {
    currency: minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(productVariant.price)

  return (
    <>
      <SEO
        title={product.title}
        description={product.description || product.excerpt}
      />
      <article
        className={`post-content`}
      >
        <header className="post-content-header">
          <h1 className="post-content-title">{product.title}</h1>
        </header>

        {product.description && (
          <p className="post-content-excerpt">{product.description}</p>
        )}

        {product.tags && (
          <div className="tag-container">
            {product.tags.map(tag => {
              return (
                <Link
                  key={tag}
                  style={{ textDecoration: "none" }}
                  to={`/tags/${_.kebabCase(tag)}`}
                >
                  <div className="tag-item">#{tag}</div>
                </Link>
              )
            })}
          </div>
        )}
        
        {available && 
          <div className="tag-container">
            {!inCart?
              <h5 style={{'whiteSpace': 'break-spaces'}}>
                {product.title} is available for {price}  <button
                  type="submit"
                  className="primary"
                  disabled={!available || adding || inCart}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </h5>
            :
              <h5 style={{'whiteSpace': 'break-spaces'}}>
                {product.title} is in your cart.  <Link to={`/cart`}>
                  <button type="button">Go to Cart</button>
                </Link>
              </h5>
            }
          </div>
        }

        <ComboSlickCarousel imageList={product.images}/>

      </article>
      <ul className="pagination">
        {previous &&
        <li className="page-item">
          <Link to={`/product/${previous.handle}`}>
            ⟨ Previous
          </Link>
        </li>}
        <li className="page-item">
          <Link to={`/`}>
            Home
          </Link>
        </li>
        {next &&
        <li className="page-item">
          <Link to={`/product/${next.handle}`}>
            Next ⟩
          </Link>
        </li>}
      </ul>
    </>
  )
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      tags
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images {
        originalSrc
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 910) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`

export default BlogPostTemplate
