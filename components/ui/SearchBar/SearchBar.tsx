import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import React, { useState, useRef, useEffect, FC } from "react"
import styled from "styled-components"
// import "./SearchBar.css";
import { motion } from "framer-motion"

const SearchDiv = styled.div`
  display: flex;
  /* justify-content: center; */
  width: 100%;
  align-items: center;
`

const ExtraDiv = styled.div`
  z-index: 1;
  --width: 40vw;
  display: flex;
  position: relative;
  justify-content: center;
  /* align-items: center; */

  width: var(--width);
  height: auto;
  outline: none;
  @media (max-width: 621px) {
    display: none;
  }
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
  height: 100%;
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
  outline-width: 2px;
  outline-style: solid;
  padding: 8px;
  background: white;
  border: 2px solid white;
  border-radius: 12px;
  color: rgb(4, 17, 29);
  cursor: text;
  align-items: center;
  height: 48px;
  font-size: 24px;
  transition-property: border-color;
  transition-duration: 500ms;
  &:focus-within {
    /* outline-color: #f3cb23; */
    border-color: #f3cb23;
  }
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

  ${(props) =>
    props.id === "xButton" &&
    `
    margin-bottom: 5px;
    margin-left: 8px;
    font-size: 36px;
  `};
  ${(props) =>
    props.id === "searchIcon" &&
    `
    

    @media (min-width: 622px) {
      display: none;
    }
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
  border-radius: 10px;
  position: absolute;
  font-size: 24px;
  /* padding: 16px; */
  max-height: 30vw;
  max-width: 100%;
  overflow-y: auto;
  transform: translate(0, 75px);
  &::-webkit-scrollbar {
    display: none;
  }

  p {
    display: flex;
    padding: 4px;

    border-bottom-width: 1px;
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

const ListWrapper = styled(motion.div)`
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
          <IconDiv>
            <FontAwesomeIcon icon={faSearch} />
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

        {open ? (
          <ListWrapper
            initial={{ opacity: 0, top: -20 }}
            animate={{ opacity: 1, top: 0 }}
            transition={{ duration: 0.5 }}
          >
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
                        href={"/profile/" + value.findName?.toLowerCase()}
                        target="_self"
                        onClick={() => {
                          setOpen(false)
                          updateRecentList(value)
                        }}
                      >
                        <p>
                          {" "}
                          <Img src={value.avatar} /> {value.findName}
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
                    href={"/profile/" + value.findName.toLowerCase()}
                    target="_self"
                    onClick={() => {
                      setOpen(false)
                      updateRecentList(value)
                    }}
                  >
                    <p id="hoverShadow">
                      {" "}
                      <Img src={value.avatar} />
                      {value.findName}
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
      <IconDiv id="searchIcon">
        <FontAwesomeIcon
          icon={faSearch}
          onClick={() => setOpenMobileModal(true)}
        />
      </IconDiv>
    </SearchDiv>
  )
}
// const SearchBarWithIcon: FC<{
//   placeholder: any
//   data: any
//   beastData: any
//   setOpenMobileModal: any
// }> = ({ placeholder, data, beastData, setOpenMobileModal }) => {
//   return (
//     <div style={{ height: "2000px" }} className="flex justify-center">
//       <DisplayDiv>
//         <SearchBar
//           placeholder="Search"
//           data={data}
//           beastData={beastData}
//           setOpenMobileModal={true}
//         ></SearchBar>
//       </DisplayDiv>

//       <IconDiv id="searchIcon">
//         <FontAwesomeIcon
//           icon={faSearch}
//           onClick={() => setOpenMobileModal(true)}
//         />
//       </IconDiv>
//     </div>
//   )
// }

export default SearchBar
