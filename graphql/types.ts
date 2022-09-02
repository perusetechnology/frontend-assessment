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

export interface Characters {
  characters: {
    info: Info
    results: Array<Character>
  }
}
