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

const MobileStyles = styled.div`
  // Mobile Container

  @media (max-width: 1024px) {
    margin-top: 13px;
    margin-right: 10px;

    // Stuff
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    flex-flow: row nowrap;
    position: relative;
    white-space: nowrap;
    /* background: rgba(22, 22, 26, 0.04); */
    line-height: 40px;
    /* padding-right: 11px; */
    min-width: auto;
    border: 1px solid;
    border-radius: 20px;
    transition: all 0.15s ease-in-out 0s;
    transform-origin: center center;
    user-select: none;

    backdrop-filter: blur(20px) !important;
    background: #222427;
    border-color: #393b3d;

    height: 50px;
    width: 50px;

    color: #f3cb23;

    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
        14 0,
      pointer !important;

    &:hover {
      color: #f3c923ce !important;
    }
  }
`

const LanguageSwitcherIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  z-index: 3;
  font-size: 16px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
`

const MenuItems = styled<any>(Menu.Items)`
  background-color: #212127;
  color: #f3cb23;
  border-radius: 10px;
  text-align: left;
  padding: 10px 0;

  @media (max-width: 1024px) {
    right: 15px;
  }

  @media (max-width: 440px) {
    left: 0px;
    width: 130px;
  }
`

const A = styled.a<{ fontSize: string }>`
  font-size: ${(props) => props.fontSize};
  line-height: 25px;
  color: #f3cb23 !important;
  display: flex;
  align-items: center;
  text-decoration: none;
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
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className=" flex text-sm rounded-full">
          <MobileStyles>
            <LanguageSwitcherIcon icon={faGlobe} />
          </MobileStyles>
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
        <MenuItems className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {router.locales != null
              ? router.locales.map((locale) => (
                  <div key={locale}>
                    <NextLink href={router.asPath} locale={locale}>
                      <Menu.Item>
                        {({ active }) => (
                          <A
                            fontSize={locale === "ru" ? "10px" : "14px"}
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-700 text-gray-900"
                                : "text-gray-700",
                              "block px-4 text-sm",
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
        </MenuItems>
      </Transition>
    </Menu>
  )
}

export default LanguageSwitcher
