export interface Info {
  page: number
  count: number
  next: number
  prev: number
}

export interface Character {
  id: string
  name: string
  image: string
}

export interface CharactersData {
  info: Info
  results: Array<Character>
}

export interface Characters {
  characters: CharactersData
}
export interface CharactersDetails {
  charactersByIds: Array<Character>
}
