import type { NextPage } from "next"
import HeaderDark from "@components/ui/HeaderDark"
import styled from "styled-components"
import InboxItemListTemp from "@components/ui/InboxItemListTemp"

const Spacing = styled.div`
  @media (min-width: 1100px) {
    padding: 100px 0;
  }
`

const Inbox: NextPage = () => {
  return (
    <div>
      <HeaderDark title="My Inbox" description="Claim your packs" />
      <InboxItemListTemp />
    </div>
  )
}

export default Inbox
