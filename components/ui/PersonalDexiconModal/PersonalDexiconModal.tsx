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

const ActionItem = styled.div`
  padding: 10px 0;
  display: flex;
`

const FuncArgInput = styled.input`
  background: transparent;
  border: 1px solid #222;
  color: #222;
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
  border: 1px solid #222;
  color: #222;
  font-size: 1.5em;
  padding: 10px 20px;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  &:hover {
    background: #000000;
    color: #fff;
  }
`

const Title = styled.div`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #e4be23;
  text-transform: uppercase;
  @media (max-width: 600px) {
    font-size: 1.5em;
    margin: 0;
  }
`

const Wrapper = styled.div`
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  align-items: center;
`

const BeastContainer = styled.div`
  height: 80px;
  width: 80px;
  @media (max-width: 600px) {
    width: 60px;
    height: 60px;
  }
`

const NoBeastContainer = styled.div`
  background: #e4bd2325;
  color: #fff;
  border-radius: 10px;

  height: 80px;
  width: 80px;
  font-size: 35px;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  @media (max-width: 600px) {
    width: 60px;
    height: 60px;
    font-size: 25px;
  }
`

const Span = styled.div`
  color: #bd9f23;
  font-size: 1.3em;
  padding: 15px;
  @media (max-width: 600px) {
    font-size: 1em;
    padding: 0 0 0 10px;
  }
`

const DialogContainer = styled(Dialog.Panel)<any>`
  border-radius: 20px;
  background: #ffe8a3;
  width: 100%;
  max-width: 75%;
  @media (max-width: 1240px) {
    max-width: 90%;
  }
  @media (max-width: 600px) {
    max-width: 95%;
  }
`

const Icon = styled.div`
  visibility: hidden;
  //Responsive
  @media (max-width: 800px) {
    visibility: visible;
    position: absolute;
    /* top: 1.2rem; */
    background: transparent;
    font-size: 20px;
    outline: none;
    color: #e4be23;
    font-size: 50px;
    left: 15px;
    top: -10px;
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
        14 0,
      pointer !important;
    z-index: 19;
  }
`

type Props = {
  open: boolean
  setOpen: any
  dexicon: any
  profileName: any
}

const PersonalDexiconModal: FC<Props> = ({
  open,
  setOpen,
  dexicon,
  profileName,
}) => {
  const personalDexicon = Array.from({ length: 151 }, (_, i) => i + 1)

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
              <DialogContainer
                style={{}}
                className="relative bg-white rounded-lg pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full md:max-w-xl"
              >
                <Wrapper>
                  <Icon className="icon" onClick={() => setOpen(false)}>
                    {"<"}
                  </Icon>
                  {dexicon != null ? (
                    <>
                      <ActionItem>
                        <Title>
                          {profileName != null
                            ? profileName + "´s"
                            : "Personal"}{" "}
                          Dexicon
                        </Title>
                        <Span>{Object.keys(dexicon).length}/151</Span>
                      </ActionItem>
                      <ul
                        role="list"
                        className="grid grid-cols-4 gap-x-5 gap-y-5 sm:grid-cols-6 sm:gap-x-3 md:grid-cols-8 lg:grid-cols-9 xl:gap-x-6 xl:grid-cols-12 2xl:grid-cols-12"
                      >
                        {personalDexicon.map((dex: any, i: any) => (
                          <li key={i}>
                            <BeastContainer>
                              {dexicon[dex] != null ? (
                                <img src={dexicon[dex]} />
                              ) : (
                                <NoBeastContainer key={i}>
                                  {("00" + dex).slice(-3)}
                                </NoBeastContainer>
                              )}
                            </BeastContainer>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <>
                      <ActionItem>
                        <Title>
                          {profileName != null
                            ? profileName + "´s"
                            : "Personal"}{" "}
                          Dexicon
                        </Title>
                        <Span>0/151</Span>
                      </ActionItem>
                      <ul
                        role="list"
                        className="grid grid-cols-4 gap-x-5 gap-y-5 sm:grid-cols-6 sm:gap-x-3 md:grid-cols-8 lg:grid-cols-9 xl:gap-x-6 xl:grid-cols-12 2xl:grid-cols-12"
                      >
                        {personalDexicon.map((dex: any, i: any) => (
                          <li key={i}>
                            <BeastContainer>
                              <NoBeastContainer key={i}>
                                {("00" + dex).slice(-3)}
                              </NoBeastContainer>
                            </BeastContainer>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </Wrapper>
              </DialogContainer>
            </Transition.Child>
          </Container>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default PersonalDexiconModal
