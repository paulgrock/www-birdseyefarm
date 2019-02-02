import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import Title from './section-title'

import styles from './goats.module.css'

import zadie from '../images/zadie.jpg'
import chimi from '../images/chimi.jpg'

const Goat = ({ img, children, date, title, link }) => {
  return (
    <div className={styles.goat}>
      {/* has purple top border */}
      <img src={img} alt={title} className={styles.photo} />

      <div className={styles.content}>
        <Title>
          <Link to={link}>{title}</Link>
        </Title>
        <span>Born {date}</span>
        <p className={styles.body}>{children}</p>
      </div>
    </div>
  )
}

const Goats = props => {
  return (
		<Fragment>
      <Goat
        img={zadie}
        title="Harley Hillside Ginger Zinger"
        link="/goats/harley-hillside-ginger-zinger"
        date="2/1/2017"
      >
        <ul>
          <li>
            <strong>Sire</strong>:{' '}
            <a href="https://curbstonevalley.com/blog/?page_id=13133">
              Castle Rock Roxstar
            </a>
          </li>
          <li>
            <strong>SS</strong>: Caprine Acres HS Cooper
          </li>
          <li>
            <strong>SD</strong>: GCH CRF Castle Rock Roxanne 1*M *D VEEE 91
          </li>
          <li>
            <strong>Dam</strong>:{' '}
            <a href="https://harleyhillsidefarm.com/ff/">
              Harley Hillside iHeart Chai VVV+ 85
            </a>
          </li>
          <li>
            <strong>DS</strong>: Castle Rock Clark's Nutcracker
          </li>
          <li>
            <strong>DD</strong>: SGCH Castle Rock Breakin My Heart 6*M VEEE 90
          </li>
        </ul>
      </Goat>
      <Goat
        img={chimi}
        title="Harley Hillside Dime Piece"
        link="/goats/harley-hillside-dime-piece"
        date="2/3/2017"
      >
        <ul>
          <li>
            <strong>Sire</strong>:{' '}
            <a href="https://curbstonevalley.com/blog/?page_id=13133">
              Castle Rock Roxstar
            </a>
          </li>
          <li>
            <strong>SS</strong>: Caprine Acres HS Cooper
          </li>
          <li>
            <strong>SD</strong>: GCH CRF Castle Rock Roxanne 1*M
          </li>
          <li>
            <strong>Dam</strong>:{' '}
            <a href="https://curbstonevalley.com/blog/?page_id=13124">
              Castle Rock Worth Every Penny 3*M *D AR 3059
            </a>
          </li>
          <li>
            <strong>DS</strong>: SG Castle Rock Cleveland Sage +*B *S **Elite Sire** 2015/16
          </li>
          <li>
            <strong>DD</strong>: GCH Castle Rock Penny For Luck 2*M VEVV 89
          </li>
        </ul>
      </Goat>
			</Fragment>
  )
}

Goats.propTypes = {}

export default Goats
