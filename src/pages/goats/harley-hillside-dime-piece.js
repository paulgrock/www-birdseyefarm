import React from 'react'
import { graphql } from "gatsby";
import Layout from '../../components/layout'
import SEO from '../../components/seo'

import GoatPage from '../../components/goat-page';

function Chimi({data}) {
	const {edges} = data.allGoatsJson;
  return (
		<Layout>
		<SEO title="Nigerian Dwarf Goats" title={edges[0].node.name} />
		<GoatPage goats={edges} data={data} title={edges[0].node.name} />
		</Layout>
  )
}

Chimi.propTypes = {

}


export const query = graphql`
  query {
		allGoatsJson(filter: {slug: {eq:"harley-hillside-dime-piece"}}) {
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
    file(relativePath: { eq: "harley-hillside-dime-piece.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 760, height: 760, layout: CONSTRAINED)
      }
    }
    other: file(relativePath: { eq: "harley-hillside-dime-piece-udder.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 285, height: 380, layout: CONSTRAINED)
      }
    }
    bottom: file(relativePath: { eq: "harley-hillside-dime-piece-udder-two.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 285, height: 380, layout: CONSTRAINED)
      }
    }
	}
`

export default Chimi;
