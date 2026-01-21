// Sanity types for type-safe queries

export interface SanityImageAsset {
  _id: string;
  url: string;
}

export interface SanityImage {
  asset: SanityImageAsset;
  alt?: string;
}

export interface SireOrDam {
  name: string;
  link: string; // Required: All sire/dam entries have links
  sire?: SireOrDam;
  dam?: SireOrDam;
}

export interface Mate {
  name: string;
  slug: string;
  link: string;
}

export interface Goat {
  _id: string;
  name: string;
  aka: string;
  slug: string;
  date: string; // Required: All goats have a date of birth
  adgaPedigree: string; // Required: All goats have ADGA pedigree link
  sire: SireOrDam; // Required: All goats have sire
  dam: SireOrDam; // Required: All goats have dam
  pedigree?: string;
  kiddingDate?: string;
  mate?: Mate;
  copy?: string[];
  notes?: string[];
  prices?: string[];
  images?: SanityImage[];
}

export interface GoatsPage {
  _id: string;
  title: string;
  introText?: PortableTextBlock[];
}

export interface HomePage {
  _id: string;
  heroLogo?: SanityImage;
  heroBackground?: SanityImage;
  welcomeTitle?: string;
  welcomeText?: PortableTextBlock[];
  familyPhoto?: SanityImage;
  galleryImages?: SanityImage[];
  instagramUrl?: string;
  contactHeading?: string;
}

// Portable Text types (simplified)
export interface PortableTextBlock {
  _type: 'block';
  style?: string;
  children: PortableTextSpan[];
}

export interface PortableTextSpan {
  _type: 'span';
  text: string;
  marks?: string[];
}
