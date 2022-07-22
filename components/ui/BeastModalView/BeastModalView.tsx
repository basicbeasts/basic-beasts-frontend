import { FC, Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/outline"

import star from "public/basic_starLevel.png"
import styled from "styled-components"
import ChangeNicknameModal from "../ChangeNicknameModal"

const DialogPanel = styled(Dialog.Panel)<TailwindProps>`
  border-radius: 20px;
`

const Container = styled.div`
  /* width: 400px; */
  background: #fff;
  font-size: 18px;
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`

// -----------------------------------------------------------------------
// Header
// Styling for the header of a Beast Card
// -----------------------------------------------------------------------

const Header = styled.div<Omit<Color, "background">>`
  height: 220px;
  background: ${(props) => props.colorCode};
  padding: 28px 35px;
  color: #242526;
`

const BeastName = styled.h3`
  margin: 0;
  font-size: 55px;
  font-weight: normal;
  line-height: 50px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
`

const HeaderDetails = styled.div`
  display: table;
  clear: both;
  width: 100%;
  margin-top: 10px;
`

const Serial = styled.div`
  float: left;
  font-size: 1.3em;
`

const RightHeaderDetails = styled.div`
  float: right;
`

const DexNumber = styled.div`
  font-size: 1.3em;
  text-align: right;
`

const StarImg = styled.img`
  width: 1.2em;
  margin-left: 5px;
  margin-top: 1px;
  user-drag: none;
  -webkit-user-drag: none;
`

const StarLevel = styled.div`
  height: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-flow: row;
`

// -----------------------------------------------------------------------
// Content
// Styling for the content of a Beast Card
// -----------------------------------------------------------------------

const Content = styled.div`
  height: 360px;
  background: #fff;
  padding: 3vw;
  font-size: 1.2em;
  color: #242526;
`

const ContentWrapper = styled.div<Omit<Unknown, "beastTemplate">>`
  top: ${({ unknown }) => (!unknown ? "-150px" : "30px")};
  position: relative;
`

const Img = styled.img`
  width: 180px;
  margin: auto;
  top: -60px;
  position: relative;
  user-drag: none;
  -webkit-user-drag: none;
`

const Description = styled.div`
  margin-top: 10px;
`

const InfoContainer = styled.ul`
  display: table;
  clear: both;
  margin-top: 15px;
`

const InfoLabel = styled.div`
  float: left;
  width: 150px;
  color: #868889;
`

const InfoText = styled.div`
  float: right;
`

const InfoListItem = styled.span`
  margin-right: 30px;
`

const BasicSkills = styled.div`
  display: table;
  clear: both;
  height: 95px;
`

const Skills = styled.div`
  float: right;
  margin-top: 5px;
`

const Skill = styled.div`
  height: 25px;
`

const BasicSkillsLabel = styled.div`
  float: left;
  margin-right: 45px;
  font-size: 25px;
  @media (max-width: 450px) {
    margin-right: 33px;
  }
`

const UltimateSkill = styled.div<Omit<Button, "background">>`
  display: table;
  clear: both;
  width: 100%;
  margin: 25px auto;
  background-color: ${(props) => props.backgroundColor || "#FFE595"};
  box-shadow: -3px 0px 0px 0px ${(props) => props.outset || "#B3A068"},
    0px -3px 0px 0px ${(props) => props.outset || "#B3A068"},
    0px 3px 0px 0px ${(props) => props.outset || "#B3A068"},
    3px 0px 0px 0px ${(props) => props.outset || "#B3A068"},
    inset -3px -3px ${(props) => props.inset || "#E6CE86"};
  padding: 5px 15px;
  font-size: 1.1em;
`

const UltimateSkillLabel = styled.div`
  float: left;
  margin-right: 32px;
  @media (max-width: 450px) {
    margin-right: 20px;
  }
`

const SkillName = styled.div`
  float: right;
  width: 150px;
`

type Color = {
  colorCode: any
}

type Button = {
  backgroundColor: string
  outset: string
  inset: string
}

type BeastTemplate = {
  dexNumber: number
  name: string
  type: string
  description: string
  starLevel: number
  basicSkills: [string]
  ultimateSkill: string
  image?: Image
  color: string
  buttonBackground: string
  buttonOutset: string
  buttonInset: string
  typeTagBackground: string
  typeTagOutset: string
  typeTagInset: string
}

type TailwindProps = {
  className: any
}

type Props = {
  beast: any
  open: boolean
  setOpen: any
}

const BeastModalView: FC<Props> = ({ beast, open, setOpen }) => {
  const [open2, setOpen2] = useState(false)

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
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative bg-white rounded-lg pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full md:max-w-xl">
                <ChangeNicknameModal
                  beast={beast}
                  open={open2}
                  setOpen={setOpen2}
                />
                <div>
                  {beast != null ? (
                    <Container>
                      <Header
                        colorCode={
                          "linear-gradient(180deg, rgba(255,232,163,1) 0%, rgba(255,217,102,1) 100%)"
                        }
                      >
                        <BeastName
                          onClick={() => {
                            setOpen2(true)
                          }}
                        >
                          {beast.nickname}
                        </BeastName>
                        <HeaderDetails>
                          <Serial>
                            Serial #{beast.serialNumber} |{" "}
                            {beast.maxAdminMintAllowed}
                          </Serial>
                          <RightHeaderDetails>
                            <DexNumber>
                              Dex {"#" + ("00" + beast.dexNumber).slice(-3)}
                            </DexNumber>
                            <StarLevel>
                              {Array.from(
                                Array(beast.starLevel + 2),
                                (e, i) => {
                                  return <StarImg src={star.src} key={i} />
                                },
                              )}
                            </StarLevel>
                          </RightHeaderDetails>
                        </HeaderDetails>
                        <Img src={beast.image} />
                      </Header>
                      <Content>
                        <Description>{beast.description}</Description>
                        <InfoContainer>
                          <InfoLabel>Type</InfoLabel>
                          <InfoText>
                            {beast.elements != null
                              ? beast.elements.map((skill: any, i: any) => (
                                  <InfoListItem key={i}>{skill}</InfoListItem>
                                ))
                              : ""}
                          </InfoText>
                        </InfoContainer>
                        <InfoContainer>
                          <InfoLabel>Gender</InfoLabel>
                          <InfoText>{beast.sex}</InfoText>
                        </InfoContainer>
                        <InfoContainer>
                          <InfoLabel>Basic Skills</InfoLabel>
                          <InfoText>
                            {beast.basicSkills != null
                              ? beast.basicSkills.map((skill: any, i: any) => (
                                  <InfoListItem key={i}>{skill}</InfoListItem>
                                ))
                              : ""}
                          </InfoText>
                        </InfoContainer>
                        <UltimateSkill>
                          <UltimateSkillLabel>
                            Ultimate Skill
                          </UltimateSkillLabel>
                          <SkillName>{beast.ultimateSkill}</SkillName>
                        </UltimateSkill>
                      </Content>
                    </Container>
                  ) : (
                    ""
                  )}
                  {/* <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Payment successful
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequatur amet labore.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Go back to dashboard
                  </button> */}
                </div>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default BeastModalView
