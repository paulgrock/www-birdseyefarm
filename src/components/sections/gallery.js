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
			We live on 14 glorious acres in Yamhill County, a vibrantly rural piece of Oregon’s lush Willamette Valley. Here we grow produce and keep dairy goats, laying hens, honeybees and fiber rabbits. Emma is the farmstead’s resident gardener, chief milker, hoof pedicurist, Angora spinner and dreamer/planner. Paul heads up our buildings and security division and also handles hay hauling, barn mucking, compost management, dreams/plans implementation and web development. Laila is in charge of bunny appreciation and is training to be an egg collector, specializing in obscure nests.
			</p>
			<h2>2021 UPDATE</h2>
			<p>
				Well, folks: our first kidding season was a wondrous affair. We retained three lovely does and got to see what our gals can do on the milk stand. (They slay.) But these thrilling events collided with other thrilling events in our lives. We moved from Oakland, California to rural Oregon, got married in our new backyard and welcomed our daughter, Laila. (It’s fun being pregs along with your best goat friends!) After 2019’s wild ride we needed a break and figured 2020 could be our chill year off before returning to milking. Instead it was, well, 2020. Paul was feeding the chickens with Laila in one arm and a coding review Zoom meeting in the other. Now that life is becoming manageable, we are excited to get our herd back to work. We plan to breed this fall and expect kids in spring of 2022. We’ll post our breeding schedule once it’s set. Meantime, if you have any questions about breeding plans don’t hesitate to message us.
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

