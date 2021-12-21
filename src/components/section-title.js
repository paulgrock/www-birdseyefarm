import React from 'react'
import PropTypes from 'prop-types'
import * as styles from './section-title.module.css'

const SectionTitle = ({children, className}) => {
  const classes = className ? `${styles.title} ${className}` : styles.title;
  return (
	<h3 className={classes}>{children}</h3>
  )
}

SectionTitle.propTypes = {

}

export default SectionTitle
