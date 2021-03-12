import React from 'react'
import { graphql } from "gatsby";
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
		allGoatsJson(filter: {slug: {eq:"birds-eye-farm-ina-may"}}) {
      edges {
        node {
          name
          date
          aka
          slug
          pedigree
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
					copy
        }
      }
    }
    file(relativePath: { eq: "birds-eye-farm-ina-may.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 380, maxHeight: 380) {
          ...GatsbyImageSharpFluid
        }
        fixed(width: 150, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
	}
`

export default Ina;
