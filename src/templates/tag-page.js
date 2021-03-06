import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import ProductGrid from "../components/productGrid"

const TagPageTemplate = (props) => {
  const { data } = props
  const tag = props.pageContext.tag

  return (
    <>
      <SEO
        // title={`#${tag}`}
        title={`#${tag.charAt(0).toUpperCase() + tag.slice(1)}`}
        keywords={[`${tag}`, `blog`, `gatsby`, `javascript`, `react`]}
      />
      <header className="tag-page-head">
        <h1 className="page-head-title">
          #{tag}({props.data.allShopifyProduct.totalCount})
        </h1>
      </header>
      <ProductGrid data={data}/>
    </>
  )
}

export const query = graphql`
  query PostByTag($tag: String!) {
    site {
      siteMetadata {
        title
        author
        social {
          instagram
          etsy
        }
      }
    }
    allShopifyProduct(filter: {tags: {in: [$tag]}}) {
      totalCount
      edges {
        node {
          id
          title
          tags
          availableForSale
          handle
          description
          descriptionHtml
          shopifyId
          createdAt
          images {
            id
            originalSrc
            localFile {
              childImageSharp {
                fluid(maxWidth: 910) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
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
        }
      }
    }
  }
`

export default TagPageTemplate
