import styled from "styled-components"

import { FC, Fragment, useEffect, useState } from "react"
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon, MinusIcon, PlusIcon } from "@heroicons/react/solid"

const Wrapper = styled.div`
  background: transparent;
  margin-right: 1.125rem;
  width: 200px;
`

const FuncArgInput = styled.input`
  background: transparent;

  border: none;
  color: #fff;
  font-size: 1em;
  padding: 8px;
  padding-left: 15px;
  width: 100%;
  cursor: pointer;
  margin-bottom: 0;
  outline: none;
  &::placeholder {
    color: #d0d8e1;
    text-transform: uppercase;
  }
`
const InputContainer = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  background: #282e3a;
  justify-content: space-between;
  grid-template-columns: 1fr auto;
  // border: 0.5px solid #808080;
  border-radius: 10px;
  padding: 0 10px;
`
const Main = styled.main`
  overflow: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  max-height: 800px;
`

const CheckboxWrapper = styled.div`
  input[type="checkbox"] {
    /* removing default appearance */
    -webkit-appearance: none;
    appearance: none;
    /* creating a custom design */
    width: 1em;
    height: 1em;
    border-radius: 0.15em;
    margin-right: 0.5em;
    border: 0.2px solid #fff;
    outline: none;
    cursor: pointer;
  }
  input[type="checkbox"]:disabled {
    border-color: #c0c0c0;
    background-color: #c0c0c0;
  }
  input[type="checkbox"]:disabled + span {
    color: #c0c0c0;
  }
  input[type="checkbox"] {
    /* removing default appearance */
    -webkit-appearance: none;
    appearance: none;
    .checked {
      background-color: red !important;
      position: relative;
    }
  }
  input[type="checkbox"]:checked {
    background-color: #f3cb23;
  }
`
const DialogPanel = styled<any>(Dialog.Panel)`
  background: #111823;
  color: white;
`
const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
  margin: 1rem 0;
`
const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2.5px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`
const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${SwitchSlider} {
    background-color: #f9df51;
  }
  &:checked + ${SwitchSlider}:before {
    -webkit-transform: translateX(16px);
    -ms-transform: translateX(16px);
    transform: translateX(16px);
  }
`

type Props = {
  filters: any
  selectedFilters: any
  setSelectedFilters: any
  mobileFiltersOpen: any
  setMobileFiltersOpen: any
}

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
]
const subCategories = [{ name: "Favorites", href: "#" }]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

const BeastMarketFilters: FC<Props> = ({
  filters,
  selectedFilters,
  setSelectedFilters,
  mobileFiltersOpen,
  setMobileFiltersOpen,
}) => {
  // const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {}, [filters])

  const handleChange = (categoryId: any, optionValue: any) => {
    const selFilters = {
      dexNumber: [1, 2, 3, 4],
      serialNumber: [1, 2, 3],
    }
    console.log(selFilters)
    console.log(categoryId + " " + optionValue) // Works
    console.log(selFilters.dexNumber) // Works shows all dex numbers
    console.log(Object.keys(selFilters)) // Works shows types of filters ['dexNumber', 'serialNumber']

    var categoryName: any = categoryId
    console.log(categoryName)

    setSelectedFilters({
      ...selectedFilters,
      categoryName: ["hello"],
    })

    console.log(selectedFilters)
  }

  return (
    <>
      <Wrapper className="hidden lg:block">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="relative  flex h-full w-full  flex-col overflow-y-auto py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium ">Filters</h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-none p-2 "
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>x
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t">
                      <h3 className="sr-only">Categories</h3>
                      <ul role="list" className="px-2 py-3 font-medium ">
                        {subCategories.map((category) => (
                          <li key={category.name}>
                            <a href={category.href} className="block px-2 py-3">
                              {category.name}
                            </a>
                            <Switch>
                              <SwitchInput type="checkbox" />
                              <SwitchSlider></SwitchSlider>
                            </Switch>
                          </li>
                        ))}
                      </ul>
                      {filters != null && (
                        <>
                          {filters.map((section: any) => (
                            <Disclosure
                              as="div"
                              key={section.id}
                              className="border-x border-t border-gray-500 px-4 py-6"
                            >
                              {({ open }) => (
                                <>
                                  <h3 className="-mx-2 -my-3 flow-root">
                                    <Disclosure.Button className="flex w-full items-center justify-between bg-none px-2 py-3  hover:text-gray-500">
                                      <span className="font-medium ">
                                        {section.name}
                                      </span>
                                      <span className="ml-6 flex items-center">
                                        {open ? (
                                          <MinusIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        ) : (
                                          <PlusIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        )}
                                      </span>
                                    </Disclosure.Button>
                                  </h3>
                                  <Disclosure.Panel className="pt-6">
                                    <div className="space-y-6">
                                      {section.options?.map(
                                        (option: any, optionIdx: any) => (
                                          <>
                                            <CheckboxWrapper
                                              key={option.value}
                                              className="flex items-center"
                                            >
                                              <input
                                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                                name={`${section.id}[]`}
                                                defaultValue={option.value}
                                                type="checkbox"
                                                defaultChecked={option.checked}
                                                className="h-4 w-4 rounded border-gray-300 
                                           focus:ring-indigo-500"
                                              />
                                              <label
                                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                className="ml-3 min-w-0 flex-1 "
                                              >
                                                {option.label}
                                              </label>
                                            </CheckboxWrapper>
                                          </>
                                        ),
                                      )}
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          ))}
                        </>
                      )}
                    </form>
                  </DialogPanel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <Main className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between gap-5   pb-6">
              {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                New Arrivals
              </h1> */}
              {/* <InputContainer>
                <FuncArgInput placeholder="Search..." type="text" />
              </InputContainer> */}

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      style={{ background: "#111823", borderColor: "#808080" }}
                      className="absolute right-0 z-10 border mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <a
                                href={option.href}
                                className={classNames(
                                  option.current
                                    ? "font-medium "
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm",
                                )}
                              >
                                {option.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* <button
                  type="button"
                  className="-m-2 ml-5 p-2  hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  view grid icon
                </button> */}
                {/* <button
                  type="button"
                  className="-m-2 ml-4 p-2  hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  funnelicon
                </button> */}
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-2">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 ">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="space-y-4 pb-6 text-sm font-medium "
                  >
                    {subCategories.map((category) => (
                      <li
                        className="flex w-full justify-between items-center"
                        key={category.name}
                      >
                        <a href={category.href}>{category.name}</a>
                        <Switch>
                          <SwitchInput type="checkbox" />
                          <SwitchSlider></SwitchSlider>
                        </Switch>
                      </li>
                    ))}
                  </ul>

                  {filters?.map((section: any) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      style={{ backgroundColor: "#111823" }}
                      className=" border-t border-gray-500 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-white hover:text-gray-500">
                              <span className="font-medium ">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options?.map(
                                (option: any, optionIdx: any) => (
                                  <CheckboxWrapper
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      onChange={() =>
                                        handleChange(section.id, option.value)
                                      }
                                      className="h-4 w-4 rounded border-gray-300  focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-${section.id}-${optionIdx}`}
                                      className="ml-3 text-sm "
                                    >
                                      {option.label}
                                    </label>
                                  </CheckboxWrapper>
                                ),
                              )}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>
            </section>
          </Main>
        </div>
      </Wrapper>
    </>
  )
}

export default BeastMarketFilters
