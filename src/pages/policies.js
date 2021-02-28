import React from "react"
import { graphql, StaticQuery } from "gatsby"

import SEO from "../components/seo"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const PoliciesPage = ({ data }, location) => {

  const commission_link = 'mailto:perfectmesspaints@gmail.com?subject=Commission request&body=Hello Jenna,\nI am interested in commissioning you for a painting.\n' + 
                    'Canvas Size: ____\n' + 
                    'Color Pallet: ____\n' + 
                    'Technique:   ____\n';

  return (
    <>
      <SEO title="Policies" />

      <article className="post-content page-template no-image">
        <div className="post-content-body">

          <h2 id="howtobuy">How to Buy My Art</h2>
          Any paintings that are available to buy will have an "Add to Cart" button on their page.
          Once you're ready to check out, go to your cart and click the check out button.
          This will take you to perfect-mess-paints.myshopify.com to complete your purchase.
          I will typically ship your painting within three business days.
          <hr />

          <h2 id="commissions">Commissions Policy</h2>
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
          If you want to commission me, please contact me at <a href={commission_link}>perfectmesspaints@gmail.com</a> and select your
          <ul>
            <li>Canvas Size</li>
            <li>Color Palate</li>
            <li>Technique</li>
          </ul>
          Take a look at the <a href="/tags">tags</a> to see the different techniques and colors in action.
        </div>
      </article>
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
