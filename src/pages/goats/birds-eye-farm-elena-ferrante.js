import React from 'react'
import { graphql } from "gatsby"
import Layout from '../../components/layout'
import SEO from '../../components/seo'

import GoatPage from '../../components/goat-page';

function Ina({data}) {
	const {edges} = data.allGoatsJson;
  return (
		<Layout>
		<SEO title="Nigerian Dwarf Goats" title={edges[0].node.name} />
		<GoatPage goats={edges} data={data} title={edges[0].node.name} />
		</Layout>
  )
}


export const query = graphql`
  query {
		allGoatsJson(filter: {slug: {eq:"birds-eye-farm-elena-ferrante"}}) {
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
    file(relativePath: { eq: "birds-eye-farm-elena-ferrante-profile.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 380, height: 308, layout: CONSTRAINED)
      }
    }
    bottom: file(relativePath: { eq: "birds-eye-farm-elena-ferrante-udder.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 380, height: 380, layout: CONSTRAINED)
      }
    }
    other: file(relativePath: { eq: "birds-eye-farm-elena-ferrante-other.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 380, height: 380, layout: CONSTRAINED)
      }
    }
    young: file(relativePath: { eq: "birds-eye-farm-ina-may-other.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 380, height: 380, layout: CONSTRAINED)
      }
    }
	}
`

export default Ina;
