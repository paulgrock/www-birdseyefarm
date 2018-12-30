import PropTypes from 'prop-types'
import React from 'react'

import containerStyles from './hero.module.css'

import logo from '../../images/logo-large.png';

const Hero = ({ siteTitle }) => (
	<div className={containerStyles.heroContainer}>
		<img src={logo} alt="Bird's Eye Farm"/>
	</div>
)

Hero.propTypes = {
  siteTitle: PropTypes.string,
}

Hero.defaultProps = {
  siteTitle: ``,
}

export default Hero
