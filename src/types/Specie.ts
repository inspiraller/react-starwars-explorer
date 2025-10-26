export interface ResponseSpecies {
  count: number;
  next: string | null;
  previous: string | null;
  results: Specie[];
}
export interface Specie {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export type SpeciesObjects = Record<string, Omit<Specie, 'name'>>;
