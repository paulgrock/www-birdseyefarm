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
		allGoatsJson(filter: {slug: {eq:"birds-eye-farm-lizabeth-darcy"}}) {
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
    file(relativePath: { eq: "birds-eye-farm-lizabeth-darcy-profile.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 380, maxHeight: 380) {
          ...GatsbyImageSharpFluid
        }
        fixed(width: 150, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    young: file(relativePath: { eq: "birds-eye-farm-lizabeth-darcy-young.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 491, maxHeight: 380) {
          ...GatsbyImageSharpFluid
        }
        fixed(width: 194, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    # bottom: file(relativePath: { eq: "diji-farm-cacao-nib-bottom.jpg" }) {
    #   childImageSharp {
    #     fluid(maxWidth: 380, maxHeight: 380) {
    #       ...GatsbyImageSharpFluid
    #     }
    #     fixed(width: 150, height: 150) {
    #       ...GatsbyImageSharpFixed
    #     }
    #   }
    # }
	}
`

export default Ina;
