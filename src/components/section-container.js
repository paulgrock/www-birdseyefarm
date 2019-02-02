import React from 'react'
import PropTypes from 'prop-types'
import styles from './section-container.module.css';

const SectionContainer = ({children, className, ...rest}) => {
  return (
	<section className={`${styles.container} ${className}`} {...rest}>
	  {children}
	</section>
  )
}

SectionContainer.propTypes = {

}

export default SectionContainer
