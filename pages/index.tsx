import React from "react"
import { MenuItem } from "@mui/material"
import { Menu } from "@mui/material"
import type { NextPage } from "next"
import { GetStaticPaths } from "next"
import { GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import graphClient from "../graphql/client"
import { GET_ALL_CHARACTERS_COUNT } from "../graphql/queries"
import { Container } from "@mui/material"

interface HomeProps {
  data: any
}

const Home: NextPage<HomeProps> = ({ data }) => {
  const {
    characters: {
      info: { count },
    },
  } = data

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <Container maxWidth="md">
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={true}
        onClose={handleCloseNavMenu}
      >
        <MenuItem onClick={handleCloseNavMenu}>
          <Link href="/characters">
            <a>Characters ({count})</a>
          </Link>
        </MenuItem>
      </Menu>
    </Container>
  )
}

Home.getInitialProps = async () => {
  const data = await graphClient.request(GET_ALL_CHARACTERS_COUNT)

  return { data }
}

export default Home
