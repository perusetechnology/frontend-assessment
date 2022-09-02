import React from "react"
import type { NextPage } from "next"
import { GetStaticPaths } from "next"
import { GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import graphClient from "../../graphql/client"
import { GET_ALL_CHARACTERS } from "../../graphql/queries"
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { GridApi } from "@mui/x-data-grid"
import { GridCellValue } from "@mui/x-data-grid"
import { DataGrid } from "@mui/x-data-grid"
import { Button } from "@mui/material"
import { Container } from "@mui/material"

interface HomeProps {
  data: any
}

const handleClick = (e: any) => {
  console.log("eeee", e)
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "image",
    headerName: "Image",
    width: 130,
    renderCell: (cellValues: GridCellValue) => {
      return (
        <Image
          src={cellValues.row.image}
          alt={cellValues.row.name}
          height={40}
          width={40}
        />
      )
    },
  },
  { field: "name", headerName: "Name", width: 130 },
  {
    field: "details",
    headerName: "Details",
    width: 90,
    renderCell: (cellValues: GridCellValue) => {
      return (
        <Button
          variant="contained"
          color="primary"
          href={`/characters/${cellValues.row.id}`}
        >
          Details
        </Button>
      )
    },
  },
]

const Home: NextPage<HomeProps> = ({ data }) => {
  const {
    characters: {
      info: { pages, count },
      results,
    },
  } = data

  return (
    <Container>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          onPageChange={(newPage: any) => handleClick(newPage)}
          rows={results}
          rowCount={count}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          pagination
        />
      </div>
    </Container>
  )
}

Home.getInitialProps = async () => {
  const data = await graphClient.request(GET_ALL_CHARACTERS)

  return { data }
}

export default Home
