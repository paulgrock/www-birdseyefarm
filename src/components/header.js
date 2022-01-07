import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import * as styles from './header.module.css'

const isPartiallyActive = (props) => {
  return props.isPartiallyCurrent
    ? { className: `${styles.activeNavLink} ${styles.navLink}` }
    : null
}

const Header = ({ siteTitle }) => (
  <header className={styles.header}>
    <h1 className={styles.title}>
      <Link to="/">
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
          <Link getProps={isPartiallyActive} className={styles.navLink} to="/goats">
            Goats
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link getProps={isPartiallyActive} className={styles.navLink} to="/goats#kidding-schedule">
            Kidding Schedule
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
