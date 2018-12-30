import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'gatsby';

const Goats = (props) => {
  return (
	<section id="goats">
	  <h3>Meet the Goats!</h3>
	  <Link to="/goats/zadie">Meet Zadie</Link>
	  <Link to="/goats/chimi">Meet Chimi</Link>
	</section>
  )
}

Goats.propTypes = {

}

export default Goats

