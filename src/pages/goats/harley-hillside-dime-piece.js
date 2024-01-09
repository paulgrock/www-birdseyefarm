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
        fluid(maxWidth: 760, maxHeight: 760) {
          ...GatsbyImageSharpFluid
        }
        fixed(width: 300, height: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    other: file(relativePath: { eq: "harley-hillside-dime-piece-udder.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 285, maxHeight: 380) {
          ...GatsbyImageSharpFluid
        }
        fixed(width: 113, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    bottom: file(relativePath: { eq: "harley-hillside-dime-piece-udder-two.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 285, maxHeight: 380) {
          ...GatsbyImageSharpFluid
        }
        fixed(width: 113, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    young: file(relativePath: { eq: "chimi-other.jpg" }) {
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
