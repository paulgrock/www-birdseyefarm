import React from 'react'

import { Link } from 'gatsby'
import Img from 'gatsby-image'
import format from 'date-fns/format'

import Title from './section-title'
import * as styles from './goats.module.css'

const ParentText = ({type, grandParent}) => (
	<>
		<strong>{type}</strong>: {grandParent.link ? <a href={grandParent.link}>{grandParent.name}</a>: grandParent.name}
	</>
);

const GoatBio = ({ img, name, slug, adgaPedigree, date, sire, dam, copy, showCopy, data, withTitle = true }) => {
	return (
	  <div className={styles.goat}>
		{img && img.childImageSharp && (
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

		{slug === 'harley-hillside-dime-piece' && data && (
			<>
				<Img fluid={data.udder.childImageSharp.fluid} alt="Dime Piece Udder"className={styles.photo} />
				<Img fluid={data.udder2.childImageSharp.fluid} alt="Dime Piece Udder"className={styles.photo} />
				<Img fluid={data.milkstand.childImageSharp.fluid} alt={name} className={styles.photo} />
			</>
		)}

		{['birds-eye-farm-zora-neale', 'birds-eye-farm-ina-may'].includes(slug) && data && (
			<Img fluid={data.young.childImageSharp.fluid} alt={`${name} Young`} className={styles.photo} />
		)}
	  </div>
	)
  }

  export default GoatBio;
