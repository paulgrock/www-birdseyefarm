import React from 'react'
import { graphql } from "gatsby";
import Layout from '../../components/layout'
import SEO from '../../components/seo'

import Info from '../../components/info'
import Goats from '../../components/goats';
// import KiddingSchedule from '../../components/kidding-schedule';

const GoatsPage = ({data}) => (
  <Layout>
    <SEO title="Nigerian Dwarf Goats" />
    <Goats goats={data.allGoatsJson.edges} data={data}>
      <Info title="Does">
        <p>
        We keep a small herd of ADGA registered Nigerian Dwarf dairy goats, the pride and joy of Bird’s Eye Farm. Goats were among the first species domesticated by humans—at the dawn of agriculture, some 10,000 years ago—and it’s no wonder. Humans just thrive better with goats around.
        </p>
        <p>Our herd tested negative for CAE, CL, OPP and Johne’s as of November 2021.</p>
      </Info>
    </Goats>
    {/* <KiddingSchedule goats={data.allGoatsJson.edges} data={data} /> */}
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
    zadie: file(relativePath: { eq: "harley-hillside-ginger-zinger.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 380, maxHeight: 380) {
          ...GatsbyImageSharpFluid
        }
        fixed(width: 150, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    chimi: file(relativePath: { eq: "harley-hillside-dime-piece.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 380, maxHeight: 380) {
          ...GatsbyImageSharpFluid
        }
        fixed(width: 150, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    zora: file(relativePath: { eq: "birds-eye-farm-zora-neale.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 380, maxHeight: 380) {
          ...GatsbyImageSharpFluid
        }
        fixed(width: 150, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    ina: file(relativePath: { eq: "birds-eye-farm-ina-may.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 380, maxHeight: 380) {
          ...GatsbyImageSharpFluid
        }
        fixed(width: 150, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    tigris: file(relativePath: { eq: "tigris.jpg" }) {
      childImageSharp {
        fixed(width: 150, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

export default GoatsPage
