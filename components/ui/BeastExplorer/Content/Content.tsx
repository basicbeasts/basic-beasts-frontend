import { FC, useEffect, useState } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"
import BeastExplorerFilters from "../Filters"

type Props = {
  beastTemplatesArr: any
  beasts: any
}

const Container = styled.div`
  margin: 0 30vw 200px 30vw;
  display: grid;
  grid-template-rows: auto auto;
  justify-items: center;
  line-height: normal;

  color: white;

  & h1 {
    font-size: 4rem;
    @media (max-width: 700px) {
      font-size: 3rem;
    }
  }
  & h2 {
    font-size: 2.5rem;
    @media (max-width: 700px) {
      font-size: 1.6rem;
    }
  }
  & h3 {
    font-size: 1.5rem;
  }
  & p {
    font-size: 1rem;
  }

  @media (max-width: 1400px) {
    margin: 0 25vw 200px 25vw;
  }

  @media (max-width: 1000px) {
    margin: 0 15vw 200px 15vw;
  }
`

const BeastList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto auto;
`

const Header = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 10% 55% 35%;
  border-bottom: 2px solid #e4be23;

  & h3 {
    color: #e4be23;
    .col1 {
      grid-column: 1;
    }
    .col2 {
      grid-column: 2;
    }
    .col3 {
      grid-column: 3;
    }
  }
`

const Line = styled.div`
  display: grid;
  grid-template-columns: 10% 15% 32% 32%;
  height: fit-content;
  padding: 1rem 0;
  align-items: center;
  border-bottom: 1px solid gray;
  gap: 0 2%;
`

const Number = styled.h2`
  text-align: center;
  color: #e4be23;
`

const BeastImg = styled.img`
  width: 100%;
  /* border: 1px solid red; */
`

const BeastName = styled.h2``

const Price = styled.h2`
  & span {
    @media (max-width: 600px) {
      display: none;
    }
  }
`

const BeastExplorerContent: FC<Props> = ({ beastTemplatesArr, beasts }) => {
  //INTERFACES TO BE EXTRACTED AT CODE REFACTORING
  interface IBeast {
    basicSkills: string[]
    beastTemplateID: string
    breedingCount: string
    currentOwner: string
    description: string
    dexNumber: string
    elements: string[]
    firstOwner: string
    id: string
    name: string
    nickname: string
    numberOfMintedBeastTemplates: string
    price: string
    serialNumber: string
    sex: string
    skin: string
    starLevel: string
    ultimateSkill: string
  }

  interface IBeastTemplate {
    asexual: boolean
    basicSkills: string[]
    beastTemplateID: number | string
    breadableBeastTemplateID: number
    description: string
    elements: string[]
    image: string
    imageTransparentBg: string
    maxAdminMintAllowed: number
    name: string
    packReveal: string
    rarity: string
    skin: string
    starLevel: number
    thumbnail: string
    ultimateSkill: string
  }

  interface ISelectedFilters {
    skin?: string
    starLevel?: string
  }

  function getFloorPrice(beast: IBeast) {
    const beastsWithPrice = beasts?.filter(
      (x: any) => x.beastTemplateID == beast.beastTemplateID && x.price,
    )

    if (beastsWithPrice) {
      let priceArray = []
      for (let i in beastsWithPrice) {
        priceArray.push(beastsWithPrice[i].price)
      }
      let lowest = Math.min(...priceArray)

      return lowest == Infinity ? "--" : lowest
    }
  }

  const [selectedFilters, setSelectedFilters] = useState<ISelectedFilters>({
    skin: "All",
    starLevel: "All",
  })

  // TODO:
  // GET SELECTEDFILTERS VALUE IN STRING FORMAT "example=example&example=example"
  // Append the url when selectedFilters change
  // read the url when refreshing the page to apply the filters

  // Takes the values of the selectedFilters and returns it as an array
  const showFilterKeyPlusValue = () => {
    let queryArr = []

    for (const [key, value] of Object.entries(selectedFilters)) {
      queryArr.push(`${key}=${[value].join(",")}`)
    }
    return queryArr
  }

  // Change the url string based on filter and sort states
  useEffect(() => {
    let activeFilters = showFilterKeyPlusValue()
    let filterObject: Record<string, any> = {}

    activeFilters?.forEach((activeFilter) => {
      const [key, value] = activeFilter.split("=")
      filterObject[key] = value
    })

    if (selectedFilters.skin != "All" || selectedFilters.starLevel != "All") {
      // If not "All" then add the filter object and sort object
      router.replace(
        {
          pathname: "/explorer",
          query: { ...filterObject },
        },
        undefined,
        { shallow: true },
      ) // shallow true, to avoid page from doing hard-reload when selecting filters
    } else {
      router.replace(
        {
          pathname: "/explorer",
          query: {},
        },
        undefined,
        { shallow: true },
      )
    }
  }, [selectedFilters])

  const router = useRouter()

  useEffect(() => {
    let selectedFiltersMockup: ISelectedFilters = Object.fromEntries(
      Object.entries(router.query).map(([key, value]) => [key, value]),
    )

    if (
      JSON.stringify(selectedFilters) !=
        JSON.stringify(selectedFiltersMockup) &&
      Object.entries(selectedFiltersMockup).length != 0
    ) {
      setSelectedFilters(selectedFiltersMockup)
    }
  }, [router.query])

  function getFilterFunction(filterName: "skin" | "starLevel") {
    return (beast: any) => {
      if (selectedFilters[filterName] === "All") {
        return true
      }

      return beast[filterName] == selectedFilters[filterName]
    }
  }

  const filteredBeasts = beasts
    .filter((beast: IBeast) => beast.price)
    .sort((a: any, b: any) => b.price - a.price)
    .filter(getFilterFunction("skin"))
    .filter(getFilterFunction("starLevel"))

  console.log(filteredBeasts)

  // to do:
  // go through an array of filtered beasts
  // get the names
  // create a new array
  // go through the names
  // if the name has been seen before, return false/ignore
  // if the name is "new", add to the array

  let uniqueBeasts: any[] = []

  function getUniqueBeasts() {
    for (let i = 0; i < filteredBeasts.length; i++) {
      let duplicate = false

      for (let j = i + 1; j < filteredBeasts.length; j++) {
        if (filteredBeasts[i].name == filteredBeasts[j].name) {
          duplicate = true
          break
        }
      }

      if (!duplicate) uniqueBeasts.push(filteredBeasts[i])
    }
    console.log(uniqueBeasts)
    return uniqueBeasts
  }

  function TruncatedName(beast: IBeast) {
    const ShortName =
      beast.name.length > 6 ? `${beast.name.slice(0, 6)}...` : beast.name
    return ShortName
  }

  return (
    <Container>
      <BeastExplorerFilters
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <BeastList>
        <Header>
          <h3 className="col1">#</h3>
          <h3 className="col2">Beast</h3>
          <h3 className="col3">Floor</h3>
        </Header>
        {getUniqueBeasts().map((beast: IBeast, idx: number) => (
          <div key={beast.id}>
            <Line>
              <Number>{(idx = idx + 1)}</Number>
              <BeastImg
                src={
                  "https://basicbeasts.mypinata.cloud/ipfs/" +
                  beastTemplatesArr.find(
                    (beastTemplate: IBeastTemplate) =>
                      beastTemplate.beastTemplateID == beast.beastTemplateID,
                  ).imageTransparentBg
                }
              />
              <BeastName>{TruncatedName(beast)}</BeastName>
              <Price>
                {getFloorPrice(beast)}
                <span> FUSD</span>
              </Price>
            </Line>
          </div>
        ))}
      </BeastList>
    </Container>
  )
}

export default BeastExplorerContent
