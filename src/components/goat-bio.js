import React from 'react'

import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { format } from 'date-fns'

import Title from './section-title'
import * as styles from './goats.module.css'

const ParentText = ({ type, grandParent }) => (
  <>
    <strong>{type}</strong>:{' '}
    {grandParent.link ? (
      <a href={grandParent.link}>{grandParent.name}</a>
    ) : (
      grandParent.name
    )}
  </>
)

const GoatBio = ({
  img,
  name,
  slug,
  adgaPedigree,
  date,
  sire,
  dam,
  copy,
  showCopy,
  data,
  withTitle = true,
}) => {
  return (
    <div className={styles.goat}>
      {img && img.childImageSharp && (
        <GatsbyImage
          image={getImage(img)}
          alt={name}
          className={styles.photo}
        />
      )}

      <header className={styles.content}>
        {withTitle && (
          <Title>
            <Link to={`/goats/${slug}`}>{name}</Link>
          </Title>
        )}
        <span>Born {format(date, 'M/d/yyyy')}</span>
        <br />
        <a href={adgaPedigree}>ADGA Pedigree</a>

        <ul className={styles.list}>
          <li className={styles.listItem}>
            <strong>Sire</strong>: <a href={sire.link}>{sire.name}</a>
          </li>
          <li className={styles.listItem}>
            <ParentText type="SS" grandParent={sire.sire} />
          </li>
          <li className={styles.listItem}>
            <ParentText type="SD" grandParent={sire.dam} />
          </li>
          <li className={styles.listItem}>
            <strong>Dam</strong>: <a href={dam.link}>{dam.name}</a>
          </li>
          <li className={styles.listItem}>
            <ParentText type="DS" grandParent={dam.sire} />
          </li>
          <li className={styles.listItem}>
            <ParentText type="DD" grandParent={dam.dam} />
          </li>
        </ul>
      </header>
      {showCopy &&
        copy.map((content, idx) => (
          <p
            className={styles.bodyContent}
            key={idx}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ))}

      {data && data.udder && data.udder2 && (
        <>
          <GatsbyImage
            image={data.udder.childImageSharp.gatsbyImageData}
            alt="Dime Piece Udder"
            className={styles.photo}
          />
          <GatsbyImage
            image={data.udder2.childImageSharp.gatsbyImageData}
            alt="Dime Piece Udder"
            className={styles.photo}
          />
        </>
      )}

      {data && data.other && (
        <>
          <GatsbyImage
            image={data.other.childImageSharp.gatsbyImageData}
            alt={name}
            className={styles.photo}
          />
        </>
      )}

      {data && data.bottom && (
        <>
          <GatsbyImage
            image={data.bottom.childImageSharp.gatsbyImageData}
            alt={name}
            className={styles.photo}
          />
        </>
      )}

      {data?.young && (
        <GatsbyImage
          image={data.young.childImageSharp.gatsbyImageData}
          alt={`${name} Young`}
          className={styles.photo}
        />
      )}
    </div>
  )
}

export default GoatBio
