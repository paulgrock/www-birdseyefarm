import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import Section from './section-container';
import Title from './section-title'

import styles from './goats.module.css'

const Goat = ({ img, name, slug, date, sire, dam }) => {
  return (
    <div className={styles.goat}>
      <Img fixed={img.childImageSharp.fixed} alt={name} className={styles.photo} />

      <div className={styles.content}>
        <Title>
          <Link to={`/goats/${slug}`}>{name}</Link>
        </Title>
        <span>Born {date}</span>

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
      </div>
    </div>
  )
}


const Goats = ({goats, data}) => {
  return (
		<Section className={styles.container}>
      <Title>Does</Title>
      {goats.map(({node}) => (
        <Goat {...node} key={node.slug} img={data[node.aka.toLowerCase()]} />
      ))}
    </Section>
  )
}

Goats.propTypes = {}

export default Goats
