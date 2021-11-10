import React, { FC, useEffect, useState } from "react"
import styled from "styled-components"
import BeastDisplay from "@components/ui/BeastDisplay"
import CollectionStorage from "@components/ui/CollectionStorage"
import ShowcaseBeast from "@components/ui/ShowcaseBeast"
import ShowcaseNoBeastFound from "@components/ui/ShowcaseNoBeastFound"
import ShowcaseNoItemFound from "@components/ui/ShowcaseNoItemFound"
import ShowcaseNoPackFound from "@components/ui/ShowcaseNoPackFound"
import ShowcaseItem from "../ShowcaseItem"
import ShowcasePack from "../ShowcasePack"
import { useQuery } from "../../../gqty"

const Container = styled.div`
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: -7px;
`

const Bg = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 600px;
  min-width: 1400px;

  // !!!!!
  background: #ffd966; //Should change color depending on state and beast, item, pack that is being displayed
  box-shadow: 0px 0px 5px 4px #ffd966; //Should change color depending on state and beast, item, pack that is being displayed
  // !!!!!

  //272727
  //ffd966

  @media (max-width: 1200px) {
    min-width: auto;
    justify-content: center;
  }
`

const MyCollection: FC = () => {
  const query = useQuery()
  const user = query.user({ walletAddress: "0xdcdb8c9861a8e9d6" })
  const beasts = user
    ?.unopenedPacks()
    ?.edges?.map((edge) => edge?.node?.beast?.id!)

  const [selectedBeast, setSelectedBeast] = useState<string | null>(null)

  // When Beasts are in the collection. Showcase first BeastThumbnail by default
  useEffect(() => {
    if (beasts && beasts.length > 0) {
      setSelectedBeast(beasts[0])
    }
    // This will re-run when the query updates with data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.$state.isLoading])

  return (
    <Container>
      <Bg>
        {/*When Beast Collection is empty. Otherwise show first beast*/}
        {selectedBeast ? (
          <ShowcaseBeast id={selectedBeast} />
        ) : (
          <ShowcaseNoBeastFound />
        )}

        {/*When Item Inventory is empty. Otherwise show first item*/}
        {/*<ShowcaseNoItemFound />*/}

        {/*When Pack Inventory is empty. Otherwise show first pack*/}
        {/*<ShowcaseNoPackFound />*/}

        {/*When Items are in the inventory. Showcase first ItemThumbnail by default*/}
        {/*<ShowcaseItem />*/}

        {/*When Packs are in the inventory. Showcase first PackThumbnail by default*/}
        {/*<ShowcasePack />*/}

        <CollectionStorage selectBeast={setSelectedBeast} />
      </Bg>
    </Container>
  )
}
export default MyCollection
