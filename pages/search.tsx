import SearchBar from "@components/ui/SearchBar"
import SearchBarMobileModal from "@components/ui/SearchBarMobileModal"
import type { NextPage } from "next"
import styled from "styled-components"
import { useState } from "react"

const Container = styled.div`
  height: 400px;
`

const Search: NextPage = () => {
  const data = [
    {
      findName: "",
      address: "0x4742010dbfe107da",
      avatar:
        "https://raw.githubusercontent.com/basicbeasts/basic-beasts-frontend/main/public/profile_pictures/bb_face_028.png",
    },
    {
      findName: "williblue",
      address: "0x16af873a66616a17",
      avatar:
        "https://raw.githubusercontent.com/basicbeasts/basic-beasts-frontend/main/public/profile_pictures/bb_face_040.png",
    },
    {
      findName: "dense16",
      address: "0xb79aa9cff91abc25",
      avatar:
        "https://raw.githubusercontent.com/basicbeasts/basic-beasts-frontend/main/public/profile_pictures/bb_face_037.png",
    },
    {
      findName: "bbmercury",
      address: "0x805727b65285a84d",
      avatar:
        "https://raw.githubusercontent.com/basicbeasts/basic-beasts-frontend/main/public/profile_pictures/bb_face_028.png",
    },
  ]
  const beastData = [
    {
      name: "Saber",
      imageTransparentBg:
        "https://raw.githubusercontent.com/basicbeasts/basic-beasts-frontend/main/public/beasts/004_normal.png",
    },
    {
      name: "Moon",
      imageTransparentBg:
        "https://raw.githubusercontent.com/basicbeasts/basic-beasts-frontend/main/public/beasts/001_normal.png",
    },
  ]

  const [open, setOpen] = useState(false)

  return (
    <>
      <SearchBarMobileModal
        open={open}
        setOpen={setOpen}
        data={data}
        beastData={beastData}
      />
      <SearchBar
        placeholder="Search .find name or address..."
        data={data}
        beastData={beastData}
        setOpenMobileModal={setOpen}
      />
    </>
  )
}

export default Search
