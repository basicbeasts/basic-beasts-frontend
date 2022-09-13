import SearchBar from "@components/ui/SearchBar"
import type { NextPage } from "next"
import styled from "styled-components"

const Container = styled.div`
  height: 400px;
`

const Search: NextPage = () => {
  const data = [
    {
      findName: "williblue",
      address: "0x16af873a66616a17",
      avatar:
        "https://raw.githubusercontent.com/basicbeasts/basic-beasts-frontend/main/public/profile_pictures/bb_face_040.png",
    },
    {
      findName: "Dense16",
      address: "",
      avatar:
        "https://raw.githubusercontent.com/basicbeasts/basic-beasts-frontend/main/public/profile_pictures/bb_face_037.png",
    },
    ,
    {
      findName: "Dense16",
      address: "",
      avatar:
        "https://raw.githubusercontent.com/basicbeasts/basic-beasts-frontend/main/public/profile_pictures/bb_face_037.png",
    },
    {
      findName: "bbmercury",
      address: "0x805727b65285a84d",
      avatar:
        "https://raw.githubusercontent.com/basicbeasts/basic-beasts-frontend/main/public/profile_pictures/bb_face_028.png",
    },
    {
      findName: "bbmercury",
      address: "0x805727b65285a84d",
      avatar:
        "https://raw.githubusercontent.com/basicbeasts/basic-beasts-frontend/main/public/profile_pictures/bb_face_028.png",
    },
    {
      findName: "bbmercury",
      address: "0x805727b65285a84d",
      avatar:
        "https://raw.githubusercontent.com/basicbeasts/basic-beasts-frontend/main/public/profile_pictures/bb_face_028.png",
    },
    {
      findName: "bbmercury",
      address: "0x805727b65285a84d",
      avatar:
        "https://raw.githubusercontent.com/basicbeasts/basic-beasts-frontend/main/public/profile_pictures/bb_face_028.png",
    },
    {
      findName: "bbmercury",
      address: "0x805727b65285a84d",
      avatar:
        "https://raw.githubusercontent.com/basicbeasts/basic-beasts-frontend/main/public/profile_pictures/bb_face_028.png",
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
  return (
    <SearchBar
      placeholder="Search .find name or address..."
      data={data}
      beastData={beastData}
    />
  )
}

export default Search
