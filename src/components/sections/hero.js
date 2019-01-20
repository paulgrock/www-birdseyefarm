import PropTypes from 'prop-types'
import React from 'react'

import styles from './hero.module.css'

import logo from '../../images/logo-large.png';

const Hero = ({ siteTitle }) => (
	<div className={styles.heroContainer}>
		<img src={logo} alt="Bird's Eye Farm" className={styles.logo}/>
		{/* slider probably goes here */}
	</div>
)

Hero.propTypes = {
  siteTitle: PropTypes.string,
}

Hero.defaultProps = {
  siteTitle: ``,
}

export default Hero
