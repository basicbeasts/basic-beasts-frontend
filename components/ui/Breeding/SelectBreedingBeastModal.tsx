import { FC, Fragment, useRef, useState } from "react"
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
import { toast } from "react-toastify"
import { toastStatus } from "@framework/helpers/toastStatus"
import BreedableBeastThumbnail from "./BreedableBeastThumbnail"

const ActionItem = styled.div`
  padding: 10px 0;
  width: 100%;
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
  @media (max-width: 398px) {
    width: 100%;
    border-radius: 8px 8px 0 0;
  }
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
  &:disabled {
    background: gray;
    color: #fff;
    opacity: 0.35;
  }
  @media (max-width: 398px) {
    width: 100%;
    border-radius: 0 0 8px 8px;
    margin-top: -1px;
  }
`

const Title = styled.div`
  font-size: 2.5em;
  margin-bottom: 20px;
`

const Wrapper = styled.div`
  margin: 0 20px;
`

const Container = styled.div`
  align-items: center;
`

const NicknameLengthWarning = styled.div`
  color: red;
`

const ListWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  height: 400px;
  margin-top: 15px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 5px;
  margin-bottom: 20px;
`

const EvolveButton = styled.button`
  width: 100px;
  border-color: rgb(22, 22, 26);
  color: rgb(255, 255, 255);
  background: rgb(22, 22, 26);
  padding: 3px 15px 4px;
  border-radius: 14px;
  text-transform: capitalize;
  &:hover {
    color: rgb(255, 255, 255);
    border-color: rgb(22, 22, 26);
    background: rgb(0, 0, 0);
  }
  &:focus {
    color: rgb(255, 255, 255);
    border-color: rgb(22, 22, 26);
    background: rgb(0, 0, 0);
  }
  &:active {
    transform: scale(0.95);
  }
  &:disabled {
    background: gray;
    color: #fff;
    opacity: 0.35;
    &:active {
      transform: none;
    }
  }
`

type Props = {
  beastID: any
  open: boolean
  setOpen: any
  beastName: any
  breedableBeasts: any
  setBeastSelected: any
  beastSelected: any
  setSelectedBeasts: any
  selectedBeasts: any
  setSelectedSerial: any
  setSelectedGender: any
}

const SelectBreedingBeastModal: FC<Props> = ({
  beastID,
  open,
  setOpen,
  beastName,
  breedableBeasts,
  setBeastSelected,
  beastSelected,
  selectedBeasts,
  setSelectedBeasts,
  setSelectedSerial,
  setSelectedGender,
}) => {
  const handleChange = (id: any, gender: any, serialNumber: any) => {
    if (selectedBeasts.includes(id)) {
      //remove
      setSelectedBeasts(selectedBeasts.filter((beast: any) => beast != id))
      setSelectedGender(null)
      setSelectedSerial(null)
      setBeastSelected(false)
    } else if (selectedBeasts.length < 1) {
      //add
      setSelectedBeasts((selectedBeasts: any) => [...selectedBeasts, id])
      setSelectedGender(gender)
      setSelectedSerial(serialNumber)
      setBeastSelected(true)
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
              <Dialog.Panel
                style={{ borderRadius: "20px", width: "100%" }}
                className="relative bg-white rounded-lg pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full md:max-w-xl"
              >
                <Wrapper>
                  <ActionItem>
                    <Title>Select a Beast</Title>
                    <ListWrapper>
                      <ul
                        role="list"
                        className="grid gap-x-2 gap-y-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4"
                      >
                        {breedableBeasts != null && (
                          <>
                            {breedableBeasts.map((beast: any, i: any) => (
                              <>
                                <li
                                  key={i}
                                  onClick={() =>
                                    handleChange(
                                      beast?.id,
                                      beast?.sex,
                                      beast?.serialNumber,
                                    )
                                  }
                                >
                                  <div>
                                    <BreedableBeastThumbnail
                                      beast={beast}
                                      selected={selectedBeasts.includes(
                                        beast?.id,
                                      )}
                                    />
                                  </div>
                                </li>
                              </>
                            ))}
                          </>
                        )}
                      </ul>
                    </ListWrapper>
                    <EvolveButton
                      disabled={!beastSelected}
                      onClick={() => {
                        setOpen(false)
                      }}
                    >
                      Select
                    </EvolveButton>
                  </ActionItem>
                </Wrapper>
              </Dialog.Panel>
            </Transition.Child>
          </Container>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default SelectBreedingBeastModal
