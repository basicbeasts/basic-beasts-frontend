import { FC, Dispatch, SetStateAction } from "react"
import styled from "styled-components"
import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XIcon } from "@heroicons/react/outline"

const OverlayBg = styled.div`
  backdrop-filter: blur(20px);
  background: rgba(33, 33, 39, 0.5);
`

const PanelBg = styled.div`
  background: #212127;

  border-radius: 16px;

  @media (max-width: 400px) {
    border-radius: 0px;
  }
`

const DialogPanel = styled<any>(Dialog.Panel)`
  margin: 24px;
  @media (max-width: 400px) {
    margin: 0px;
  }
`

const DialogTitle = styled<any>(Dialog.Title)`
  color: #f3cb23;
`

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const SlideOverNavbar: FC<Props> = ({ open, setOpen }: Props) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <OverlayBg className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-sm">
                  <PanelBg className="flex h-full flex-col py-6">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <DialogTitle className="text-lg font-medium">
                          {" "}
                          Panel title{" "}
                        </DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <div>x</div>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* Replace with your content */}
                      <div className="absolute inset-0 px-4 sm:px-6">
                        <div
                          className="h-full border-2 border-dashed border-gray-200"
                          aria-hidden="true"
                        />
                      </div>
                      {/* /End replace */}
                    </div>
                  </PanelBg>
                </DialogPanel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default SlideOverNavbar
