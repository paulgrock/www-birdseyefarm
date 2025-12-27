import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'
import andda from '../images/andda-logo.png'
import adga from '../images/adga-logo.avif'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div className="pageContainer">
        <Header siteTitle={data.site.siteMetadata.title} />
        <main className="main-content">
          {children}
          <footer className="footer">
            <img src={andda} alt="ANDDA member" height="92"  />
            © {new Date().getFullYear()} Bird’s Eye Farm | Carlton, OR
            <img src={adga} alt="ADGA member" />
          </footer>
        </main>
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
