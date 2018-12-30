import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <header
  >
    <div
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `black`,
            textDecoration: `none`,
            fontWeight: 'bold',
            fontFamily: 'amatic sc',
            fontSize: '45px',
            textTransform: 'uppercase'
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <nav>
        <ul>
          <li><a href="/#gallery">Gallery</a></li>
          <li><a href="/#goats">Our Goats</a></li>
          <li><a href="/#contact">Contact Us</a></li>
        </ul>
      </nav>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
