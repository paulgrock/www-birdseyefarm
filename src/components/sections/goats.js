import React from 'react'
import PropTypes from 'prop-types'
import Title from '../section-title';
import Section from '../section-container';

import { Link } from 'gatsby';

const Goats = (props) => {
  return (
	<Section id="goats">
	  <Title>Meet the Goats!</Title>
	  <Link to="/goats/zadie">Meet Zadie</Link>
	  <Link to="/goats/chimi">Meet Chimi</Link>
	</Section>
  )
}

Goats.propTypes = {

}

export default Goats

