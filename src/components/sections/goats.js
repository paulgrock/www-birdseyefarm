import React from 'react'
import PropTypes from 'prop-types'
import Title from '../section-title';
import Section from '../section-container';

import styles from './goats.module.css';

import { Link } from 'gatsby';
import zadie from '../../images/zadie.jpg';
import chimi from '../../images/chimi.jpg';

const Goat = ({img, body, age, title, link}) => {
	return (
		<div className={styles.goat}>
			{/* has purple top border */}
			<img src={img} alt={title} className={styles.photo} />
			<div className={styles.content}>
				<Title>
						<Link to={link}>{title}</Link>
				</Title>
				<p className={styles.body}>
					{body}
				</p>
				</div>
			</div>
	)
}

const Goats = (props) => {
  return (
	<Section id="goats" className={styles.container}>
	  <Title>Goats</Title>
		<Goat img={zadie} title="Zadie" link="/goats/zadie" age="2" body="Zadie is a petite, feminine doe who comes from a long line of great milkers. She stands 20.5” at the withers and has a level topline, straight front legs and nice rear leg angulation. Zadie has good body capacity and a mighty pretty little face. She’s a serious sweetheart, often going for the cuddles even before the treats. Petite though she is, Zadie is herd queen. When we take walks she always needs to be out front." />
		<Goat img={chimi} title="Chimi" link="/goats/chimi" age="2" body="Chimi is a powerful doe with great body capacity, standing 22 inches at the withers. She has a long, level topline, straight front legs and nice rear leg angulation.  Adorably frosted ears run in her family, making Chim look like a snow-flecked reindeer." />
	</Section>
  )
}

Goats.propTypes = {

}

export default Goats

