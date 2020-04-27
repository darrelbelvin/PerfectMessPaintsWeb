import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import _ from "lodash"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Ribbon from "../components/ribbon"

class BlogPostTemplate extends React.Component {

  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const socialLinks = this.props.data.site.siteMetadata.social

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
        social={socialLinks}
      >
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article
          className={`post-content ${post.frontmatter.thumbnail || `no-image`}`}
        >
          <header className="post-content-header">
            <h1 className="post-content-title">{post.frontmatter.title}</h1>
          </header>

          {post.frontmatter.description && (
            <p className="post-content-excerpt">{post.frontmatter.description}</p>
          )}

          {post.frontmatter.tags && (
            <div className="tag-container">
              {post.frontmatter.tags.map(tag => {
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
          
          {post.frontmatter.thumbnail && (
            <div className="post-content-image">
              <Img
                className="kg-image"
                label='sold'
                fluid={post.frontmatter.thumbnail.childImageSharp.fluid}
                alt={post.frontmatter.title}
              />
              <Ribbon available={post.frontmatter.available}
                      price={post.frontmatter.price}
                      name={post.frontmatter.title}/>
            </div>
          )}

          <div
            className="post-content-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <footer className="post-content-footer">
            {/* There are two options for how we display the byline/author-info.
        If the post has more than one author, we load a specific template
        from includes/byline-multiple.hbs, otherwise, we just use the
        default byline. */}
          </footer>
        </article>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        available
        price
        tags
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 1360) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
