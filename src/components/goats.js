import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import format from 'date-fns/format'

import Section from './section-container';
import Title from './section-title'

import styles from './goats.module.css'
import GoatBio from './goat-bio';

const Goats = ({goats, data, title}) => {
  return (
		<Section className={styles.container}>
      <Title>{title}</Title>
      {goats.map(({node}) => (
        <GoatBio {...node} key={node.slug} img={data[node.aka.toLowerCase()]} />
      ))}
    </Section>
  )
}

Goats.propTypes = {}

export default Goats
