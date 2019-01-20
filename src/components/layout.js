import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'

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
            © {new Date().getFullYear()} Bird’s Eye Farm, Oakland California
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
