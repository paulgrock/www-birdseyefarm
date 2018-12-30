import React from 'react'

import Layout from '../components/layout'
// import Image from '../components/image'
import SEO from '../components/seo'
import Hero from '../components/sections/hero'
import Gallery from '../components/sections/gallery'
import Goats from '../components/sections/goats'
import Contact from '../components/sections/contact'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Hero />
    <Gallery />
    <Goats />
    <Contact />
  </Layout>
)

export default IndexPage
