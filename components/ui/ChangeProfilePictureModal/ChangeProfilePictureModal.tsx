import { FC, Fragment, useEffect, useState } from "react"
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
import { toast } from "react-toastify"
import { toastStatus } from "@framework/helpers/toastStatus"

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

  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  &:hover {
    background: #e4be23;
    color: #212127;

    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
  }
`

const Title = styled.div`
  font-size: 2.5em;
  margin-bottom: 20px;
`

const Wrapper = styled.div`
  margin: 20px 20px 0;
  /* display: flex;
  flex-direction: row; */
  @media (max-width: 361px) {
    padding: auto;
  }
`

const Container = styled.div`
  align-items: center;
`

const Box = styled.div<any>`
  height: 50px;
  width: 50px;
  background: ${(props) => (props.selected ? "#ffe595" : "#425066")};
`

const Notice = styled.div`
  margin-top: 10px;
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
  @media (max-width: 361px) {
    width: 80px;
    height: 80px;
    margin: 5px 0;
  }
`

type Props = {
  open: boolean
  setOpen: any
  profile: any
  profilePicture: any
  setProfilePicture: any
  getProfile: any
}

const ChangeProfilePictureModal: FC<Props> = ({
  open,
  setOpen,
  profile,
  profilePicture,
  setProfilePicture,
  getProfile,
}) => {
  const [nickname, setNickname] = useState<string | null>("")
  const [select, setSelect] = useState<any>(profilePictures[1].image)

  useEffect(() => {
    setSelect(profilePicture)
  }, [profilePicture])

  const changeProfilePicture = async () => {
    const id = toast.loading("Initializing...")

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
      setProfilePicture(select)
      tx(res).subscribe((res: any) => {
        toastStatus(id, res.status)
      })
      await tx(res)
        .onceSealed()
        .then((result: any) => {
          toast.update(id, {
            render: "Transaction Sealed",
            type: "success",
            isLoading: false,
            autoClose: 5000,
          })
        })
    } catch (err) {
      toast.update(id, {
        render: () => <div>Error, try again later...</div>,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      })
      console.log(err)
    }
  }

  const createProfile = async () => {
    const id = toast.loading("Initializing...")

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
        // import FindLeaseMarket from 0xFindLeaseMarket

        transaction(name: String, avatar: String) {


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

            var created=false
            var updated=false
            let profileCap = account.getCapability<&{Profile.Public}>(Profile.publicPath)
            if !profileCap.check() {
              let profile <-Profile.createUser(name:name, createdAt: "Basic Beasts")
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

            profile.setAvatar(avatar)

          }
          
        }
        `),
        args([arg(nickname, t.String), arg(select, t.String)]),
        payer(authz),
        proposer(authz),
        authorizations([authz]),
        limit(9999),
      ]).then(decode)
      setOpen(false)
      setProfilePicture(select)
      tx(res).subscribe((res: any) => {
        toastStatus(id, res.status)
      })
      await tx(res)
        .onceSealed()
        .then((result: any) => {
          toast.update(id, {
            render: "Transaction Sealed",
            type: "success",
            isLoading: false,
            autoClose: 5000,
          })
        })
      getProfile()
    } catch (err) {
      toast.update(id, {
        render: () => <div>Error, try again later...</div>,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      })
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
                <Wrapper className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3">
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
                  <div
                    className="text-right absolute -top-1 right-4 sm:hidden"
                    onClick={() => setOpen(false)}
                  >
                    <div style={{ fontSize: "2.5em" }}>x</div>
                  </div>
                </Wrapper>
                {profile == null ? (
                  <>
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
                    <Notice>
                      Notice: This will create an find.xyz profile on-chain as
                      well.
                    </Notice>
                  </>
                ) : (
                  <>
                    <div>
                      <Button
                        onClick={() => {
                          changeProfilePicture()
                        }}
                      >
                        Save on-chain
                      </Button>
                    </div>
                    <Notice>
                      Notice: This change will affect your find.xyz profile
                      picture on-chain as well.
                    </Notice>
                  </>
                )}
              </DialogPanel>
            </Transition.Child>
          </Container>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default ChangeProfilePictureModal
