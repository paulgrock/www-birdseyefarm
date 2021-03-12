import React from 'react'
import PropTypes from 'prop-types'
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
					copy
        }
      }
    }
    file(relativePath: { eq: "harley-hillside-dime-piece.jpg" }) {
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

export default Chimi;
