import { FC, useState } from 'react'
import Navbar from '@components/common/Navbar'
import Footer from '@components/common/Footer'
import SideNavbar from '@components/common/SideNavbar'
import * as fcl from '@onflow/fcl'
import Head from "next/head"

// Configure FCL for Flow testnet.
/*
fcl
  .config()
  .put('accessNode.api', 'https://access-testnet.onflow.org')
  .put('challenge.handshake', 'https://flow-wallet-testnet.blocto.app/authn')
  .put("0xFungibleToken", "0x9a0766d93b6608b7")
  .put("0xFUSD", "0xe223d8a629e49c68")
*/
//Configure FCL for Flow mainnet.
fcl
  .config()
  .put('accessNode.api', 'https://access.mainnet.nodes.onflow.org')
  .put('challenge.handshake', 'https://flow-wallet.blocto.app/authn')
  .put("0xFungibleToken", "0xf233dcee88fe0abe")
  .put("0xFUSD", "0x3c5959b568896393")

//<SideNavbar isSideNavbarOpen={isSideNavbarOpen} toggle={toggle} />

//<Navbar toggle={toggle}/>

const Layout: FC = ({children}) => {
    const [isSideNavbarOpen, setIsSideNavbarOpen] = useState(false)

    const toggle = () => {
        setIsSideNavbarOpen(!isSideNavbarOpen)
    }

    return (
        <>
            <Head>
                <link
                    rel="preload"
                    href='/fonts/Pixelar/Pixelar-Regular-W01-Regular.ttf'
                    as="font"
                    crossOrigin=""
                />
            </Head>
            <SideNavbar isSideNavbarOpen={isSideNavbarOpen} toggle={toggle} />
            <Navbar toggle={toggle}/>
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Layout