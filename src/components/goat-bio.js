import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'gatsby'
import Img from 'gatsby-image'
import format from 'date-fns/format'

import Title from './section-title'
import styles from './goats.module.css'

const ParentText = ({type, grandParent}) => (
	<>
		<strong>{type}</strong>: {grandParent.link ? <a href={grandParent.link}>{grandParent.name}</a>: grandParent.name}
	</>
);

const GoatBio = ({ img, name, slug, adgaPedigree, date, sire, dam, copy, showCopy, withTitle = true }) => {
	return (
	  <div className={styles.goat}>
		{img && (
			<Img fluid={img.childImageSharp.fluid} alt={name} className={styles.photo} />
		)}

		<header className={styles.content}>
			{withTitle && (

				<Title>
				<Link to={`/goats/${slug}`}>{name}</Link>
			</Title>
			)}
		  <span>Born {format(date, "M/D/YYYY")}</span>
		  <br />
		  <a href={adgaPedigree}>ADGA Pedigree</a>

		  <ul className={styles.list}>
			<li className={styles.listItem}>
			  <strong>Sire</strong>:{' '}
			  <a href={sire.link}>
				{sire.name}
			  </a>
			</li>
			<li className={styles.listItem}>
				<ParentText type="SS" grandParent={sire.sire} />
			</li>
			<li className={styles.listItem}>
				<ParentText type="SD" grandParent={sire.dam} />
			</li>
			<li className={styles.listItem}>
			  <strong>Dam</strong>:{' '}
			  <a href={dam.link}>{dam.name}</a>
			</li>
			<li className={styles.listItem}>
				<ParentText type="DS" grandParent={dam.sire} />
			</li>
			<li className={styles.listItem}>
				<ParentText type="DD" grandParent={dam.dam} />
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
