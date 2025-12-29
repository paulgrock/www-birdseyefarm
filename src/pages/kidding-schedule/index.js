import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import KiddingSchedule from '../../components/kidding-schedule'

const KiddingSchedulePage = ({ data }) => (
  <Layout>
    <SEO title="Kidding Schedule" />
    <KiddingSchedule goats={data.allGoatsJson.edges} data={data} />
  </Layout>
)

export const query = graphql`
  query {
    allGoatsJson {
      edges {
        node {
          name
          date
          aka
          adgaPedigree
          slug
          pedigree
          sire {
            link
            name
            sire {
              name
              link
            }
            dam {
              name
              link
            }
          }
          dam {
            link
            name
            sire {
              name
              link
            }
            dam {
              name
              link
            }
          }
          notes
          mate {
            link
            slug
            name
          }
          prices
          kiddingDate
        }
      }
    }
    zadie: file(
      relativePath: { eq: "harley-hillside-ginger-zinger-profile.jpg" }
    ) {
      childImageSharp {
        gatsbyImageData(width: 507, height: 380, layout: CONSTRAINED)
      }
    }
    chimi: file(relativePath: { eq: "harley-hillside-dime-piece.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 380, height: 380, layout: CONSTRAINED)
      }
    }
    zora: file(relativePath: { eq: "birds-eye-farm-zora-neale.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 430, height: 380, layout: CONSTRAINED)
      }
    }
    ina: file(relativePath: { eq: "birds-eye-farm-ina-may-profile.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 507, height: 380, layout: CONSTRAINED)
      }
    }
    nib: file(relativePath: { eq: "diji-farm-cacao-nib-profile.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 380, height: 380, layout: CONSTRAINED)
      }
    }
    elena: file(
      relativePath: { eq: "birds-eye-farm-elena-ferrante-profile.jpg" }
    ) {
      childImageSharp {
        gatsbyImageData(width: 380, height: 308, layout: CONSTRAINED)
      }
    }
    lizzo: file(
      relativePath: { eq: "birds-eye-farm-lizabeth-darcy-profile.jpg" }
    ) {
      childImageSharp {
        gatsbyImageData(width: 380, height: 380, layout: CONSTRAINED)
      }
    }
    giana: file(
      relativePath: { eq: "birds-eye-farm-gianaclis-profile.jpg" }
    ) {
      childImageSharp {
        gatsbyImageData(width: 380, height: 285, layout: CONSTRAINED)
      }
    }
    masha: file(
      relativePath: { eq: "birds-eye-farm-masha-gessen-profile.jpg" }
    ) {
      childImageSharp {
        gatsbyImageData(width: 380, height: 285, layout: CONSTRAINED)
      }
    }
    gilia: file(
      relativePath: { eq: "birds-eye-farm-gilia-profile.jpg" }
    ) {
      childImageSharp {
        gatsbyImageData(width: 300, height: 300, layout: CONSTRAINED)
      }
    }
    tigris: file(relativePath: { eq: "tigris.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 150, height: 150, layout: CONSTRAINED)
      }
    }
    ed: file(relativePath: { eq: "ed.avif" }) {
      childImageSharp {
        gatsbyImageData(width: 150, height: 150, layout: CONSTRAINED)
      }
    }
    shaboozie: file(relativePath: { eq: "shaboozie.avif" }) {
      childImageSharp {
        gatsbyImageData(width: 150, height: 150, layout: CONSTRAINED)
      }
    }
    typhoon: file(relativePath: { eq: "typhoon.webp" }) {
      childImageSharp {
        gatsbyImageData(width: 150, height: 150, layout: CONSTRAINED)
      }
    }
    elohim: file(relativePath: { eq: "elohim.webp" }) {
      childImageSharp {
        gatsbyImageData(width: 150, height: 113, layout: CONSTRAINED)
      }
    }
    snow: file(relativePath: { eq: "snows-legacy.webp" }) {
      childImageSharp {
        gatsbyImageData(width: 150, height: 150, layout: CONSTRAINED)
      }
    }
    oliver: file(relativePath: { eq: "oliver.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 150, height: 150, layout: CONSTRAINED)
      }
    }
    austin: file(relativePath: { eq: "austin.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 150, height: 150, layout: CONSTRAINED)
      }
    }
    montego: file(relativePath: { eq: "montego.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 150, height: 150, layout: CONSTRAINED)
      }
    }
  }
`

export default KiddingSchedulePage
