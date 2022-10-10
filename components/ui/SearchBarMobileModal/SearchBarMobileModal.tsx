import { FC, Fragment, useEffect, useRef, useState } from "react"
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
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"

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
  /* border-radius: 8px 0 0 8px; */
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
  /* border-radius: 0 8px 8px 0; */
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
`

const Title = styled.div`
  font-size: 2.5em;
  margin-bottom: 20px;
`

const Wrapper = styled.div`
  // margin: 0 20px;
  height: 100vh;
`

const Container = styled.div`
  align-items: center;
`

const NicknameLengthWarning = styled.div`
  color: red;
`

const SearchDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 2000px;
`

const ExtraDiv = styled.div`
  --width: 100vw;
  --height: 72px;
  display: flex;
  position: absolute;
  justify-content: center;
  /* align-items: center; */

  width: var(--width);
  height: auto;
  outline: none;
`
const DisplayDiv = styled.div`
  @media (max-width: 621px) {
    display: none;
  }
`

const RecentDiv = styled.div`
  display: grid;
  /* justify-content: space-between; */
  width: 100%;
  // height: 100%;
  grid-template-columns: 90% 1fr;
  &:hover {
    box-shadow: rgb(0 0 0 / 16%) 0px 4px 16px;
  }
`

const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding: 8px;
  background: white;
  border-bottom: 1px solid rgb(229, 232, 235);
  // border-radius: 12px;
  color: rgb(4, 17, 29);
  cursor: text;
  align-items: center;
  height: var(--height);
  font-size: 24px;
  /* transition-property: border-color;
  transition-duration: 500ms; */
`

const InputBar = styled.input`
  cursor: text !important;
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
  padding: 1px 2px;
`
const IconDiv = styled.div`
  display: flex;
  margin-right: 8px;
  //margin-bottom: 5px;
  max-width: 24px;
  color: rgb(138, 147, 155);
  object-fit: contain;
  justify-content: center;

  ${(props) =>
    props.id === "xButton" &&
    `
    margin-bottom: 5px;
    margin-left: 8px;
    font-size: 36px;
  `};
  ${(props) =>
    props.id === "backButton" &&
    `
    width: 32px;
  `};
`
const RemoveBtn = styled.button`
  min-width: 20px;
  min-height: 20px;
  color: rgb(138, 147, 155);
  font-size: 36px;
  border-bottom-width: 1px;
`
const SuggestionList = styled.div<any>`
  width: var(--width);
  background: white;
  /* border-radius: 10px; */
  position: absolute;
  font-size: 24px;
  /* padding: 16px; */
  height: 100vh;
  max-width: 100%;
  overflow-y: auto;
  transform: translate(0, var(--height));
  &::-webkit-scrollbar {
    display: none;
  }

  p {
    display: flex;
    padding: 4px;

    border-bottom: 1px solid rgb(229, 232, 235);
    margin: 0;

    align-items: center;
  }
  #hoverShadow:hover {
    box-shadow: rgb(0 0 0 / 16%) 0px 4px 16px;
  }

  /* transition: 10s ease-in-out;
   transition-delay: 2s, 4ms;
    opacity: ${({ suggestionsShowing }) => (suggestionsShowing ? "100%" : "0")};
   top: ${({ suggestionsShowing }) => (suggestionsShowing ? "0" : "-100%")}; */
`

const ListWrapper = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
`

const Img = styled.img`
  width: 32px;
  height: 32px;
  margin: 8px 12px;
  object-fit: contain;
  border-radius: 3px;
`

const CategoryName = styled.div`
  padding: 16px;
  border-bottom-width: 1px;
  color: rgb(112, 122, 131);
`

const SearchBar: FC<{
  placeholder: any
  data: any
  beastData: any
  setOpenMobileModal: any
}> = ({ placeholder, data, beastData, setOpenMobileModal }) => {
  const [filteredData, setFilteredData] = useState([])
  const [filterBeastData, setFilterBeastData] = useState([])
  const [wordEntered, setWordEntered] = useState("")
  const [showRecent, setShowRecent] = useState<any>([])
  const [open, setOpen] = useState(false)
  const [filterRecentData, setFilterRecentData] = useState([...showRecent])
  useEffect(() => {
    const recent = window.localStorage.getItem("RECENT_SEARCH")
    if (recent != null) {
      setShowRecent(JSON.parse(recent))
    }
    console.log(recent)
    setOpen(true)
  }, [])

  useEffect(() => {
    window.localStorage.setItem("RECENT_SEARCH", JSON.stringify(showRecent))
  }, [showRecent])

  useEffect(() => {
    if (data != null) {
      data.sort((a: any, b: any) => (a.findName > b.findName ? 1 : -1))
    }
  }, [data])

  useEffect(() => {
    if (beastData != null) {
      beastData.sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
    }
  }, [beastData])

  // For clearing suggestions when clicking outside
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          // setFilteredData([])
          // setFilterBeastData([])
          setOpen(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [ref])
  }
  // For clearing suggestions when clicking outside
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)

  const handleFilter = (event: any) => {
    setOpen(true)
    const searchWord = event.target.value
    setWordEntered(searchWord)
    const newFilter = data.filter((value: any) => {
      return (
        value.findName?.toLowerCase().includes(searchWord?.toLowerCase()) ||
        value.address?.toLowerCase().includes(searchWord?.toLowerCase())
      )
    })

    const newBeastFilter = beastData.filter((value: any) => {
      return value.name?.toLowerCase().includes(searchWord.toLowerCase())
    })

    const newRecentFilter = showRecent.filter((value: any) => {
      return (
        value.findName?.toLowerCase().includes(searchWord?.toLowerCase()) ||
        value.address?.toLowerCase().includes(searchWord?.toLowerCase())
      )
    })

    if (searchWord === "") {
      setFilteredData([])
      setFilterBeastData([])
      setFilterRecentData([...showRecent])
      setOpen(true)
    } else {
      setFilteredData(newFilter)
      setFilterBeastData(newBeastFilter)
      setFilterRecentData(newRecentFilter)
      // setOpen(false)
    }
  }

  const clearInput = () => {
    setFilteredData([])
    setFilterBeastData([])
    setFilterRecentData([...showRecent])
    setOpen(false)
    setWordEntered("")
  }

  const removeItem = (i: any) => {
    showRecent.splice(i, 1)
    window.localStorage.setItem("RECENT_SEARCH", JSON.stringify(showRecent))
    setShowRecent([...showRecent])
    setFilterRecentData([...showRecent])
  }

  const updateRecentList = (value: any) => {
    const index = showRecent
      .map((object: any) => object.address)
      .indexOf(value.address)

    {
      filterRecentData.some((e: any) => e.address === value.address) &&
      filterRecentData.length <= 3
        ? (console.log("Already Included"),
          removeItem(index),
          console.log(index + " removed"),
          setShowRecent([...showRecent, value]),
          setFilterRecentData([...showRecent, value]))
        : filterRecentData.some((e: any) => e.address != value.address) &&
          filterRecentData.length < 3
        ? (setShowRecent([...showRecent, value]),
          setFilterRecentData([...showRecent, value]))
        : filterRecentData.some((e: any) => e.address != value.address) &&
          filterRecentData.length === 3
        ? (removeItem([0]),
          setShowRecent([...showRecent, value]),
          setFilterRecentData([...showRecent, value]))
        : filterRecentData.length == 0
        ? (setShowRecent([...showRecent, value]),
          setFilterRecentData([...showRecent, value]))
        : console.log("Nothing Happened")
    }
  }

  return (
    <SearchDiv>
      <ExtraDiv ref={wrapperRef}>
        <InputDiv>
          <IconDiv id="backButton" onClick={() => setOpenMobileModal(false)}>
            {" "}
            <b>&lt;</b>{" "}
          </IconDiv>
          <InputBar
            type="text"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
            onClick={handleFilter}
          />
          {wordEntered != "" && (
            <a>
              <IconDiv id="xButton">
                <div id="clearBtn" onClick={clearInput}>
                  {" "}
                  <b>x</b>{" "}
                </div>
              </IconDiv>
            </a>
          )}
        </InputDiv>

        {/* {open && showRecent?.length != 0 ? <ListWrapper
            initial={{ opacity: 0, top: -20 }}
            animate={{ opacity: 1, top: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SuggestionList
              > 
                <CategoryName>Recent</CategoryName>
              {showRecent?.slice(0, 15).map((value: any, key: any) => {
                return value.findName != "" ? (
                 <RecentDiv>
                  <a 
                  className="dataItem"
                  href={"/profile/" + value.findName?.toLowerCase() + ".find"}
                  target="_self"
                  >
                    <p>
                      {" "}
                      <Img src={value.avatar} /> {value.findName}.find {" "}
                    </p>
                    
                  </a>
                    <RemoveBtn onClick={() => removeItem(key)}>x</RemoveBtn> 
                 </RecentDiv> 
                ):(
                  <RecentDiv>
                    <a
                    className="dataItem"
                    href={"/profile/" + value.address.toLowerCase()}
                    target="_self"
                  >
                    <p>
                      {" "}
                      <Img src={value.avatar} />
                      {value.address}{" "}
                    </p>
                  </a> 
                    <RemoveBtn onClick={() => removeItem(key)}>x</RemoveBtn> 
                  </RecentDiv>
                )
              }).reverse()}
            </SuggestionList>
</ListWrapper>: <></> } */}

        {(open && filterRecentData.length != 0) ||
        (open && wordEntered != "") ? (
          <ListWrapper onClick={() => setOpen(false)}>
            <SuggestionList
              suggestionsShowing={
                filteredData.length != 0 || filterBeastData.length != 0
              }
            >
              {filterRecentData?.length != 0 && (
                <CategoryName>Recent</CategoryName>
              )}

              {filterRecentData
                ?.slice(0, 15)
                .map((value: any, key: any) => {
                  return value.findName != "" ? (
                    <RecentDiv>
                      <a
                        className="dataItem"
                        href={
                          "/profile/" + value.findName?.toLowerCase() + ".find"
                        }
                        target="_self"
                        onClick={() => {
                          setOpen(false)
                          updateRecentList(value)
                        }}
                      >
                        <p>
                          {" "}
                          <Img src={value.avatar} /> {value.findName}.find{" "}
                        </p>
                      </a>
                      <RemoveBtn onClick={() => removeItem(key)}>x</RemoveBtn>
                    </RecentDiv>
                  ) : (
                    <RecentDiv>
                      <a
                        className="dataItem"
                        href={"/profile/" + value.address.toLowerCase()}
                        target="_self"
                        onClick={() => {
                          setOpen(false)
                          updateRecentList(value)
                        }}
                      >
                        <p>
                          {" "}
                          <Img src={value.avatar} />
                          {value.address}{" "}
                        </p>
                      </a>
                      <RemoveBtn onClick={() => removeItem(key)}>x</RemoveBtn>
                    </RecentDiv>
                  )
                })
                .reverse()}
              {filteredData.length != 0 && <CategoryName>Hunters</CategoryName>}
              {filteredData.slice(0, 15).map((value: any, key: any) => {
                return value.findName != "" ? (
                  <a
                    className="dataItem"
                    href={"/profile/" + value.findName.toLowerCase() + ".find"}
                    target="_self"
                    onClick={() => {
                      setOpen(false)
                      updateRecentList(value)
                    }}
                  >
                    <p id="hoverShadow">
                      {" "}
                      <Img src={value.avatar} />
                      {value.findName}.find{" "}
                    </p>
                  </a>
                ) : (
                  <a
                    className="dataItem"
                    href={"/profile/" + value.address.toLowerCase()}
                    target="_self"
                    onClick={() => {
                      setOpen(false)
                      updateRecentList(value)
                    }}
                  >
                    <p id="hoverShadow">
                      {" "}
                      <Img src={value.avatar} />
                      {value.address}{" "}
                    </p>
                  </a>
                )
              })}
              {filterBeastData.length != 0 && (
                <CategoryName>Beasts</CategoryName>
              )}
              {filterBeastData.slice(0, 15).map((value: any, key: any) => {
                return (
                  <a
                    className="dataItem"
                    href={"/profile/" + value.name.toLowerCase()}
                    target="_self"
                    onClick={() => {
                      setOpen(false)
                      // updateRecentList(value)
                    }}
                  >
                    <p id="hoverShadow">
                      {" "}
                      <Img src={value.imageTransparentBg} /> {value.name}{" "}
                    </p>
                  </a>
                )
              })}
            </SuggestionList>
          </ListWrapper>
        ) : (
          <></>
        )}
      </ExtraDiv>
    </SearchDiv>
  )
}

type Props = {
  data: any
  beastData: any
  open: boolean
  setOpen: any
}

const SearchBarMobileModal: FC<Props> = ({
  data,
  beastData,
  open,
  setOpen,
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="linear"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="linear"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <Container className="flex items-end sm:items-center justify-center min-h-full text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="linear"
              enterFrom="opacity-0"
              enterTo="opacity-100-0"
              leave="linear"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel
                style={{ width: "100%" }}
                className="relative bg-none pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full md:max-w-xl"
              >
                <Wrapper>
                  {/* <div className="text-white">Search Bar Mobile</div> */}
                  <SearchBar
                    placeholder="Search.."
                    data={data}
                    beastData={beastData}
                    setOpenMobileModal={setOpen}
                  ></SearchBar>
                </Wrapper>
              </Dialog.Panel>
            </Transition.Child>
          </Container>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default SearchBarMobileModal
