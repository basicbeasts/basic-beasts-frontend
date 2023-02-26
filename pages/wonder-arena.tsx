import type { NextPage } from "next"
import DefaultHeroSection from "@components/ui/DefaultHeroSection"
import { useEffect, useState } from "react"
import { useAuth } from "@components/auth/AuthProvider"
import styled from "styled-components"
import { query } from "@onflow/fcl"
import WonderBeastThumbnail from "@components/ui/WonderArena/WonderBeastThumbnail"

const Button = styled.button`
  padding: 8px 24px 12px 26px;
  margin-top: 30px;
  margin-right: 2px;
  font-size: 26px;
  background-color: #feff95;
  box-shadow: -3px 0px 0px 0px #a15813, 0px -3px 0px 0px #a15813,
    0px 3px 0px 0px #a15813, 3px 0px 0px 0px #a15813, inset -3px -3px #f3cb23;
  color: #a75806;
  border: none;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  &:active {
    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
    box-shadow: -3px 0px 0px 0px #a15813, 0px -3px 0px 0px #a15813,
      0px 3px 0px 0px #a15813, 3px 0px 0px 0px #a15813, inset 3px 3px #f3cb23;
  }
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  margin-bottom: 100px;
`

const ListWrapper = styled.div`
  width: 100%;
  // overflow: hidden;
  // overflow-y: scroll;
  // height: 270px;
  margin-top: 15px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 5px;
`

const Container = styled.div`
  padding: 20px;
  margin: 20px 0;
  display: flex;
  height: 500px;
  background: white;
  border-radius: 10px;
  justify-content: center;

  //Scroll
  overflow: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 800px) {
    height: 400px;
    margin: 30px;
  }
`

const ContainerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8%;
  margin: 60px 0 120px;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`

const H1 = styled.h1`
  font-size: 2rem;
  color: #fff;
  line-height: 1;
  @media (max-width: 380px) {
    font-size: 2rem;
  }
`

const H3 = styled.h3`
  font-size: 1rem;
  color: #fff;
  line-height: 1;
  margin: 10px 0 100px;
`

const WonderArena: NextPage = () => {
  const { logIn, logOut, user, loggedIn } = useAuth()

  const [userBloctoBeasts, setUserBloctoBeasts] = useState<any>(null)
  const [selectedBeasts, setSelectedBeasts] = useState<any>([])
  const [beastSelected, setBeastSelected] = useState(false)

  useEffect(() => {
    if (user?.addr != null) {
      fetchUserBeasts()
    }
  }, [user?.addr])

  const fetchUserBeasts = async () => {
    try {
      let res = await query({
        cadence: `
        import BasicBeasts from 0xBasicBeasts
        
        pub struct Beast {
            pub let id: UInt64
            pub let serialNumber: UInt32
            pub let beastTemplateID: UInt32
            pub let nickname: String?
            pub let firstOwner: Address?
            pub let sex: String
            pub let matron: BasicBeasts.BeastNftStruct?
            pub let sire: BasicBeasts.BeastNftStruct?
            pub let name: String
            pub let starLevel: UInt32
            pub let data: {String: String}
            pub let skin: String
            pub let evolvedFrom: [BasicBeasts.BeastNftStruct]?
            pub let maxAdminMintAllowed: UInt32
            pub let dexNumber: UInt32
            pub let description: String
            pub let elements: [String]
            pub let basicSkills: [String]
            pub let ultimateSkill: String
            pub let breedableBeastTemplateID: UInt32

        
            init(
            id: UInt64, 
            serialNumber: UInt32,
            beastTemplateID: UInt32,
            nickname: String?,
            firstOwner: Address?,
            sex: String, 
            matron: BasicBeasts.BeastNftStruct?,
            sire: BasicBeasts.BeastNftStruct?,
            name: String,
            starLevel: UInt32,
            data: {String: String},
            skin: String,
            evolvedFrom: [BasicBeasts.BeastNftStruct]?,
            maxAdminMintAllowed: UInt32,
            dexNumber: UInt32,
            description: String,
            elements: [String],
            basicSkills: [String],
            ultimateSkill: String,
            breedableBeastTemplateID: UInt32
            ) {
                self.id = id
                self.serialNumber = serialNumber
                self.beastTemplateID = beastTemplateID
                self.nickname = nickname
                self.firstOwner = firstOwner
                self.sex = sex
                self.matron = matron
                self.sire = sire
                self.name = name
                self.starLevel = starLevel
                self.data = data
                self.skin = skin
                self.evolvedFrom = evolvedFrom
                self.maxAdminMintAllowed = maxAdminMintAllowed
                self.dexNumber = dexNumber
                self.description = description
                self.elements = elements
                self.basicSkills = basicSkills
                self.ultimateSkill = ultimateSkill
                self.breedableBeastTemplateID = breedableBeastTemplateID
            }
        }
        
        pub fun main(acct: Address): [Beast] {
            var beastCollection: [Beast] = []
        
            let collectionRef = getAccount(acct).getCapability(BasicBeasts.CollectionPublicPath)
                .borrow<&{BasicBeasts.BeastCollectionPublic}>()
                ?? panic("Could not get public beast collection reference")
        
            let beastIDs = collectionRef.getIDs()
        
            for id in beastIDs {
                let borrowedBeast = collectionRef.borrowBeast(id: id)!
                let beast = Beast(
                                    id: borrowedBeast.id, 
                                    serialNumber: borrowedBeast.serialNumber, 
                                    beastTemplateID: borrowedBeast.getBeastTemplate().beastTemplateID,
                                    nickname: borrowedBeast.getNickname(), 
                                    firstOwner: borrowedBeast.getFirstOwner(), 
                                    sex: borrowedBeast.sex, 
                                    matron: borrowedBeast.matron, 
                                    sire: borrowedBeast.sire, 
                                    name: borrowedBeast.getBeastTemplate().name, 
                                    starLevel: borrowedBeast.getBeastTemplate().starLevel, 
                                    data: borrowedBeast.getBeastTemplate().data, 
                                    skin: borrowedBeast.getBeastTemplate().skin, 
                                    evolvedFrom: borrowedBeast.getEvolvedFrom(),
                                    maxAdminMintAllowed: borrowedBeast.getBeastTemplate().maxAdminMintAllowed,
                                    dexNumber: borrowedBeast.getBeastTemplate().dexNumber,
                                    description: borrowedBeast.getBeastTemplate().description,
                                    elements: borrowedBeast.getBeastTemplate().elements,
                                    basicSkills: borrowedBeast.getBeastTemplate().basicSkills,
                                    ultimateSkill: borrowedBeast.getBeastTemplate().ultimateSkill,
                                    breedableBeastTemplateID: borrowedBeast.getBeastTemplate().breedableBeastTemplateID

                )
                beastCollection.append(beast)
            }
        
          return beastCollection
        }
        `,

        args: (arg: any, t: any) => [arg(user?.addr, t.Address)],
      })
      let mappedCollection: any = []
      for (let item in res) {
        const element = res[item]
        var beast = {
          id: element.id,
          serialNumber: element.serialNumber,
          beastTemplateID: element.beastTemplateID,
          nickname: element.nickname,
          firstOwner: element.firstOwner,
          sex: element.sex,
          matron: element.matron,
          sire: element.sire,
          name: element.name,
          starLevel: element.starLevel,
          data: element.data,
          skin: element.skin,
          evolvedFrom: element.evolvedFrom,
          maxAdminMintAllowed: element.maxAdminMintAllowed,
          dexNumber: element.dexNumber,
          description: element.description,
          elements: element.elements,
          basicSkills: element.basicSkills,
          ultimateSkill: element.ultimateSkill,
          breedableBeastTemplateID: element.breedableBeastTemplateID,
        }
        mappedCollection.push(beast)
      }
      mappedCollection.sort((a: any, b: any) => b.id - a.id)
      setUserBloctoBeasts(mappedCollection)
      // Get evolvable beast dictionary {beastTemplateID: [beasts]}
      var beasts = [...mappedCollection]
      beasts.sort((a, b) => a.serialNumber - b.serialNumber)
      beasts.sort((a, b) => a.beastTemplateID - b.beastTemplateID)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (id: any, serial: any) => {
    if (selectedBeasts.includes(id)) {
      //remove
      setSelectedBeasts(selectedBeasts.filter((beast: any) => beast != id))
      setBeastSelected(false)
    } else if (selectedBeasts.length < 100) {
      //add
      setSelectedBeasts((selectedBeasts: any) => [...selectedBeasts, id])
      setBeastSelected(true)
    }
  }

  return (
    <div>
      <DefaultHeroSection
        title="Transfer between your wallets!"
        description="Move your beasts between your Wonder Arena account and Blocto wallet"
      />
      {/* <pre>{JSON.stringify(selectedBeasts, null, 2)}</pre> */}
      {loggedIn ? (
        <ContainerWrapper>
          <div>
            <H1>Wonder Arena Account: ADD ADDRESS</H1>

            <Container>
              {userBloctoBeasts != null && (
                <div>
                  <ListWrapper>
                    <ul
                      role="list"
                      className="grid gap-x-2 gap-y-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4"
                    >
                      {userBloctoBeasts?.map((beast: any, i: any) => (
                        <>
                          <li
                            key={i}
                            onClick={() =>
                              handleChange(beast?.id, beast?.serialNumber)
                            }
                          >
                            <div>
                              <WonderBeastThumbnail
                                beast={beast}
                                selected={selectedBeasts.includes(beast?.id)}
                              />
                            </div>
                          </li>
                        </>
                      ))}
                    </ul>
                  </ListWrapper>
                </div>
              )}
            </Container>
            {selectedBeasts.length > 0 && (
              <>
                <Button>Transfer Wonder Arena → Blocto</Button>
                <H3>Selected: {selectedBeasts.length}</H3>
              </>
            )}
          </div>
          <div>
            <H1>Blocto Wallet: {user?.addr}</H1>
            <Container>
              {userBloctoBeasts != null && (
                <div>
                  <ListWrapper>
                    <ul
                      role="list"
                      className="grid gap-x-2 gap-y-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4"
                      // className="grid gap-x-2 gap-y-4 grid-cols-3 sm:grid-cols-4"
                    >
                      {userBloctoBeasts?.map((beast: any, i: any) => (
                        <>
                          <li
                            key={i}
                            onClick={() =>
                              handleChange(beast?.id, beast?.serialNumber)
                            }
                          >
                            <div>
                              <WonderBeastThumbnail
                                beast={beast}
                                selected={selectedBeasts.includes(beast?.id)}
                              />
                            </div>
                          </li>
                        </>
                      ))}
                    </ul>
                  </ListWrapper>
                </div>
              )}
            </Container>

            {selectedBeasts.length > 0 && (
              <>
                <Button>Transfer Blocto → Wonder Arena</Button>
                <H3>Selected: {selectedBeasts.length}</H3>
              </>
            )}
          </div>
        </ContainerWrapper>
      ) : (
        <Wrapper>
          <Button onClick={() => logIn()}>Connect Wallet</Button>
        </Wrapper>
      )}
    </div>
  )
}

export default WonderArena
