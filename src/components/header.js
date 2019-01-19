import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './header.module.css'

const Header = ({ siteTitle }) => (
  <header className={styles.header}>
    <h1 style={{ margin: 0 }}>
      <Link
        to="/"
        className={styles.title}
      >
        {siteTitle}
      </Link>
    </h1>
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.navItem}><a href="/#gallery">Gallery</a></li>
        <li className={styles.navItem}><a href="/#goats">Our Goats</a></li>
        <li className={styles.navItem}><a href="/#contact">Contact Us</a></li>
      </ul>
    </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
