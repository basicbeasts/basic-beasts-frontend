import type { NextPage } from "next"
import HeaderDark from "@components/ui/HeaderDark"
import styled from "styled-components"
import InboxItemList from "@components/ui/InboxItemList"

const Spacing = styled.div`
  @media (min-width: 1100px) {
    padding: 100px 0;
  }
`

const Inbox: NextPage = () => {
  return (
    <div>
      <HeaderDark title="My Inbox" description="Claim your packs" />
      <InboxItemList />
    </div>
  )
}

export default Inbox
