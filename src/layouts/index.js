import React from "react"
import { Link } from "gatsby"
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import ContextProvider from '../provider/ContextProvider'


const Layout = props => {
  const { title, social, children } = props
  const [toggleNav, setToggleNav] = React.useState(false)
  return (
    <ContextProvider>
      <div className={`site-wrapper ${toggleNav ? `site-head-open` : ``}`}>
        <header className="site-head">
          <div className="site-head-container">
            <a id="menu-button" /* eslint-disable-line jsx-a11y/anchor-is-valid */
              role="button"
              className="nav-burger"
              onClick={() => setToggleNav(!toggleNav)} onKeyPress={() => setToggleNav(!toggleNav)}
              tabIndex={0}
            >
              <div
                className="hamburger hamburger--collapse"
                aria-label="Menu"
                role="button"
                aria-controls="navigation"
              >
                <div className="hamburger-box">
                  <div className="hamburger-inner" />
                </div>
              </div>
            </a>
            <nav id="swup" className="site-head-left">
              <ul className="nav" role="menu">
                <li className="nav-about" role="menuitem">
                  <Link to={`/about`}>About</Link>
                </li>
                <li className="nav-tags" role="menuitem">
                  <Link to={`/tags`}>Tags</Link>
                </li>
                <li className="nav-tags" role="menuitem">
                  <Link to={`/policies`}>Policies</Link>
                </li>
                <li className="nav-tags" role="menuitem">
                  <Link to={`/`}>Home</Link>
                </li>
                <li className="nav-tags" role="menuitem">
                  <Link to={`/cart`}>Cart</Link>
                </li>
              </ul>
            </nav>
            <div className="site-head-center">
              <Link className="site-head-logo" to={`/`}>
                {title}
              </Link>
            </div>
            <div className="site-head-right">
              <div className="social-links">
                <a
                  href={`https://www.instagram.com/asdf/`}
                  title="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                {/* <a
                  href={`https://www.etsy.com/shop/${social.etsy}/`}
                  title="Etsy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Etsy
                </a> */}
              </div>
            </div>
          </div>
        </header>
        <main id="site-main" className="site-main">
          <div id="swup" className="transition-fade">
            {children}
          </div>
        </main>
        <footer className="site-foot">
          &copy; {new Date().getFullYear()} <Link to={`/`}>{title}</Link> &mdash;
          Built with{" "}
          <a
            href="https://gatsbyjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gatsby
          </a>
        </footer>
      </div>
    </ContextProvider>
  )
}

export default Layout
