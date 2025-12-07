import React from 'react'

import Section from './section-container';

import * as styles from './goats.module.css'
import GoatBio from './goat-bio';

const Goats = ({goats, data, children}) => {
  return (
		<Section className={`${styles.container} ${styles.goatList}`}>
      {children}
      {goats.map(({node}) => (
        <GoatBio {...node} key={node.slug} img={data[node.aka.toLowerCase()]} />
      ))}
    </Section>
  )
}

export default Goats
