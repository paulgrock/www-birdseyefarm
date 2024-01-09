import React from 'react'
import { graphql } from "gatsby";
import Layout from '../../components/layout'
import SEO from '../../components/seo'

import GoatPage from '../../components/goat-page';

function Zadie({data}) {
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
		allGoatsJson(filter: {slug: {eq:"harley-hillside-ginger-zinger"}}) {
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
    file(relativePath: { eq: "harley-hillside-ginger-zinger-profile.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 507, maxHeight: 380) {
          ...GatsbyImageSharpFluid
        }
        fixed(width: 200, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
		}
    other: file(relativePath: { eq: "harley-hillside-ginger-zinger-udder.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 285, maxHeight: 380) {
          ...GatsbyImageSharpFluid
        }
        fixed(width: 113, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
		}
    bottom: file(relativePath: { eq: "harley-hillside-ginger-zinger-udder-two.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 285, maxHeight: 380) {
          ...GatsbyImageSharpFluid
        }
        fixed(width: 113, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
		}
		young: file(relativePath: { eq: "zadie-other.jpg" }) {
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

/*
*/

export default Zadie;
