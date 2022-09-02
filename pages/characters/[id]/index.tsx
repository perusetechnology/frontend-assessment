import { request } from "http"
import type { NextPage } from "next"
import { GetStaticPaths } from "next"
import { GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import { useQuery } from "react-query"
import graphClient from "../../../graphql/client"

interface HomeProps {
  data: any
}

const Home: NextPage<HomeProps> = ({ data }) => {
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

Home.getInitialProps = async (params) => {
  const variables = { id: params.query.id }
  const data = await graphClient.request(GET_CHARACTER_BY_ID, variables)

  return { data }
}

export default Home
