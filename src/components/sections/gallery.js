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

const Gallery = (props) => {
  return (
	<Section id="gallery" className={styles.galleryContainer}>
		<div className={styles.heading}>
			<Title className={styles.title}>Welcome to our farm</Title>
			<p>
			We live on a quarter-acre urban farm on the glorious sunny side of the Bay in Oakland, California. On this modest patch of earth we grow produce and keep laying hens, dairy goats and honeybees. The Crew also includes a handsome pair of English Angora rabbits whom Emma grooms unceasingly, the spare wool to become yarn via an old-school drop spindle. In addition to fiber work, Emma handles farm management, goat milking and nursing any unwell Crew members. Paul heads up our security division, intimidating foxes, hawks and other rascals. His duties also include building, fixing, hay hauling, barn mucking and web development.
			</p>
		</div>
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

