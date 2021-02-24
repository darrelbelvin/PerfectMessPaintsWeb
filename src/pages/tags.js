import React from "react"
import _ from "lodash"
import { Link } from "gatsby"
import { graphql, StaticQuery } from "gatsby"

import SEO from "../components/seo"

// import "../utils/global.scss"
import "../utils/normalize.css"
import "../utils/css/screen.css"

const TagIndex = ({ data }) => {
  const tags = data.allShopifyProduct.distinct

  return (
    <>
      <SEO title="Tags" />
      <header className="tag-page-head">
        <h1 className="page-head-title">Tags({tags.length})</h1>
      </header>
      <div className="tag-container">
        {tags.map(tag => {
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
    </>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        social {
          instagram
          etsy
        }
      }
    }
    allShopifyProduct {
      distinct(field: tags)
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => <TagIndex props data={data} />}
  />
)
