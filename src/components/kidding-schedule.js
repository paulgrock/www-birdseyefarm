
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import format from 'date-fns/format'

import Section from './section-container';
import Title from './section-title'

import styles from './kidding-schedule.module.css';

const KiddingSchedule = ({mate, name, img, notes, prices, kiddingDate, slug, pedigree}) =>  (
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
		  <img src={mate.image} alt={mate.name} />
		  <figcaption>
				<a href={mate.link}>{mate.name}</a>
		  </figcaption>
		</figure>
	  </td>
	  <td>
		{format(kiddingDate, 'MMM D, YYYY')}
	  </td>
	  <td>
		<a href={pedigree}>ADGA Planned Pedigree</a>
	  </td>
	  <td>
		{notes.map(note => <p key={note}>{note}</p>)}
	  </td>
	  <td>
		{prices.map(price => <p key={price}>{price}</p>)}
	  </td>
	</tr>
  )
const KiddingScheduleContainer = ({goats, data}) => {
  return (
	<Section className={'styles.container'} id="kidding-schedule">
		<Title>2019 Kidding Schedule</Title>
		<table>
		<thead>
			<tr>
			<td>Dam</td>
			<td>Sire</td>
			<td>Date</td>
			<td>ADGA Pedigree</td>
			<td>Notes</td>
			<td>Price</td>
			</tr>
		</thead>
		<tbody>
			{goats.map(({node}) => (
			<KiddingSchedule {...node} key={node.slug} img={data[node.aka.toLowerCase()]} />
			))}
		</tbody>
		</table>
		<small className={styles.attribution}>Tigris appears courtesy of Dog Island Farm</small>
	</Section>
  )
}

KiddingScheduleContainer.propTypes = {

}

export default KiddingScheduleContainer;
