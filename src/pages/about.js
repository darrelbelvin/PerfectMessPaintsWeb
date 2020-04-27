import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const AboutPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  const socialLinks = data.site.siteMetadata.social

  return (
    <Layout title={siteTitle} social={socialLinks}>
      <SEO
        title="About"
        keywords={[
          `blog`,
          `paint`,
          `painting`,
          `pour painting`,
          "art",
          "artist",
          "Jenna Belvin",
        ]}
      />

      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <h2>
            Creative, beautiful, and often a hot mess. Jenna Belvin is an artist
            with a passion for abstract and pour pieces.
          </h2>
          <figure className="kg-card kg-image-card kg-width-full">
            <Img
              fluid={data.profileShot.childImageSharp.fluid}
              className="kg-image"
            />
            <figcaption>
              Jenna's first 3-foot by 3-foot commissioned piece
            </figcaption>
          </figure>
          <h3 id="dynamic-styles">About Jenna</h3>
          <p>
            Born in Anapolis Brazil, currently living in Seattle with her
            husband and two cats. Jenna enjoys painting, movies, and fantasy
            fiction.
          </p>
          <p>
            Follow her on{" "}
            <a href={`https://www.instagram.com/${socialLinks.instagram}/`}>
              {" "}
              Instagram
            </a>{" "}
            {/* and check out her
            <a href={`https://www.etsy.com/shop/${socialLinks.etsy}/`}>
              {" "}
              Etsy shop
            </a> */}
            !
          </p>
          {/* <p>
            Both post and page templates are light and minimal, with all the
            focus on the content while the design of the theme gets out of the
            way. Beneath the hood, London enjoys the full power of the{" "}
            <a href="https://docs.ghost.org/api/handlebars-themes/">
              Ghost Handlebars Theme API
            </a>{" "}
            to provide limitless customisation options and dynamic styles.
          </p>
          <p>
            Don't forget to check out the{" "}
            <a href="https://docs.ghost.org/integrations/">
              Ghost Integrations Directory
            </a>{" "}
            for more ways to integrate Ghost with your favourite services.
          </p> */}
        </div>
      </article>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        author
        social {
          instagram
          etsy
        }
        title
      }
    }
    profileShot: file(relativePath: { eq: "houseShotHoriz.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <AboutPage location={props.location} data={data} {...props} />
    )}
  />
)
