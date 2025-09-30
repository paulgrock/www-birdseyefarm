import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

/*
 * This component is built using `gatsby-plugin-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `StaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-plugin-image`: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/
 * - `StaticQuery`: https://www.gatsbyjs.com/docs/how-to/querying-data/static-query/
 */

const Image = () => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "logo-large.png" }) {
          childImageSharp {
            gatsbyImageData(width: 300, layout: CONSTRAINED)
          }
        }
      }
    `}
    render={data => <GatsbyImage image={getImage(data.placeholderImage)} alt="Logo" />}
  />
)
export default Image
