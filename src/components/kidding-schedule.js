import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { format } from 'date-fns'

import Section from './section-container'
import Title from './section-title'

import * as styles from './kidding-schedule.module.css'

const KiddingSchedule = ({
  mate,
  name,
  img,
  notes,
  prices,
  kiddingDate,
  slug,
  pedigree,
  mateImg,
}) => (
  <tr>
    <td>
      <figure>
        {img && img.childImageSharp && (
          <GatsbyImage
            image={img.childImageSharp.gatsbyImageData}
            alt={name}
            style={{ width: '150px', height: '150px' }}
            layout="fixed"
            objectFit='contain'
          />
        )}
        <figcaption>
          <Link to={`/goats/${slug}`}>{name.replace('(pending)', '').trim()}</Link>
        </figcaption>
      </figure>
    </td>
    <td>
      {mate?.name ? (
        <figure>
        <GatsbyImage
          image={mateImg?.childImageSharp?.gatsbyImageData}
          alt={mate.name}
          />
        <figcaption>
          <a href={mate.link} target="_blank">
            {mate.name}
          </a>
        </figcaption>
      </figure>
        ): "TBD"}
    </td>
    <td>
      {kiddingDate === 'TBD' ? kiddingDate : format(kiddingDate, 'MMM d, yyyy')}
      {kiddingDate === 'TBD' && (
        <>
          <br />
          <small>Likely late May</small>
        </>
      )}
    </td>
    <td>
      {Boolean(pedigree) && (
        <a href={pedigree} target="_blank">
          ADGA Planned Pedigree
        </a>
      )}
    </td>
    <td>
      {Boolean(notes?.length) &&
        notes.map((note) => (
          <p className={styles.note} key={note}>
            {note}
          </p>
        ))}
    </td>
    <td>
      {Boolean(prices?.length) &&
        prices.map((price) => (
          <p className={styles.note} key={price}>
            {price}
          </p>
        ))}
    </td>
  </tr>
)
const KiddingScheduleContainer = ({ goats, data }) => (
  <Section id="kidding-schedule">
    <Title>2026 Kidding Schedule</Title>
    <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            <td className={styles.tableHeading}>Dam</td>
            <td className={styles.tableHeading}>Sire</td>
            <td className={`${styles.tableHeading} ${styles.dueDateColumn}`}>
              Due Date
            </td>
            <td className={styles.tableHeading}>ADGA Pedigree</td>
            <td className={styles.tableHeading}>Notes</td>
            <td className={styles.tableHeading}>Fee</td>
          </tr>
        </thead>
        <tbody>
          {/* <tr span={6}>
            <td>
              <span
                style={{
                  padding: '20px',
                  display: 'inline-block',
                }}
              >
                Coming Soon
              </span>
            </td>
          </tr>*/}
          {goats
            .filter(({ node }) => !!node.kiddingDate)
            .map(({ node }) => {
              return (
                <KiddingSchedule
                  {...node}
                  key={node.slug}
                  img={data[node.aka.toLowerCase()]}
                  mateImg={data[node?.mate?.slug.toLowerCase()]}
                />
              )
            })}
        </tbody>
      </table>
    </div>
    <small className={styles.attribution}>
      Till-Riv BNS Smooth Edition *B, and Diji Farm DJ Shaboozie *B
      appear courtesy of{' '}
      <a href="https://www.dijifarm.com" target="_blank">
        Diji Farm
      </a>
      .
    </small>
  </Section>
)

KiddingScheduleContainer.propTypes = {}

export default KiddingScheduleContainer
