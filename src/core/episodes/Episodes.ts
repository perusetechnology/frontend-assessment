export interface ResourceBase {
  id: number;
  name: string;
  url: string;
  created: string;
}

export interface Info {
  count: number;
  pages: number;
}

export interface Episode extends ResourceBase {
  air_date: string;
  episode: string;
}

export interface EpisodeResponse extends ResourceBase {
  info: Info;
  results: Episode[];
}

export interface EpisodeDetail extends Episode {
  characters: Character[];
}

export interface Character extends ResourceBase {
  status: 'Dead' | 'Alive' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  image: string;
  episode: string[];
}

export interface EpisodeFilter {
  name: string;
}
