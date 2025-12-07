import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import SEO from '../../components/seo'

import GoatPage from '../../components/goat-page'

function Zora({ data }) {
  const { edges } = data.allGoatsJson
  return (
    <Layout>
      <SEO
        title={edges[0].node.name}
        description={`Information about ${edges[0].node.name}, a Nigerian Dwarf Goat`}
      />
      <GoatPage goats={edges} data={data} title={edges[0].node.name} />
    </Layout>
  )
}

export const query = graphql`
  query {
    allGoatsJson(filter: { slug: { eq: "birds-eye-farm-zora-neale" } }) {
      edges {
        node {
          name
          date
          aka
          slug
          adgaPedigree
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
          copy
        }
      }
    }
    file(relativePath: { eq: "birds-eye-farm-zora-neale/zora-neale.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 412, height: 380, layout: CONSTRAINED)
      }
    }
    other: file(
      relativePath: { eq: "harley-hillside-ginger-zinger/udder-two.jpg" }
    ) {
      childImageSharp {
        gatsbyImageData(width: 285, height: 380, layout: CONSTRAINED)
      }
    }
    bottom: file(relativePath: { eq: "birds-eye-farm-zora-neale/other.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 380, height: 380, layout: CONSTRAINED)
      }
    }
    young: file(relativePath: { eq: "birds-eye-farm-zora-neale/young.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 380, height: 380, layout: CONSTRAINED)
      }
    }
  }
`

export default Zora
