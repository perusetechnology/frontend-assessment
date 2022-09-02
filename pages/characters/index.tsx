import React, { useState } from "react"
import type { NextPage } from "next"
import Image from "next/image"
import graphClient from "../../graphql/client"
import { GET_ALL_CHARACTERS } from "../../graphql/queries"
import { GridColDef, GridCellValue, DataGrid } from "@mui/x-data-grid"
import { Button } from "@mui/material"
import { Container } from "@mui/material"
import { useQuery } from "react-query"
import { Characters } from "../../graphql/types"

interface CharactersPageProps {
  data: Characters
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

const CharactersPage: NextPage<CharactersPageProps> = ({ data }) => {
  const [page, setPage] = useState<number>(1)

  const {
    data: charactersData,
    isLoading,
    isRefetching,
  } = useQuery<Characters>(
    ["allCharacters", page],
    async () => await graphClient.request(GET_ALL_CHARACTERS, { page: page }),
    { initialData: data }
  )

  const handleClick = (_page: number) => {
    setPage(page + 1)
  }

  if (isLoading) return <div>Loading</div>

  const {
    info: { count },
    results,
  } = charactersData?.characters || {
    info: { count: null },
    results: null,
  }

  return (
    <Container>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          onPageChange={(newPage: number) => handleClick(newPage)}
          loading={isLoading || isRefetching}
          paginationMode="server"
          rows={results}
          rowCount={count}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          pagination
          isRowSelectable={() => false}
        />
      </div>
    </Container>
  )
}

CharactersPage.getInitialProps = async () => {
  const data = await graphClient.request(GET_ALL_CHARACTERS)

  return { data }
}

export default CharactersPage
