import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './header.module.css'

const isPartiallyActive = (props) => {
  console.log(props)
  console.log(props.isPartiallyCurrent)
  return props.isPartiallyCurrent
    ? { className: styles.activeNavLink }
    : null
}

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
        <li className={styles.navItem}>
          <Link getProps={isPartiallyActive} className={styles.navLink} to="#gallery">
            Gallery
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link getProps={isPartiallyActive} className={styles.navLink} to="#goats">
            Our Goats
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link getProps={isPartiallyActive} className={styles.navLink} to="#contact">
            Contact Us
          </Link>
        </li>
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
