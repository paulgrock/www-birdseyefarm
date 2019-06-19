import React from 'react'
import PropTypes from 'prop-types';
import Button from '../button'
import Title from '../section-title';
import Section from '../section-container'

import styles from './gallery.module.css';

import goats from '../../images/goats.jpg';
import artichoke from '../../images/artichoke.jpg';
import chicks from '../../images/chicks.jpg';
import pumpkin from '../../images/pumpkin.jpg';
import flowers from '../../images/flowers.jpg';
import ximena from '../../images/ximena.jpg';

import Info from '../info'

const Gallery = (props) => {
  return (
	<Section id="gallery" className={styles.galleryContainer}>
		<Info title="Welcome to our farm">
			<p>
			We live on 14 glorious acres in the town of Carlton, in Oregon's lush Willamette Valley. Here we grow produce and keep laying hens, dairy goats and honeybees. The Crew also includes a handsome pair of English Angora rabbits whose fur Emma spins into yarn. Emma also handles farm management, goat milking and the nursing of any unwell Crew members. Paul heads up our security division, intimidating foxes, hawks and other rascals. His duties also include building, fixing, hay hauling, barn mucking and web development.
			</p>
		</Info>
		<img src={goats} alt="Chimi clearing the fence" className={styles.galleryItem}/>
		<img src={artichoke} alt="Some of our fantastic artichokes" className={styles.galleryItem}/>
		<img src={chicks} alt="The trio: Aaliyah, Yvette, and Aretha" className={styles.galleryItem}/>
		<img src={flowers} alt="Some flowers" className={styles.galleryItem}/>
		<img src={pumpkin} alt="Paul showing off a large pumpkin" className={styles.galleryItem}/>
		<img src={ximena} alt="Ximena Chilling" className={styles.galleryItem}/>
		<div className={styles.buttonContainer}>
			<Button href="https://instagram.com/birds_eye_farm">View All</Button>
		</div>
	</Section>
  )
}

Gallery.propTypes = {

}

export default Gallery

