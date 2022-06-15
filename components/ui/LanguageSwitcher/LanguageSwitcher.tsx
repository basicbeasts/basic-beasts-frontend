/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import { faGlobe } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import { NextRouter } from "next/dist/client/router"
import NextLink from "next/link"

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}

const LanguageSwitcherIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  z-index: 3;
  color: #f3cb23;
  font-size: 18px;
  margin-top: 5px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  &:hover {
    color: #f3c923ce;
  }
`

const MenuItems = styled.div`
  background: #212127;
  z-index: 10;
  @media (max-width: 1100px) {
    width: 100px;
  }
`

const A = styled.a<{ fontSize: string }>`
  font-size: ${(props) => props.fontSize};
  line-height: 25px;
  color: #f3cb23 !important;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  @media (max-width: 1010px) {
    padding: 0 0.5rem;
  }
`

type FuncProps = {
  router: NextRouter
}

const LanguageSwitcher: FC<FuncProps> = ({ router }) => {
  return (
    <Menu as="div" className="text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 ">
          <LanguageSwitcherIcon icon={faGlobe} />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems>
          <Menu.Items className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {router.locales != null
                ? router.locales.map((locale) => (
                    <div key={locale}>
                      <NextLink href={router.asPath} locale={locale}>
                        <Menu.Item>
                          {({ active }) => (
                            <A
                              fontSize={locale === "ru" ? "15px" : "20px"}
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm",
                              )}
                            >
                              {locale == "en-US"
                                ? "English"
                                : locale == "ru"
                                ? "Русский"
                                : ""}
                            </A>
                          )}
                        </Menu.Item>
                      </NextLink>
                    </div>
                  ))
                : ""}
            </div>
          </Menu.Items>
        </MenuItems>
      </Transition>
    </Menu>
  )
}

export default LanguageSwitcher
