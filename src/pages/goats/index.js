import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import SEO from '../../components/seo'

import Info from '../../components/info'
import Goats from '../../components/goats'
import KiddingSchedule from '../../components/kidding-schedule'

const GoatsPage = ({ data }) => (
  <Layout>
    <SEO title="Nigerian Dwarf Goats" />
    {/* TODO: style this so the images on the list page don't look awful*/}
    <div className="blah-blah">
      <Goats goats={data.allGoatsJson.edges} data={data}>
        <Info title="Does">
          <p>
            We keep a small herd of ADGA registered Nigerian Dwarf dairy goats,
            the pride and joy of Bird’s Eye Farm. Goats were among the first
            species domesticated by humans—at the dawn of agriculture, some
            10,000 years ago—and it’s no wonder. Humans just thrive better with
            goats around.
          </p>
          <p>
            Our herd tested negative for CAE, CL, OPP and Johne’s as of October
            2025.
          </p>
        </Info>
      </Goats>
    </div>
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
        gatsbyImageData(width: 412, height: 380, layout: CONSTRAINED)
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

export default GoatsPage
