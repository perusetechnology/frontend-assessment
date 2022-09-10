import React, { useCallback, useEffect, useState } from "react"
import type { NextPage } from "next"
import Image from "next/image"
import graphClient from "../../graphql/client"
import { GET_ALL_CHARACTERS } from "../../graphql/queries"
import { GridColDef, GridCellValue, DataGrid } from "@mui/x-data-grid"
import { Button } from "@mui/material"
import { Container } from "@mui/material"
import { useQuery } from "react-query"
import { Characters } from "../../graphql/types"
import { useRouter } from "next/router"

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
  const router = useRouter()
  const { page } = router.query

  const [currentPage, setCurrentPage] = useState<number>(1)

  const handleClick = useCallback(
    (_page: number) => {
      const _current = _page + 1

      setCurrentPage(_current)
      router.replace({
        query: { ...router.query, page: _current },
      })
    },
    [setCurrentPage, router]
  )

  useEffect(() => {
    if (page) {
      setCurrentPage(parseInt(page as string))
    }
  }, [])

  const {
    data: charactersData,
    isLoading,
    isRefetching,
  } = useQuery<Characters>(
    ["allCharacters", currentPage],
    async () =>
      await graphClient.request(GET_ALL_CHARACTERS, { page: currentPage }),
    { initialData: data }
  )

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
          page={currentPage - 1}
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
