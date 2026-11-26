const imagesProjection = `images[] {
    asset->{
      _id,
      url
    },
    alt
  }`

const goatFields = `
  _id,
  name,
  aka,
  "slug": slug.current,
  date,
  adgaPedigree,
  pedigree,
  kiddingDate,
  sire,
  dam,
  mate,
  copy,
  notes,
  prices,
  displayOrder,
  ${imagesProjection}
`

export const allGoatsQuery = `*[_type == "goat"] | order(displayOrder asc) {${goatFields}}`

// Goats with no goatType predate the field, whose default is "doe".
export const doeGoatsQuery = `*[_type == "goat" && (goatType == "doe" || !defined(goatType))] | order(displayOrder asc) {${goatFields}}`

export const buckGoatsQuery = `*[_type == "goat" && goatType == "buck"] | order(displayOrder asc) {${goatFields}}`

export const referenceGoatsQuery = `*[_type == "goat" && goatType == "reference"] | order(displayOrder asc) {${goatFields}}`

export const goatBySlugQuery = `*[_type == "goat" && slug.current == $slug][0] {${goatFields}}`

export const homePageQuery = `*[_type == "homePage"][0] {
  _id,
  heroLogo {
    asset->{
      _id,
      url
    }
  },
  heroBackground {
    asset->{
      _id,
      url
    }
  },
  welcomeTitle,
  welcomeText,
  familyPhoto {
    asset->{
      _id,
      url
    },
    alt
  },
  galleryImages[] {
    asset->{
      _id,
      url
    },
    alt
  },
  instagramUrl,
  contactHeading
}`

export const goatsPageQuery = `*[_type == "goatsPage"][0] {
  _id,
  title,
  introText
}`

export const deliveriesPageQuery = `*[_type == "deliveriesPage"][0] {
  _id,
  "items": items[available != false]{
    _key,
    name,
    price,
    unit,
    description
  },
  venmoUsername,
  paymentNote,
  options
}`

export const milkerTrainingPageQuery = `*[_type == "milkerTrainingPage"][0] {
  _id,
  intro,
  "slots": slots[available != false && defined(start)]{
    _key,
    start,
    lengthHours,
    note
  }
}`

export const kiddingScheduleQuery = `*[_type == "goat" && defined(kiddingDate)] | order(kiddingScheduleOrder asc) {
  _id,
  name,
  aka,
  "slug": slug.current,
  date,
  kiddingDate,
  mate,
  notes,
  prices,
  adgaPedigree,
  pedigree,
  kiddingScheduleOrder,
  ${imagesProjection},
  "mateSire": *[_type == "sire" && slug.current == ^.mate.slug][0]{
    name,
    "slug": slug.current,
    link,
    image {
      asset->{
        _id,
        url
      },
      alt
    }
  }
}`
