import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'gatsby'
import Img from 'gatsby-image'
import format from 'date-fns/format'

import Title from './section-title'
import styles from './goats.module.css'
const GoatBio = ({ img, name, slug, date, sire, dam, copy, showCopy, withTitle = true }) => {
	return (
	  <div className={styles.goat}>
		<Img fluid={img.childImageSharp.fluid} alt={name} className={styles.photo} />

		<header className={styles.content}>
			{withTitle && (

				<Title>
				<Link to={`/goats/${slug}`}>{name}</Link>
			</Title>
			)}
		  <span>Born {format(date, "M/D/YYYY")}</span>

		  <ul className={styles.list}>
			<li className={styles.listItem}>
			  <strong>Sire</strong>:{' '}
			  <a href={sire.link}>
				{sire.name}
			  </a>
			</li>
			<li className={styles.listItem}>
			  <strong>SS</strong>: {sire.sire.name}
			</li>
			<li className={styles.listItem}>
			  <strong>SD</strong>: {sire.dam.name}
			</li>
			<li className={styles.listItem}>
			  <strong>Dam</strong>:{' '}
			  <a href={dam.link}>
			  {dam.name}
			  </a>
			</li>
			<li className={styles.listItem}>
			  <strong>DS</strong>: {dam.sire.name}
			</li>
			<li className={styles.listItem}>
			  <strong>DD</strong>: {dam.dam.name}
			</li>
		  </ul>
		</header>
		{showCopy && (
			copy.map((content, idx) => (
				<p className={styles.bodyContent} key={idx}>{content}</p>
			))
		)}

		{/* {slug === 'harley-hillside-dime-piece' && (
			<>
				<Img src="../images/chimi-udder.jpg" alt="Dime Piece Udder" />
				<Img src="../images/chimi-udder.jpg" alt="Dime Piece Udder" />
			</>
		)} */}
	  </div>
	)
  }

  export default GoatBio;
