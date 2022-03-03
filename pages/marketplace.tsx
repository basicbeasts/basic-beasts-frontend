import type { NextPage } from "next"
import HeaderDark from "@components/ui/HeaderDark"
import styled from "styled-components"

const Spacing = styled.div`
  @media (min-width: 1100px) {
    padding: 100px 0;
  }
`

const Marketplace: NextPage = () => {
  return (
    <div>
      <HeaderDark
        title="Coming Soon!"
        description="Trade your Beasts on the Marketplace. Receive 5% royalties of all trades from a Beast by becoming its First Owner."
      />
      <Spacing />
    </div>
  )
}

export default Marketplace
