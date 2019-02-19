import PropTypes from 'prop-types'
import React from 'react';

import Section from '../section-container'
import styles from './hero.module.css';

import logo from '../../images/logo-large.png';

const Hero = ({ siteTitle }) => (
	<Section className={styles.heroContainer}>
		<div className={styles.bgi}></div>
		<img src={logo} alt="Bird's Eye Farm" className={styles.logo}/>
		{/* slider probably goes here */}
	</Section>
)

Hero.propTypes = {
  siteTitle: PropTypes.string,
}

Hero.defaultProps = {
  siteTitle: ``,
}

export default Hero
