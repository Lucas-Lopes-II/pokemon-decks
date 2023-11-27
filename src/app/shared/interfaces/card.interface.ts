export interface Card {
  id: string;
  name: string;
  supertype: string;
  rules?: string[];
  set: Set;
  number: string;
  images: Images;
}

export interface Set {
  id: string;
  name: string;
  series: string;
  printedTotal?: number;
  total: number;
  legalities: Legalities;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: {
    symbol: string;
    logo: string;
  };
}

export interface Legalities {
  unlimited?: string;
  expanded?: string;
}

export interface Images {
  small: string;
  large: string;
}
