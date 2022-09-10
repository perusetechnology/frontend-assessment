import { gql } from "graphql-request"

export const GET_CHARACTER_BY_ID = gql`
  query CharactersByIds($id: [ID!]!) {
    charactersByIds(ids: $id) {
      id
      name
      status
      species
      type
      gender
      image
      origin {
        name
      }
      location {
        name
      }
    }
  }
`
export const GET_ALL_CHARACTERS = gql`
  query allCharacter($page: Int) {
    characters(page: $page) {
      info {
        pages
        count
      }
      results {
        id
        name
        image
      }
    }
  }
`

export const GET_ALL_CHARACTERS_COUNT = gql`
  query {
    characters {
      info {
        count
      }
    }
  }
`
