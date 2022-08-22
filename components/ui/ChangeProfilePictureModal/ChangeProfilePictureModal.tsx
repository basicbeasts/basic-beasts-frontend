import { FC, Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/outline"

import star from "public/basic_starLevel.png"
import styled from "styled-components"
import {
  send,
  transaction,
  args,
  arg,
  payer,
  proposer,
  authorizations,
  limit,
  authz,
  decode,
  tx,
} from "@onflow/fcl"
import * as t from "@onflow/types"
import profilePictures from "data/profilePictures"

const ActionItem = styled.div`
  padding: 10px 0;
  width: 100%;
`

const FuncArgInput = styled.input`
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  font-size: 1.5em;
  padding: 10px 0px 10px 20px;
  border-radius: 8px 0 0 8px;
  width: 50%;
  cursor: pointer;
  margin-right: -1px;

  outline: none;
`

const FuncArgButton = styled.button`
  background: transparent;
  border: 1px solid #e4be23;
  color: #e4be23;
  font-size: 1.5em;
  padding: 10px 20px;
  border-radius: 0 8px 8px 0;
  outline: none;
  cursor: pointer;

  transition: all 0.2s ease 0s;
  -moz-transition: all 0.2s ease 0s;
  -webkit-transition: all 0.2s ease 0s;
  &:hover {
    background: #e4be23;
    color: #212127;

    transition: all 0.2s ease 0s;
    -moz-transition: all 0.2s ease 0s;
    -webkit-transition: all 0.2s ease 0s;
  }
`

const DialogPanel = styled(Dialog.Panel)<any>`
  padding: 20px;
  background: #212127;
  color: #e4be23;
`

const Button = styled.button`
  margin-top: 20px;
  background: transparent;
  border: 1px solid #e4be23;
  color: #e4be23;
  font-size: 1.5em;
  padding: 10px 20px;
  border-radius: 8px;
  outline: none;
  cursor: pointer;

  transition: all 0.2s ease 0s;
  -moz-transition: all 0.2s ease 0s;
  -webkit-transition: all 0.2s ease 0s;
  &:hover {
    background: #e4be23;
    color: #212127;

    transition: all 0.2s ease 0s;
    -moz-transition: all 0.2s ease 0s;
    -webkit-transition: all 0.2s ease 0s;
  }
`

const Title = styled.div`
  font-size: 2.5em;
  margin-bottom: 20px;
`

const Wrapper = styled.div`
  margin: 20px 20px 0;
  display: flex;
  flex-direction: row;
`

const Container = styled.div`
  align-items: center;
`

const Box = styled.div<any>`
  height: 50px;
  width: 50px;
  background: ${(props) => (props.selected ? "#ffe595" : "#425066")};
`

const Img = styled.img<any>`
  height: 100px;
  width: 100px;
  border-radius: 10px;
  box-shadow: ${(props) => (props.selected ? `0px 0px 5px 4px #8F7A39` : `0`)};
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  margin: 20px;

  transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -webkit-transition: all 0.3s ease 0s;
`

type Props = {
  open: boolean
  setOpen: any
  profile: any
}

const ChangeProfilePictureModal: FC<Props> = ({ open, setOpen, profile }) => {
  const [nickname, setNickname] = useState<string | null>("")
  const [select, setSelect] = useState<any>(profilePictures[1].image)

  const changeProfilePicture = async () => {
    try {
      const res = await send([
        transaction(`
        import Profile from 0xProfile

        transaction(avatar: String) {

          let profile : &Profile.User?

          prepare(acct: AuthAccount) {
            self.profile =acct.borrow<&Profile.User>(from:Profile.storagePath)
          }
        
          pre{
            self.profile != nil : "Cannot borrow reference to profile"
          }
        
          execute{
            self.profile!.setAvatar(avatar)
            self.profile!.emitUpdatedEvent()
          }
        }
        `),
        args([arg(select, t.String)]),
        payer(authz),
        proposer(authz),
        authorizations([authz]),
        limit(9999),
      ]).then(decode)
      setOpen(false)
      await tx(res).onceSealed()
    } catch (err) {
      console.log(err)
    }
  }

  const createProfile = async () => {
    try {
      const res = await send([
        transaction(`
        import FungibleToken from 0xFungibleToken
        import NonFungibleToken from 0xNonFungibleToken
        import FUSD from 0xFUSD
        import FiatToken from 0xFiatToken
        import FlowToken from 0xFlowToken
        import MetadataViews from 0xMetadataViews
        import FIND from 0xFIND
        import Profile from 0xProfile
        import FindMarket from 0xFindMarket
        import FindMarketSale from 0xFindMarketSale
        import FindMarketDirectOfferEscrow from 0xFindMarketDirectOfferEscrow
        import FindMarketDirectOfferSoft from 0xFindMarketDirectOfferSoft
        import FindMarketAuctionEscrow from 0xFindMarketAuctionEscrow
        import FindMarketAuctionSoft from 0xFindMarketAuctionSoft
        import Dandy from 0xDandy
        import FindLeaseMarketSale from 0xFindLeaseMarketSale
        import FindLeaseMarketAuctionSoft from 0xFindLeaseMarketAuctionSoft
        // import FindLeaseMarketAuctionEscrow from 0xFindLeaseMarketAuctionEscrow
        import FindLeaseMarketDirectOfferSoft from 0xFindLeaseMarketDirectOfferSoft
        // import FindLeaseMarketDirectOfferEscrow from 0xFindLeaseMarketDirectOfferEscrow
        import FindLeaseMarket from 0xFindLeaseMarket

        transaction(name: String) {
          prepare(account: AuthAccount) {
            //if we do not have a profile it might be stored under a different address so we will just remove it
            let profileCapFirst = account.getCapability<&{Profile.Public}>(Profile.publicPath)
            if profileCapFirst.check() {
              return 
            }
            //the code below has some dead code for this specific transaction, but it is hard to maintain otherwise
            //SYNC with register
            //Add exising FUSD or create a new one and add it
            let fusdReceiver = account.getCapability<&{FungibleToken.Receiver}>(/public/fusdReceiver)
            if !fusdReceiver.check() {
              let fusd <- FUSD.createEmptyVault()
              account.save(<- fusd, to: /storage/fusdVault)
              account.link<&FUSD.Vault{FungibleToken.Receiver}>( /public/fusdReceiver, target: /storage/fusdVault)
              account.link<&FUSD.Vault{FungibleToken.Balance}>( /public/fusdBalance, target: /storage/fusdVault)
            }

            let usdcCap = account.getCapability<&FiatToken.Vault{FungibleToken.Receiver}>(FiatToken.VaultReceiverPubPath)
            if !usdcCap.check() {
                account.save( <-FiatToken.createEmptyVault(), to: FiatToken.VaultStoragePath)
                account.link<&FiatToken.Vault{FungibleToken.Receiver}>( FiatToken.VaultReceiverPubPath, target: FiatToken.VaultStoragePath)
                account.link<&FiatToken.Vault{FiatToken.ResourceId}>( FiatToken.VaultUUIDPubPath, target: FiatToken.VaultStoragePath)
                account.link<&FiatToken.Vault{FungibleToken.Balance}>( FiatToken.VaultBalancePubPath, target:FiatToken.VaultStoragePath)
            }

            let leaseCollection = account.getCapability<&FIND.LeaseCollection{FIND.LeaseCollectionPublic}>(FIND.LeasePublicPath)
            if !leaseCollection.check() {
              account.save(<- FIND.createEmptyLeaseCollection(), to: FIND.LeaseStoragePath)
              account.link<&FIND.LeaseCollection{FIND.LeaseCollectionPublic}>( FIND.LeasePublicPath, target: FIND.LeaseStoragePath)
            }

            let bidCollection = account.getCapability<&FIND.BidCollection{FIND.BidCollectionPublic}>(FIND.BidPublicPath)
            if !bidCollection.check() {
              account.save(<- FIND.createEmptyBidCollection(receiver: fusdReceiver, leases: leaseCollection), to: FIND.BidStoragePath)
              account.link<&FIND.BidCollection{FIND.BidCollectionPublic}>( FIND.BidPublicPath, target: FIND.BidStoragePath)
            }

            let dandyCap= account.getCapability<&{NonFungibleToken.CollectionPublic}>(Dandy.CollectionPublicPath)
            if !dandyCap.check() {
              account.save<@NonFungibleToken.Collection>(<- Dandy.createEmptyCollection(), to: Dandy.CollectionStoragePath)
              account.link<&Dandy.Collection{NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, MetadataViews.ResolverCollection, Dandy.CollectionPublic}>(
                Dandy.CollectionPublicPath,
                target: Dandy.CollectionStoragePath
              )
              account.link<&Dandy.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, MetadataViews.ResolverCollection, Dandy.CollectionPublic}>(
                Dandy.CollectionPrivatePath,
                target: Dandy.CollectionStoragePath
              )
            }

            var created=false
            var updated=false
            let profileCap = account.getCapability<&{Profile.Public}>(Profile.publicPath)
            if !profileCap.check() {
              let profile <-Profile.createUser(name:name, createdAt: "find")
              account.save(<-profile, to: Profile.storagePath)
              account.link<&Profile.User{Profile.Public}>(Profile.publicPath, target: Profile.storagePath)
              account.link<&{FungibleToken.Receiver}>(Profile.publicReceiverPath, target: Profile.storagePath)
              created=true
            }

            let profile=account.borrow<&Profile.User>(from: Profile.storagePath)!

            if !profile.hasWallet("Flow") {
              let flowWallet=Profile.Wallet( name:"Flow", receiver:account.getCapability<&{FungibleToken.Receiver}>(/public/flowTokenReceiver), balance:account.getCapability<&{FungibleToken.Balance}>(/public/flowTokenBalance), accept: Type<@FlowToken.Vault>(), tags: ["flow"])
          
              profile.addWallet(flowWallet)
              updated=true
            }
            if !profile.hasWallet("FUSD") {
              profile.addWallet(Profile.Wallet( name:"FUSD", receiver:fusdReceiver, balance:account.getCapability<&{FungibleToken.Balance}>(/public/fusdBalance), accept: Type<@FUSD.Vault>(), tags: ["fusd", "stablecoin"]))
              updated=true
            }

            if !profile.hasWallet("USDC") {
              profile.addWallet(Profile.Wallet( name:"USDC", receiver:usdcCap, balance:account.getCapability<&{FungibleToken.Balance}>(FiatToken.VaultBalancePubPath), accept: Type<@FiatToken.Vault>(), tags: ["usdc", "stablecoin"]))
              updated=true
            }

            //If find name not set and we have a profile set it.
            if profile.getFindName() == "" {
              if let findName = FIND.reverseLookup(account.address) {
                profile.setFindName(findName)
                // If name is set, it will emit Updated Event, there is no need to emit another update event below. 
                updated=false
              }
            }

            if created {
              profile.emitCreatedEvent()
            } else if updated {
              profile.emitUpdatedEvent()
            }

            let receiverCap=account.getCapability<&{FungibleToken.Receiver}>(Profile.publicReceiverPath)
            let saleItemType= Type<@FindMarketSale.SaleItemCollection>()
            let tenantCapability= FindMarket.getTenantCapability(FindMarket.getFindTenantAddress())!

            let tenant = tenantCapability.borrow()!
            let publicPath=FindMarket.getPublicPath(saleItemType, name: tenant.name)
            let storagePath= FindMarket.getStoragePath(saleItemType, name:tenant.name)

            let saleItemCap= account.getCapability<&FindMarketSale.SaleItemCollection{FindMarketSale.SaleItemCollectionPublic, FindMarket.SaleItemCollectionPublic}>(publicPath) 
            if !saleItemCap.check() {
              //The link here has to be a capability not a tenant, because it can change.
              account.save<@FindMarketSale.SaleItemCollection>(<- FindMarketSale.createEmptySaleItemCollection(tenantCapability), to: storagePath)
              account.link<&FindMarketSale.SaleItemCollection{FindMarketSale.SaleItemCollectionPublic, FindMarket.SaleItemCollectionPublic}>(publicPath, target: storagePath)
            }

            let doeSaleType= Type<@FindMarketDirectOfferEscrow.SaleItemCollection>()
            let doeSalePublicPath=FindMarket.getPublicPath(doeSaleType, name: tenant.name)
            let doeSaleStoragePath= FindMarket.getStoragePath(doeSaleType, name:tenant.name)
            let doeSaleCap= account.getCapability<&FindMarketDirectOfferEscrow.SaleItemCollection{FindMarketDirectOfferEscrow.SaleItemCollectionPublic, FindMarket.SaleItemCollectionPublic}>(doeSalePublicPath) 
            if !doeSaleCap.check() {
              account.save<@FindMarketDirectOfferEscrow.SaleItemCollection>(<- FindMarketDirectOfferEscrow.createEmptySaleItemCollection(tenantCapability), to: doeSaleStoragePath)
              account.link<&FindMarketDirectOfferEscrow.SaleItemCollection{FindMarketDirectOfferEscrow.SaleItemCollectionPublic, FindMarket.SaleItemCollectionPublic}>(doeSalePublicPath, target: doeSaleStoragePath)
            }

            let doeBidType= Type<@FindMarketDirectOfferEscrow.MarketBidCollection>()
            let doeBidPublicPath=FindMarket.getPublicPath(doeBidType, name: tenant.name)
            let doeBidStoragePath= FindMarket.getStoragePath(doeBidType, name:tenant.name)
            let doeBidCap= account.getCapability<&FindMarketDirectOfferEscrow.MarketBidCollection{FindMarketDirectOfferEscrow.MarketBidCollectionPublic, FindMarket.MarketBidCollectionPublic}>(doeBidPublicPath) 
            if !doeBidCap.check() {
              account.save<@FindMarketDirectOfferEscrow.MarketBidCollection>(<- FindMarketDirectOfferEscrow.createEmptyMarketBidCollection(receiver:receiverCap, tenantCapability:tenantCapability), to: doeBidStoragePath)
              account.link<&FindMarketDirectOfferEscrow.MarketBidCollection{FindMarketDirectOfferEscrow.MarketBidCollectionPublic, FindMarket.MarketBidCollectionPublic}>(doeBidPublicPath, target: doeBidStoragePath)
            }

            /// auctions that escrow ft
            let aeSaleType= Type<@FindMarketAuctionEscrow.SaleItemCollection>()
            let aeSalePublicPath=FindMarket.getPublicPath(aeSaleType, name: tenant.name)
            let aeSaleStoragePath= FindMarket.getStoragePath(aeSaleType, name:tenant.name)
            let aeSaleCap= account.getCapability<&FindMarketAuctionEscrow.SaleItemCollection{FindMarketAuctionEscrow.SaleItemCollectionPublic, FindMarket.SaleItemCollectionPublic}>(aeSalePublicPath) 
            if !aeSaleCap.check() {
              account.save<@FindMarketAuctionEscrow.SaleItemCollection>(<- FindMarketAuctionEscrow.createEmptySaleItemCollection(tenantCapability), to: aeSaleStoragePath)
              account.link<&FindMarketAuctionEscrow.SaleItemCollection{FindMarketAuctionEscrow.SaleItemCollectionPublic, FindMarket.SaleItemCollectionPublic}>(aeSalePublicPath, target: aeSaleStoragePath)
            }

            let dosSaleType= Type<@FindMarketDirectOfferSoft.SaleItemCollection>()

            let dosSalePublicPath=FindMarket.getPublicPath(dosSaleType, name: tenant.name)
            let dosSaleStoragePath= FindMarket.getStoragePath(dosSaleType, name:tenant.name)

            let dosSaleCap= account.getCapability<&FindMarketDirectOfferSoft.SaleItemCollection{FindMarketDirectOfferSoft.SaleItemCollectionPublic, FindMarket.SaleItemCollectionPublic}>(dosSalePublicPath) 
            if !dosSaleCap.check() {
              account.save<@FindMarketDirectOfferSoft.SaleItemCollection>(<- FindMarketDirectOfferSoft.createEmptySaleItemCollection(tenantCapability), to: dosSaleStoragePath)
              account.link<&FindMarketDirectOfferSoft.SaleItemCollection{FindMarketDirectOfferSoft.SaleItemCollectionPublic, FindMarket.SaleItemCollectionPublic}>(dosSalePublicPath, target: dosSaleStoragePath)
            }

            let dosBidType= Type<@FindMarketDirectOfferSoft.MarketBidCollection>()
            let dosBidPublicPath=FindMarket.getPublicPath(dosBidType, name: tenant.name)
            let dosBidStoragePath= FindMarket.getStoragePath(dosBidType, name:tenant.name)
            let dosBidCap= account.getCapability<&FindMarketDirectOfferSoft.MarketBidCollection{FindMarketDirectOfferSoft.MarketBidCollectionPublic, FindMarket.MarketBidCollectionPublic}>(dosBidPublicPath) 
            if !dosBidCap.check() {
              account.save<@FindMarketDirectOfferSoft.MarketBidCollection>(<- FindMarketDirectOfferSoft.createEmptyMarketBidCollection(receiver:receiverCap, tenantCapability:tenantCapability), to: dosBidStoragePath)
              account.link<&FindMarketDirectOfferSoft.MarketBidCollection{FindMarketDirectOfferSoft.MarketBidCollectionPublic, FindMarket.MarketBidCollectionPublic}>(dosBidPublicPath, target: dosBidStoragePath)
            }

            let aeBidType= Type<@FindMarketAuctionEscrow.MarketBidCollection>()

            let aeBidPublicPath=FindMarket.getPublicPath(aeBidType, name: tenant.name)
            let aeBidStoragePath= FindMarket.getStoragePath(aeBidType, name:tenant.name)
            let aeBidCap= account.getCapability<&FindMarketAuctionEscrow.MarketBidCollection{FindMarketAuctionEscrow.MarketBidCollectionPublic, FindMarket.MarketBidCollectionPublic}>(aeBidPublicPath) 
            if !aeBidCap.check() {
              account.save<@FindMarketAuctionEscrow.MarketBidCollection>(<- FindMarketAuctionEscrow.createEmptyMarketBidCollection(receiver:receiverCap, tenantCapability:tenantCapability), to: aeBidStoragePath)
              account.link<&FindMarketAuctionEscrow.MarketBidCollection{FindMarketAuctionEscrow.MarketBidCollectionPublic, FindMarket.MarketBidCollectionPublic}>(aeBidPublicPath, target: aeBidStoragePath)
            }

          /// auctions that refers FT so 'soft' auction
            let asSaleType= Type<@FindMarketAuctionSoft.SaleItemCollection>()
            let asSalePublicPath=FindMarket.getPublicPath(asSaleType, name: tenant.name)
            let asSaleStoragePath= FindMarket.getStoragePath(asSaleType, name:tenant.name)
            let asSaleCap= account.getCapability<&FindMarketAuctionSoft.SaleItemCollection{FindMarketAuctionSoft.SaleItemCollectionPublic, FindMarket.SaleItemCollectionPublic}>(asSalePublicPath) 
            if !asSaleCap.check() {
              account.save<@FindMarketAuctionSoft.SaleItemCollection>(<- FindMarketAuctionSoft.createEmptySaleItemCollection(tenantCapability), to: asSaleStoragePath)
              account.link<&FindMarketAuctionSoft.SaleItemCollection{FindMarketAuctionSoft.SaleItemCollectionPublic, FindMarket.SaleItemCollectionPublic}>(asSalePublicPath, target: asSaleStoragePath)
            }

            let asBidType= Type<@FindMarketAuctionSoft.MarketBidCollection>()
            let asBidPublicPath=FindMarket.getPublicPath(asBidType, name: tenant.name)
            let asBidStoragePath= FindMarket.getStoragePath(asBidType, name:tenant.name)
            let asBidCap= account.getCapability<&FindMarketAuctionSoft.MarketBidCollection{FindMarketAuctionSoft.MarketBidCollectionPublic, FindMarket.MarketBidCollectionPublic}>(asBidPublicPath) 
            if !asBidCap.check() {
              account.save<@FindMarketAuctionSoft.MarketBidCollection>(<- FindMarketAuctionSoft.createEmptyMarketBidCollection(receiver:receiverCap, tenantCapability:tenantCapability), to: asBidStoragePath)
              account.link<&FindMarketAuctionSoft.MarketBidCollection{FindMarketAuctionSoft.MarketBidCollectionPublic, FindMarket.MarketBidCollectionPublic}>(asBidPublicPath, target: asBidStoragePath)
            }

            let leaseTenantCapability= FindMarket.getTenantCapability(FindMarket.getTenantAddress("findLease")!)!

            let leaseSaleItemType= Type<@FindLeaseMarketSale.SaleItemCollection>()
            let leasePublicPath=FindMarket.getPublicPath(leaseSaleItemType, name: "findLease")
            let leaseStoragePath= FindMarket.getStoragePath(leaseSaleItemType, name:"findLease")
            let leaseSaleItemCap= account.getCapability<&FindLeaseMarketSale.SaleItemCollection{FindLeaseMarketSale.SaleItemCollectionPublic, FindLeaseMarket.SaleItemCollectionPublic}>(leasePublicPath) 
            if !leaseSaleItemCap.check() {
              //The link here has to be a capability not a tenant, because it can change.
              account.save<@FindLeaseMarketSale.SaleItemCollection>(<- FindLeaseMarketSale.createEmptySaleItemCollection(leaseTenantCapability), to: leaseStoragePath)
              account.link<&FindLeaseMarketSale.SaleItemCollection{FindLeaseMarketSale.SaleItemCollectionPublic, FindLeaseMarket.SaleItemCollectionPublic}>(leasePublicPath, target: leaseStoragePath)
            }

            let leaseASSaleItemType= Type<@FindLeaseMarketAuctionSoft.SaleItemCollection>()
            let leaseASPublicPath=FindMarket.getPublicPath(leaseASSaleItemType, name: "findLease")
            let leaseASStoragePath= FindMarket.getStoragePath(leaseASSaleItemType, name:"findLease")
            let leaseASSaleItemCap= account.getCapability<&FindLeaseMarketAuctionSoft.SaleItemCollection{FindLeaseMarketAuctionSoft.SaleItemCollectionPublic, FindLeaseMarket.SaleItemCollectionPublic}>(leaseASPublicPath) 
            if !leaseASSaleItemCap.check() {
              //The link here has to be a capability not a tenant, because it can change.
              account.save<@FindLeaseMarketAuctionSoft.SaleItemCollection>(<- FindLeaseMarketAuctionSoft.createEmptySaleItemCollection(leaseTenantCapability), to: leaseASStoragePath)
              account.link<&FindLeaseMarketAuctionSoft.SaleItemCollection{FindLeaseMarketAuctionSoft.SaleItemCollectionPublic, FindLeaseMarket.SaleItemCollectionPublic}>(leaseASPublicPath, target: leaseASStoragePath)
            }


            let leaseASBidType= Type<@FindLeaseMarketAuctionSoft.MarketBidCollection>()
            let leaseASBidPublicPath=FindMarket.getPublicPath(leaseASBidType, name: "findLease")
            let leaseASBidStoragePath= FindMarket.getStoragePath(leaseASBidType, name: "findLease")
            let leaseASBidCap= account.getCapability<&FindLeaseMarketAuctionSoft.MarketBidCollection{FindLeaseMarketAuctionSoft.MarketBidCollectionPublic, FindLeaseMarket.MarketBidCollectionPublic}>(leaseASBidPublicPath) 
            if !leaseASBidCap.check() {
              account.save<@FindLeaseMarketAuctionSoft.MarketBidCollection>(<- FindLeaseMarketAuctionSoft.createEmptyMarketBidCollection(receiver:receiverCap, tenantCapability:leaseTenantCapability), to: leaseASBidStoragePath)
              account.link<&FindLeaseMarketAuctionSoft.MarketBidCollection{FindLeaseMarketAuctionSoft.MarketBidCollectionPublic, FindLeaseMarket.MarketBidCollectionPublic}>(leaseASBidPublicPath, target: leaseASBidStoragePath)
            }

            // let leaseAESaleItemType= Type<@FindLeaseMarketAuctionEscrow.SaleItemCollection>()
            // let leaseAEPublicPath=FindMarket.getPublicPath(leaseAESaleItemType, name: "findLease")
            // let leaseAEStoragePath= FindMarket.getStoragePath(leaseAESaleItemType, name:"findLease")
            // let leaseAESaleItemCap= account.getCapability<&FindLeaseMarketAuctionEscrow.SaleItemCollection{FindLeaseMarketAuctionEscrow.SaleItemCollectionPublic, FindLeaseMarket.SaleItemCollectionPublic}>(leaseAEPublicPath) 
            // if !leaseAESaleItemCap.check() {
            // 	//The link here has to be a capability not a tenant, because it can change.
            // 	account.save<@FindLeaseMarketAuctionEscrow.SaleItemCollection>(<- FindLeaseMarketAuctionEscrow.createEmptySaleItemCollection(leaseTenantCapability), to: leaseAEStoragePath)
            // 	account.link<&FindLeaseMarketAuctionEscrow.SaleItemCollection{FindLeaseMarketAuctionEscrow.SaleItemCollectionPublic, FindLeaseMarket.SaleItemCollectionPublic}>(leaseAEPublicPath, target: leaseAEStoragePath)
            // }

            // let leaseAEBidType= Type<@FindLeaseMarketAuctionEscrow.MarketBidCollection>()
            // let leaseAEBidPublicPath=FindMarket.getPublicPath(leaseAEBidType, name: "findLease")
            // let leaseAEBidStoragePath= FindMarket.getStoragePath(leaseAEBidType, name: "findLease")
            // let leaseAEBidCap= account.getCapability<&FindLeaseMarketAuctionEscrow.MarketBidCollection{FindLeaseMarketAuctionEscrow.MarketBidCollectionPublic, FindLeaseMarket.MarketBidCollectionPublic}>(leaseAEBidPublicPath) 
            // if !leaseAEBidCap.check() {
            // 	account.save<@FindLeaseMarketAuctionEscrow.MarketBidCollection>(<- FindLeaseMarketAuctionEscrow.createEmptyMarketBidCollection(receiver:receiverCap, tenantCapability:leaseTenantCapability), to: leaseAEBidStoragePath)
            // 	account.link<&FindLeaseMarketAuctionEscrow.MarketBidCollection{FindLeaseMarketAuctionEscrow.MarketBidCollectionPublic, FindLeaseMarket.MarketBidCollectionPublic}>(leaseAEBidPublicPath, target: leaseAEBidStoragePath)
            // }

            let leaseDOSSaleItemType= Type<@FindLeaseMarketDirectOfferSoft.SaleItemCollection>()
            let leaseDOSPublicPath=FindMarket.getPublicPath(leaseDOSSaleItemType, name: "findLease")
            let leaseDOSStoragePath= FindMarket.getStoragePath(leaseDOSSaleItemType, name:"findLease")
            let leaseDOSSaleItemCap= account.getCapability<&FindLeaseMarketDirectOfferSoft.SaleItemCollection{FindLeaseMarketDirectOfferSoft.SaleItemCollectionPublic, FindLeaseMarket.SaleItemCollectionPublic}>(leaseDOSPublicPath) 
            if !leaseDOSSaleItemCap.check() {
              //The link here has to be a capability not a tenant, because it can change.
              account.save<@FindLeaseMarketDirectOfferSoft.SaleItemCollection>(<- FindLeaseMarketDirectOfferSoft.createEmptySaleItemCollection(leaseTenantCapability), to: leaseDOSStoragePath)
              account.link<&FindLeaseMarketDirectOfferSoft.SaleItemCollection{FindLeaseMarketDirectOfferSoft.SaleItemCollectionPublic, FindLeaseMarket.SaleItemCollectionPublic}>(leaseDOSPublicPath, target: leaseDOSStoragePath)
            }

            let leaseDOSBidType= Type<@FindLeaseMarketDirectOfferSoft.MarketBidCollection>()
            let leaseDOSBidPublicPath=FindMarket.getPublicPath(leaseDOSBidType, name: "findLease")
            let leaseDOSBidStoragePath= FindMarket.getStoragePath(leaseDOSBidType, name: "findLease")
            let leaseDOSBidCap= account.getCapability<&FindLeaseMarketDirectOfferSoft.MarketBidCollection{FindLeaseMarketDirectOfferSoft.MarketBidCollectionPublic, FindLeaseMarket.MarketBidCollectionPublic}>(leaseDOSBidPublicPath) 
            if !leaseDOSBidCap.check() {
              account.save<@FindLeaseMarketDirectOfferSoft.MarketBidCollection>(<- FindLeaseMarketDirectOfferSoft.createEmptyMarketBidCollection(receiver:receiverCap, tenantCapability:leaseTenantCapability), to: leaseDOSBidStoragePath)
              account.link<&FindLeaseMarketDirectOfferSoft.MarketBidCollection{FindLeaseMarketDirectOfferSoft.MarketBidCollectionPublic, FindLeaseMarket.MarketBidCollectionPublic}>(leaseDOSBidPublicPath, target: leaseDOSBidStoragePath)
            }

            // let leaseDOESaleItemType= Type<@FindLeaseMarketDirectOfferEscrow.SaleItemCollection>()
            // let leaseDOEPublicPath=FindMarket.getPublicPath(leaseDOESaleItemType, name: "findLease")
            // let leaseDOEStoragePath= FindMarket.getStoragePath(leaseDOESaleItemType, name:"findLease")
            // let leaseDOESaleItemCap= account.getCapability<&FindLeaseMarketDirectOfferEscrow.SaleItemCollection{FindLeaseMarketDirectOfferEscrow.SaleItemCollectionPublic, FindLeaseMarket.SaleItemCollectionPublic}>(leaseDOEPublicPath) 
            // if !leaseDOESaleItemCap.check() {
            // 	//The link here has to be a capability not a tenant, because it can change.
            // 	account.save<@FindLeaseMarketDirectOfferEscrow.SaleItemCollection>(<- FindLeaseMarketDirectOfferEscrow.createEmptySaleItemCollection(leaseTenantCapability), to: leaseDOEStoragePath)
            // 	account.link<&FindLeaseMarketDirectOfferEscrow.SaleItemCollection{FindLeaseMarketDirectOfferEscrow.SaleItemCollectionPublic, FindLeaseMarket.SaleItemCollectionPublic}>(leaseDOEPublicPath, target: leaseDOEStoragePath)
            // }

            // let leaseDOEBidType= Type<@FindLeaseMarketDirectOfferEscrow.MarketBidCollection>()
            // let leaseDOEBidPublicPath=FindMarket.getPublicPath(leaseDOEBidType, name: "findLease")
            // let leaseDOEBidStoragePath= FindMarket.getStoragePath(leaseDOEBidType, name: "findLease")
            // let leaseDOEBidCap= account.getCapability<&FindLeaseMarketDirectOfferEscrow.MarketBidCollection{FindLeaseMarketDirectOfferEscrow.MarketBidCollectionPublic, FindLeaseMarket.MarketBidCollectionPublic}>(leaseDOEBidPublicPath) 
            // if !leaseDOEBidCap.check() {
            // 	account.save<@FindLeaseMarketDirectOfferEscrow.MarketBidCollection>(<- FindLeaseMarketDirectOfferEscrow.createEmptyMarketBidCollection(receiver:receiverCap, tenantCapability:leaseTenantCapability), to: leaseDOEBidStoragePath)
            // 	account.link<&FindLeaseMarketDirectOfferEscrow.MarketBidCollection{FindLeaseMarketDirectOfferEscrow.MarketBidCollectionPublic, FindLeaseMarket.MarketBidCollectionPublic}>(leaseDOEBidPublicPath, target: leaseDOEBidStoragePath)
            // }
            //SYNC with register

          }
        }
        `),
        args([arg(nickname, t.String)]),
        payer(authz),
        proposer(authz),
        authorizations([authz]),
        limit(9999),
      ]).then(decode)
      setOpen(false)
      await tx(res).onceSealed()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <Container className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                style={{ borderRadius: "20px", width: "100%" }}
                className="relative bg-white rounded-lg pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full md:max-w-xl"
              >
                {profile == null ? (
                  <>
                    <div>
                      <Title>Create .FIND profile</Title>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Title>Change Profile Picture</Title>
                    </div>
                  </>
                )}
                <Wrapper>
                  {Object.keys(profilePictures).map((picture, i) => (
                    <Img
                      key={i}
                      selected={
                        select ===
                        profilePictures[
                          picture as unknown as keyof typeof profilePictures
                        ].image
                      }
                      onClick={() => {
                        setSelect(
                          profilePictures[
                            picture as unknown as keyof typeof profilePictures
                          ].image,
                        )
                      }}
                      src={
                        profilePictures[
                          picture as unknown as keyof typeof profilePictures
                        ].image
                      }
                    />
                  ))}
                </Wrapper>
                {profile == null ? (
                  <></>
                ) : (
                  <div>
                    <Button
                      onClick={() => {
                        changeProfilePicture()
                      }}
                    >
                      Save on-chain
                    </Button>
                  </div>
                )}

                <ActionItem>
                  <Title>Choose Username</Title>
                  <FuncArgInput
                    placeholder="Username"
                    type="text"
                    onChange={(e: any) => setNickname(e.target.value)}
                  />
                  <FuncArgButton
                    onClick={() => {
                      createProfile()
                    }}
                  >
                    Save on-chain
                  </FuncArgButton>
                </ActionItem>
              </DialogPanel>
            </Transition.Child>
          </Container>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default ChangeProfilePictureModal
