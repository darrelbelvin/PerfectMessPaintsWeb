import React, { useState, useContext, useEffect, useCallback } from 'react'

import { graphql } from "gatsby"
import Img from "gatsby-image"
import _ from "lodash"
import { Link } from "gatsby"

import SEO from "../components/seo"
import Ribbon from "../components/ribbon"

import StoreContext from '../context/StoreContext'

// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';

const BlogPostTemplate = ( post ) => {
  console.log(post)
  const product = post.data.shopifyProduct
  const {
    variants: [productVariant],
    priceRange: { minVariantPrice },
  } = product
  const {
    addVariantToCart,
    store: { client, adding, checkout },
  } = useContext(StoreContext)

  const [imageId, setImageID] = useState(0);

  const checkInCart = () => {
    return checkout.lineItems.filter(item => item.variant.id === productVariant.shopifyId).length !== 0;
  };

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

  // render() {
  //   console.log(this.props)
  // const product = this.props.data.shopifyProduct
  //   console.log(product.images)

    // const customRenderThumb = (children) => 
    //   children.map((item) => <img src={item.props.thumb}/>)

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
                <button
                  type="submit"
                  className="primary"
                  disabled={!available || adding || inCart}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              :
                <p style={{'white-space': 'break-spaces'}}>
                  This product is in your cart.   <Link to={`/cart`}>
                    <button type="button">Go to Cart</button>
                  </Link>
                </p>
              }
            </div>
          }

          {/* {product.thumbnail && (
            <div className="post-content-image">
              <Img
                className="kg-image"
                label='sold'
                fluid={product.thumbnail.childImageSharp.fluid}
                alt={product.title}
              />
              <Ribbon available={product.available}
                      price={product.price}
                      name={product.title}/>
            </div>
          )} */}
          {/* <div className="post-content-image">
          <Carousel
            swipeable={true}
            showThumbs={false}
          >
            {product.images.map((img, index) => (
                <Img
                key={index}
                  className="kg-image"
                  label='sold'
                  fluid={img.localFile.childImageSharp.fluid}
                  alt={product.title}
                />
            ))}
          </Carousel>
          <Ribbon available={available}
                    price={price}
                    name={product.title}/>
          </div> */}

          <div className="post-content-image">
            <Img
              className="kg-image"
              label='sold'
              fluid={product.images[imageId].localFile.childImageSharp.fluid}
              alt={product.title}
              aspectRatio={1}
            />
            <Ribbon available={available}
                    price={price}
                    name={product.title}/>
          </div>
          <div style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${product.images.length}, 1fr)`,
                        gridGap: "5px"
                      }}>
            {product.images.map((img, index) => (
              <button
                className="previewButton"
                key={index}
                onClick={() => {setImageID(index)}
                }
              >
                <Img
                  className="kg-image"
                  label='sold'
                  fluid={{ ...img.localFile.childImageSharp.fluid, aspectRatio: 1}}
                  alt={product.title}
                />
              </button>
              ))
            }
          </div>
          <footer className="post-content-footer">
          </footer>
        </article>
      </>
    )
  //}
}

//export const query = graphql(oneProduct)

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
