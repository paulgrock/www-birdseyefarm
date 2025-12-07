import React from 'react'
import { graphql } from "gatsby";
import Layout from '../../components/layout'
import SEO from '../../components/seo'

import GoatPage from '../../components/goat-page';

function Masha({data}) {
	const {edges} = data.allGoatsJson;
  return (
		<Layout>
		<SEO title={edges[0].node.name} description={`Information about ${edges[0].node.name}, a Nigerian Dwarf Goat`} />
		<GoatPage goats={edges} data={data} title={edges[0].node.name} />
		</Layout>
  )
}


export const query = graphql`
  query {
		allGoatsJson(filter: {slug: {eq:"birds-eye-farm-masha-gessen"}}) {
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
    file(relativePath: { eq: "birds-eye-farm-masha-gessen-profile.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 380, height: 285, layout: CONSTRAINED)
      }
    }
    other: file(relativePath: { eq: "birds-eye-farm-masha-and-zora.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 380, height: 380, layout: CONSTRAINED)
      }
    }
    young: file(relativePath: { eq: "birds-eye-farm-masha-with-laila.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 380, height: 380, layout: CONSTRAINED)
      }
    }
	}
`

export default Masha;
