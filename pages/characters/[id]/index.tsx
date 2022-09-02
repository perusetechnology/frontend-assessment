import type { NextPage } from "next"
import { GetStaticPaths } from "next"
import { GetStaticProps } from "next"
import { redirect } from "next/dist/server/api-utils"
import Image from "next/image"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import graphClient from "../../../graphql/client"
import { GET_CHARACTER_BY_ID } from "../../../graphql/queries"
import { Character, CharactersDetails } from "../../../graphql/types"

interface CharactersDetailsProps {
  charactersByIds: Array<Character>
}

const CharacterDetails: NextPage<CharactersDetailsProps> = ({
  charactersByIds,
}) => {
  if (!charactersByIds) return null

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

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = [...Array(846).keys()]
  const paths = ids.map((item) => ({
    params: { id: (item.toString() + 1) as string },
  }))
  return {
    paths: paths,
    fallback: true,
  }
}

interface IParams extends ParsedUrlQuery {
  id: string
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as IParams

  if (!id) {
    return {
      redirect: {
        destination: "/characters",
        permanent: false,
      },
    }
  }

  const variables = { id: id }
  const data: CharactersDetails = await graphClient.request(
    GET_CHARACTER_BY_ID,
    variables
  )

  return { props: data }
}

export default CharacterDetails
