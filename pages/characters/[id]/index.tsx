import type { NextPage } from "next"
import { GetStaticPaths } from "next"
import { GetStaticProps } from "next"
import Image from "next/image"
import graphClient from "../../../graphql/client"
import { GET_CHARACTER_BY_ID } from "../../../graphql/queries"
import { CharactersDetails } from "../../../graphql/types"

interface CharactersDetailsProps {
  data: CharactersDetails
}

const CharacterDetails: NextPage<CharactersDetailsProps> = ({ data }) => {
  const { charactersByIds } = data
  const {
    name,
    status,
    species,
    type,
    gender,
    origin,
    location,
    episode,
    image,
  } = charactersByIds[0]

  return (
    <div>
      <h1>{name}</h1>
      <Image src={image} alt={name + " Image"} width={200} height={200} />
    </div>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {

//     paths: [],
//     fallback: true,
//   }
// }

// export const getStaticProps: GetStaticProps = async () => {
//   const data = await fetcher("GET_ALL_CHARACTERS")

//   return { props: { data } }
// }

CharacterDetails.getInitialProps = async (params) => {
  const variables = { id: params.query.id }
  const data: CharactersDetails = await graphClient.request<CharactersDetails>(
    GET_CHARACTER_BY_ID,
    variables
  )

  return { data }
}

export default CharacterDetails
