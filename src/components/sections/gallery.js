import React from 'react'
import PropTypes from 'prop-types';
import Button from '../button'

import styles from './gallery.module.css'

const Gallery = (props) => {
  return (
	<section id="gallery" className={styles.galleryContainer}>
		<h3>Welcome to our farm</h3>
		<Button>View All</Button>
	</section>
  )
}

Gallery.propTypes = {

}

export default Gallery

