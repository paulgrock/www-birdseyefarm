
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import format from 'date-fns/format'

import Section from './section-container';
import Title from './section-title'

import * as styles from './kidding-schedule.module.css';

const KiddingSchedule = ({mate, name, img, notes, prices, kiddingDate, slug, pedigree, mateImg}) => (
	<tr>
	  <td>
		<figure>
		  <img src={img.childImageSharp.fixed.src} alt={name} />
		  <figcaption>
			<Link to={`/goats/${slug}`}>{name}</Link>
		  </figcaption>
		</figure>
	  </td>
	  <td>
		<figure>
		  <img src={mateImg.childImageSharp.fixed.src} alt={mate.name} />
		  <figcaption>
				<a href={mate.link} target="_blank">{mate.name}</a>
		  </figcaption>
		</figure>
	  </td>
	  <td>
		{format(kiddingDate, 'MMM D, YYYY')}
	  </td>
	  <td>
		<a href={pedigree} target="_blank">ADGA Planned Pedigree</a>
	  </td>
	  <td>
		{notes.map(note => <p className={styles.note} key={note}>{note}</p>)}
	  </td>
	  <td>
		{prices.map(price => <p className={styles.note} key={price}>{price}</p>)}
	  </td>
	</tr>
)
const KiddingScheduleContainer = ({goats, data}) => (
	<Section id="kidding-schedule">
		<Title>2019 Kidding Schedule</Title>
		<table>
		<thead>
			<tr>
				<td className={styles.tableHeading}>Dam</td>
				<td className={styles.tableHeading}>Sire</td>
				<td className={styles.tableHeading}>Due Date</td>
				<td className={styles.tableHeading}>ADGA Pedigree</td>
				<td className={styles.tableHeading}>Notes</td>
				<td className={styles.tableHeading}>Fee</td>
			</tr>
		</thead>
		<tbody>
			{goats.map(({node}) => (
				<KiddingSchedule {...node} key={node.slug} img={data[node.aka.toLowerCase()]} mateImg={data[node.mate.slug.toLowerCase()]} />
			)
			)}
		</tbody>
		</table>
		<small className={styles.attribution}>Tigris appears courtesy of <a href="http://dogislandfarm.com" target="_blank">Dog Island Farm</a>.</small>
	</Section>
)

KiddingScheduleContainer.propTypes = {

}

export default KiddingScheduleContainer;
