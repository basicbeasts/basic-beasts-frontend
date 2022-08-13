import type { NextPage } from "next"
import HeaderDark from "@components/ui/HeaderDark"
import styled from "styled-components"
import InboxItemListTemp from "@components/ui/InboxItemListTemp"

const Spacing = styled.div`
  @media (min-width: 1100px) {
    padding: 100px 0;
  }
`

const Rankings: NextPage = () => {
  return (
    <div>
      <HeaderDark title="Rankings" description="The top Beast Hunters at BB" />
    </div>
  )
}

export default Rankings
