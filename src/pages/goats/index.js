import React from 'react'
import { graphql } from "gatsby";
import Layout from '../../components/layout'
import SEO from '../../components/seo'

import Goats from '../../components/goats';

const GoatsPage = ({data}) => (
  <Layout>
    <SEO title="Nigerian Dwarf Goats" />
    <Goats goats={data.allGoatsJson.edges} data={data} />
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
          slug
          sire {
            link
            name
            sire {
              name
            }
            dam {
              name
            }
          }
          dam {
            link
            name
            sire {
              name
            }
            dam {
              name
            }
          }
        }
      }
    }
    zadie: file(relativePath: { eq: "harley-hillside-ginger-zinger.jpg" }) {
      childImageSharp {
        fixed(width: 380, height: 380) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    chimi: file(relativePath: { eq: "harley-hillside-dime-piece.jpg" }) {
      childImageSharp {
        fixed(width: 380, height: 380) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

export default GoatsPage
