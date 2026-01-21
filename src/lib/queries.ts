export const allGoatsQuery = `*[_type == "goat"] | order(date desc) {
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
  images[] {
    asset->{
      _id,
      url
    },
    alt
  }
}`;

export const goatBySlugQuery = `*[_type == "goat" && slug.current == $slug][0] {
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
  images[] {
    asset->{
      _id,
      url
    },
    alt
  }
}`;

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
}`;

export const goatsPageQuery = `*[_type == "goatsPage"][0] {
  _id,
  title,
  introText
}`;
