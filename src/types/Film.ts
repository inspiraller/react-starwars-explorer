export interface ResponseFilms {
  count: number;
  next: string | null;
  previous: string | null;
  results: Film[];
}
export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export type FilmsObjects = Record<string, Omit<Film, 'title'>>;
