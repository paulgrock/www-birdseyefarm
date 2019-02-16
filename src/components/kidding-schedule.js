
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import Section from './section-container';
import Title from './section-title'

const KiddingSchedule = ({mate, name, img, notes, prices, kiddingDate, slug, pedigree}) =>  (
	<tr>
	  <td>
		<figure>
		  <Img fixed={img.childImageSharp.fixed} alt={name} width="150px" height="150px"/>
		  <figcaption>
			<Link to={`/goats/${slug}`}>{name}</Link>
		  </figcaption>
		</figure>
	  </td>
	  <td>
		  <img src={mate.image} alt={mate.name} />
		  <figcaption>
			<Link to={mate.link}>{mate.name}</Link>
		  </figcaption>
	  </td>
	  <td>
		{kiddingDate}
	  </td>
	  <td>
		<a href={pedigree}>ADGA Pedigree</a>
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
	<Section className={'styles.container'}>
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
	</Section>
  )
}

KiddingScheduleContainer.propTypes = {

}

export default KiddingScheduleContainer;
