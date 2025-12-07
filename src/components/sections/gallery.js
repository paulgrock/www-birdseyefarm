import React from 'react'
import PropTypes from 'prop-types'
import Button from '../button'
import Title from '../section-title'
import Section from '../section-container'

import * as styles from './gallery.module.css'

import bia from '../../images/image-gallery/bia.jpg'
import garden from '../../images/image-gallery/garden.jpg'
import bee from '../../images/image-gallery/bee.jpg'
import flock from '../../images/image-gallery/flock.jpg'
import goats from '../../images/image-gallery/goats.jpg'
import wings from '../../images/image-gallery/wings.jpg'
import cheese from '../../images/image-gallery/cheese.jpg'
import emma from '../../images/image-gallery/emma.jpg'
import laila from '../../images/image-gallery/laila.jpg'
import family from '../../images/family.jpg'

import Info from '../info'

const Gallery = (props) => {
  return (
    <Section id="gallery" className={styles.galleryContainer}>
      <Info title="Welcome to our farm">
        <img src={family} alt="Family photo" className={styles.mainPhoto} />
        <p>
          We live on 14 glorious acres in Yamhill County, a vibrantly rural
          piece of Oregon’s lush Willamette Valley. Here we grow produce and
          keep dairy goats, laying hens, guard geese, honeybees and fiber
          rabbits. Emma is the farmstead’s resident gardener, food processor,
          hoof pedicurist, amateur poultry nurse and dreamer/planner. Paul heads
          up buildings and security and also handles hay hauling, compost
          management, dreams/plans implementation and web development. Laila is
          in charge of berry picking, radish pulling and spoiling bantam hens.
        </p>
      </Info>
      <img
        src={goats}
        alt="The goat herd"
        className={styles.galleryItem}
      />
      <img
        src={wings}
        alt="Paul showing off his wings"
        className={styles.galleryItem}
      />
      <img src={cheese} alt="Bird's Eye Farm cheese" className={styles.galleryItem} />
      <img src={garden} alt="The garden in all it's glory" className={styles.galleryItem} />
      <img src={bia} alt="Bia in hand" className={styles.galleryItem} />
      <img src={emma} alt="Emma in the flower patch " className={styles.galleryItem} />
       <img src={laila} alt="Laila picking vegetables" className={styles.galleryItem} />
      <img
        src={flock}
        alt="The flock"
        className={styles.galleryItem}
      />
      <img
        src={bee}
        alt="Honey bee on Gilia Tri Color"
        className={styles.galleryItem}
      />
      <div className={styles.buttonContainer}>
        <Button href="https://instagram.com/birds_eye_farm">View All</Button>
      </div>
    </Section>
  )
}

Gallery.propTypes = {}

export default Gallery
