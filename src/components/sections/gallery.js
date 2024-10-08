import React from 'react'
import PropTypes from 'prop-types';
import Button from '../button'
import Title from '../section-title';
import Section from '../section-container'

import * as styles from './gallery.module.css';

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
			We live on 14 glorious acres in Yamhill County, a vibrantly rural piece of Oregon’s lush Willamette Valley. Here we grow produce and keep dairy goats, laying hens, guard geese, honeybees and fiber rabbits. Emma is the farmstead’s resident gardener, food processor, hoof pedicurist, amateur poultry nurse and dreamer/planner. Paul heads up buildings and security and also handles hay hauling, compost management, dreams/plans implementation and web development. Laila is in charge of berry picking, radish pulling and spoiling bantam hens.
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

