import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const PoliciesPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  const socialLinks = data.site.siteMetadata.social

  const name = "(painting name here)",
  buy_link = 'mailto:hotmesspaints@gmail.com?subject=Purchase request for ' + name + '&body=Hello Jenna,\nI am interested in purchasing your painting named ' + name + '.',
  commission_link = 'mailto:hotmesspaints@gmail.com?subject=Commission request&body=Hello Jenna,\nI am interested in commissioning you for a painting.\n' + 
                    'Canvas Size: ____\n' + 
                    'Color Pallet: ____\n' + 
                    'Technique:   ____\n';

  return (
    <Layout title={siteTitle} social={socialLinks}>
      <SEO title="Policies" />

      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <h2 id="howtobuy">How to Buy My Art</h2>
          <p>
            I am just getting started and am not ready to invest in an e-commerce service. <br/>
            For now, if you want to buy my art, please email me at <a href={buy_link}>hotmesspaints@gmail.com</a><br/>
            Once I have your address I can calculate tax/shipping and get you a total price.
          </p>
          <p>
            Payment methods I accept:
            <ul>
              <li>PayPal</li>
              <li>Venmo</li>
              <li>Cash App</li>
              <li>Actual Cash</li>
            </ul>
            No checks, so please don't ask!
          </p>
          <hr />
          <h2 id="returns">Return Policy</h2>
          <p>
            All sales are final. No returns or exchanges will be accepted at this time.
          </p>
          <hr />
          <h2 id="commissions">Commissions Policy</h2>
          <p>
            I am happy to do commissions! Please be aware though of the chaotic nature of pour art.
            You may select the color palate, canvas size, and technique used,
            but these do <strong>not</strong> guarantee a particular outcome.
            The exact same setup can result in very different results, that's part of the beauty of pour painting!
            Here are my conditions:
            <ul>
              <li>I require a 50% non-refundable deposit before I start work on the painting.
                You're free to pay 100% up-front if you want.</li>
              <li>Remaining payment required before I ship the painting.</li>
              <li>I will send pictures of how it turned out. If you don't like it I can retry once,
                but after that you have to take it or leave it (deposit not refunded).</li>
              <li>It can take up to several weeks for a painting to be properly dried and varnished, so please be patient!</li>
            </ul>
          </p>
          <p>
            If you want to commission me, please contact me at <a href={commission_link}>hotmesspaints@gmail.com</a> and select your
            <ul>
              <li>Canvas Size</li>
              <li>Color Palate</li>
              <li>Technique</li>
            </ul>
            Take a look at the <a href="/tags">tags</a> to see the different techniques and colors in action.
          </p>
        </div>
      </article>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        social {
          instagram
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <PoliciesPage location={props.location} data={data} {...props} />
    )}
  />
)
