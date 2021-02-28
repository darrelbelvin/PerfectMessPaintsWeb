import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"

// import SEO from "../components/seo"
// import Bio from "../components/bio"
import ProductGrid from "../components/productGrid"

// import "../utils/global.scss"
import "../utils/normalize.css"
import "../utils/css/screen.css"

//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
const BlogIndex = (props) => {
  const { data } = props

  return (
    //   <SEO
    //     title="Posts"
    //     keywords={[`painting`, `blog`, `pour painting`, `artist`, `perfect mess paints`, `Jenna Belvin`, `Jenna`, `Belvin`]}
    //   />

    <>
      {data.site.siteMetadata.description && (
        <header className="page-head">
          <h2 className="page-head-title">
            Jenna Belvin's art gallery. Mostly pour paintings, some abstract and other pieces. Available for <Link to='/policies/#commissions'>commissions</Link>!
          </h2>
        </header>
      )}
      <ProductGrid data={data}/>
    </>
  )
}

const productQuery = graphql`
query {
  site {
    siteMetadata {
      title
      description
      social {
        instagram
      }
    }
  }
  allShopifyProduct(sort: { fields: [createdAt], order: DESC }) {
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

export default props => (
  <StaticQuery
    query={productQuery}
    render={data => (
      <BlogIndex location={props.location} props data={data} {...props} />
    )}
  />
)
