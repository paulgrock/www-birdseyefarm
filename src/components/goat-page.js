import React from 'react'

import Section from './section-container';
import Title from './section-title'

import * as styles from './goats.module.css'
import GoatBio from './goat-bio';


const Goat = ({goats, data, title}) => {
  return (
		<Section className={styles.container}>
      <Title>{title}</Title>
      {goats.map(({node}) => (
        <GoatBio {...node} key={node.slug} img={data.file} showCopy={true} withTitle={false} data={data} />
      ))}
    </Section>
  )
}

Goat.propTypes = {}

export default Goat
